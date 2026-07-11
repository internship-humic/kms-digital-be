import BaseService from "../../common/base_classes/base-service.js";

import calculateAgeInMonths from "../../utils/age.util.js";
import calculateRiskStatus from "../../utils/risk-status.util.js";
import { calculateAllZScores } from "../../utils/zscore.util.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";
import NotificationService from "../notification/notification.service.js";
import Roles from "../../common/enums/user-roles.enum.js";

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
      throw this.error.notFound("Measurement not found");
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
      throw this.error.badRequest(
        "Measurement date cannot be before birth date",
      );
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
          is_intervented: false,
          referral: false,
          supplement: false,
          education: false,
        },
      });

      await NotificationService.createNotification({
        recipient_id: children.parent_id,
        recipient_role: Roles.Parents,
        title: "Pengukuran baru berhasil disimpan",
        message: "Hasil pengukuran terbaru anak Anda sudah tersedia.",
        category: "MEASUREMENT",
        reference_id: measurement.id,
        reference_type: "measurement",
      });

      return measurement;
    });
  }

  async updateMeasurement(measurementId, body) {
    const measurement = await this.findMeasurement(measurementId);

    const children = await this.findChildren(measurement.children_id);

    const measurementDate = new Date(body.measurement_date);

    const ageMonth = calculateAgeInMonths(children.birth_date, measurementDate);

    if (ageMonth < 0) {
      throw this.error.badRequest(
        "Measurement date cannot be before birth date",
      );
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
          is_intervented: false,
          referral: false,
          supplement: false,
          education: false,
        },
      });

      await NotificationService.createNotification({
        recipient_id: children.parent_id,
        recipient_role: Roles.Parents,
        title: "Perubahan hasil pengukuran berhasil disimpan",
        message: "Hasil pengukuran terbaru anak Anda mengalami perubahan.",
        category: "MEASUREMENT",
        reference_id: measurement.id,
        reference_type: "measurement",
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

      await NotificationService.createNotification({
        recipient_id: children.parent_id,
        recipient_role: Roles.Parents,
        title: "Pengukuran baru berhasil dihapus",
        message:
          "Hasil pengukuran anak Anda terdapat kesalahan pendataan dan akan segera dihapus.",
        category: "MEASUREMENT",
        reference_id: measurement.id,
        reference_type: "measurement",
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
      throw this.error.notFound("Children not found");
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
      throw this.error.notFound("Measurement not found");
    }

    return measurement;
  }
}

export default new MeasurementService();
