import BaseService from "../../common/base_classes/base-service.js";

import calculateAgeInMonths from "../../utils/age.util.js";
import { calculateAllZScores } from "../../utils/zscore.util.js";

class MeasurementService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getMeasurements(query) {
    const { page, limit, offset } = getPagination(query);

    const filter = {};

    if (query.childrenId) {
      filter.children_id = query.childrenId;
    }

    if (query.startDate || query.endDate) {
      filter.measurement_date = {};

      if (query.startDate) {
        filter.measurement_date.gte = new Date(query.startDate);
      }

      if (query.endDate) {
        filter.measurement_date.lte = new Date(query.endDate);
      }
    }

    const total = await this.db.measurements.count({
      where: filter,
    });

    const data = await this.db.measurements.findMany({
      where: filter,
      include: {
        children: {
          select: {
            id: true,
            name: true,
            birth_date: true,
            gender: true,
            status: true,
          },
        },
        clinic: true,
      },
      skip: offset,
      take: limit,
      orderBy: {
        measurement_date: "desc",
      },
    });

    return {
      data,
      pagination: getMeta(total, page, limit),
    };
  }

  async getMeasurementById(id) {
    const measurement = await this.db.measurements.findUnique({
      where: {
        id,
      },
      include: {
        children: true,
        clinic: true,
      },
    });

    if (!measurement) {
      throw new BaseError("Measurement not found", 404);
    }

    return measurement;
  }

  async getMeasurementGraph(childrenId) {
    await this.findChildren(childrenId);

    const measurements = await this.db.measurements.findMany({
      where: {
        children_id: childrenId,
      },
      select: {
        measurement_date: true,
        age_month: true,
        body_weight: true,
        body_height: true,
        head_circumference: true,
        zscore_bb: true,
        zscore_tb: true,
        zscore_lk: true,
        zscore_gizi: true,
      },
      orderBy: {
        measurement_date: "asc",
      },
    });

    return {
      weight: measurements.map((item) => ({
        age_month: item.age_month,
        measurement_date: item.measurement_date,
        value: item.body_weight,
        zscore: item.zscore_bb,
      })),

      height: measurements.map((item) => ({
        age_month: item.age_month,
        measurement_date: item.measurement_date,
        value: item.body_height,
        zscore: item.zscore_tb,
      })),

      head_circumference: measurements.map((item) => ({
        age_month: item.age_month,
        measurement_date: item.measurement_date,
        value: item.head_circumference,
        zscore: item.zscore_lk,
      })),

      nutrition: measurements.map((item) => ({
        age_month: item.age_month,
        measurement_date: item.measurement_date,
        zscore: item.zscore_gizi,
      })),
    };
  }

  async createMeasurement(childrenId, body) {
    const children = await this.findChildren(childrenId);

    const measurementDate = new Date(body.measurement_date);

    const ageMonth = calculateAgeInMonths(children.birth_date, measurementDate);

    if (ageMonth < 0) {
      throw new BaseError("Measurement date cannot be before birth date", 400);
    }

    const zscore = calculateAllZScores({
      weight: body.body_weight,
      height: body.body_height,
      headCircumference: body.head_circumference,
      gender: children.gender,
      birthDate: children.birth_date,
      measurementDate,
    });

    const status = calculateRiskStatus(zscore);

    return await this.db.$transaction(async (tx) => {
      const measurement = await tx.measurements.create({
        data: {
          children_id: children.id,
          clinic_id: body.clinic_id,
          measurement_date: measurementDate,
          age_month: ageMonth,
          description: body.description,
          body_weight: body.body_weight,
          body_height: body.body_height,
          head_circumference: body.head_circumference ?? null,
          zscore_bb: zscore.zscore_bb,
          zscore_tb: zscore.zscore_tb,
          zscore_lk: zscore.zscore_lk,
          zscore_gizi: zscore.zscore_gizi,
        },
      });

      await tx.childrens.update({
        where: {
          id: children.id,
        },
        data: {
          status,
        },
      });

      return measurement;
    });
  }

  async updateMeasurement(childrenId, measurementId, body) {
    const children = await this.findChildren(childrenId);

    const measurement = await this.findMeasurement(measurementId);

    if (measurement.children_id !== children.id) {
      throw new BaseError("Measurement does not belong to this child", 400);
    }

    const measurementDate = new Date(body.measurement_date);

    const ageMonth = calculateAgeInMonths(children.birth_date, measurementDate);

    if (ageMonth < 0) {
      throw new BaseError("Measurement date cannot be before birth date", 400);
    }

    const zscore = calculateAllZScores({
      weight: body.body_weight,
      height: body.body_height,
      headCircumference: body.head_circumference,
      gender: children.gender,
      birthDate: children.birth_date,
      measurementDate,
    });

    const status = calculateRiskStatus(zscore);

    return await this.db.$transaction(async (tx) => {
      const updatedMeasurement = await tx.measurements.update({
        where: {
          id: measurementId,
        },
        data: {
          clinic_id: body.clinic_id,
          measurement_date: measurementDate,
          age_month: ageMonth,
          description: body.description,
          body_weight: body.body_weight,
          body_height: body.body_height,
          head_circumference: body.head_circumference ?? null,
          zscore_bb: zscore.zscore_bb,
          zscore_tb: zscore.zscore_tb,
          zscore_lk: zscore.zscore_lk,
          zscore_gizi: zscore.zscore_gizi,
        },
      });

      await tx.childrens.update({
        where: {
          id: children.id,
        },
        data: {
          status,
        },
      });

      return updatedMeasurement;
    });
  }

  async deleteMeasurement(id) {
    return await this.db.$transaction(async (tx) => {
      const measurement = await tx.measurements.findUnique({
        where: {
          id,
        },
      });

      if (!measurement) {
        throw this.error.notFound("Measurement not found");
      }

      await tx.measurements.delete({
        where: {
          id,
        },
      });

      const latestMeasurement = await tx.measurements.findFirst({
        where: {
          children_id: measurement.children_id,
        },
        orderBy: {
          measurement_date: "desc",
        },
      });

      await tx.childrens.update({
        where: {
          id: measurement.children_id,
        },
        data: {
          status: latestMeasurement
            ? calculateRiskStatus({
                zscore_bb: latestMeasurement.zscore_bb,
                zscore_tb: latestMeasurement.zscore_tb,
                zscore_gizi: latestMeasurement.zscore_gizi,
              })
            : null,
        },
      });

      return true;
    });
  }

  async findChildren(childrenId) {
    const children = await this.db.childrens.findUnique({
      where: {
        id: childrenId,
      },
    });

    if (!children) {
      throw new BaseError("Children not found", 404);
    }

    return children;
  }

  async findMeasurement(measurementId) {
    const measurement = await this.db.measurements.findUnique({
      where: {
        id: measurementId,
      },
    });

    if (!measurement) {
      throw new BaseError("Measurement not found", 404);
    }

    return measurement;
  }
}

export default new MeasurementService();
