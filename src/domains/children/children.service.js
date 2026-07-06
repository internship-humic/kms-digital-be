import BaseService from "../../common/base_classes/base-service.js";
import { calculateAllZScores } from "../../utils/zscore.util.js";
import calculateAgeInMonths from "../../utils/age.util.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";

class ChildrenService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getAllRiskyChildren(query) {
    const { page, limit, offset } = getPagination(query);

    const filter = {
      status: {
        in: ["LOWRISK", "HIGHRISK"],
      },
      is_intervented: false,
    };

    const q = (query.search || "").trim();
    if (q) {
      filter.name = { contains: q, mode: "insensitive" };
    }

    const total = await this.db.childrens.count({ where: filter });

    const needReferral = await this.db.childrens.count({
      where: {
        ...filter,
        status: "HIGHRISK",
      },
    });

    const data = await this.db.childrens.findMany({
      where: filter,
      include: {
        parent: { select: { id: true, name: true, phone_number: true } },
        measurements: {
          orderBy: { measurement_date: "desc" },
          take: 1,
        },
      },
      skip: offset,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    const pagination = getMeta(total, page, limit);

    return {
      data: {
        items: data,
        total_case: total,
        need_referral: needReferral,
      },
      pagination,
    };
  }

  async getInterventionByChildrenId(childrenId) {
    const children = await this.db.childrens.findUnique({
      where: { id: childrenId },
      select: {
        id: true,
        is_intervented: true,
        referral: true,
        supplement: true,
        education: true,
      },
    });

    if (!children) {
      throw this.error.notFound("Children not found");
    }

    return children;
  }

  async updateIntervention(childrenId, payload) {
    const existingChildren = await this.db.childrens.findUnique({
      where: { id: childrenId },
    });

    if (!existingChildren) {
      throw this.error.notFound("Children not found");
    }

    const updated = await this.db.childrens.update({
      where: { id: childrenId },
      data: {
        is_intervented: true,
        ...(payload.referral !== undefined
          ? { referral: payload.referral }
          : {}),
        ...(payload.supplement !== undefined
          ? { supplement: payload.supplement }
          : {}),
        ...(payload.education !== undefined
          ? { education: payload.education }
          : {}),
      },
      select: {
        id: true,
        is_intervented: true,
        referral: true,
        supplement: true,
        education: true,
      },
    });

    return updated;
  }

  async getAllChildrens(query) {
    const { page, limit, offset } = getPagination(query);
    const filter = ORMfilterable(query, ["name"]) || {};

    const q = (query.search || "").trim();
    if (q) filter.name = { contains: q, mode: "insensitive" };

    const total = await this.db.childrens.count({ where: filter });
    const data = await this.db.childrens.findMany({
      where: filter,
      include: {
        parent: { select: { id: true, name: true, phone_number: true } },
      },
      skip: offset,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    const pagination = getMeta(total, page, limit);
    return { data, pagination };
  }

  async getChildrensByParent(parentId) {
    return await this.db.childrens.findMany({
      where: { parent_id: parentId },
      orderBy: { created_at: "desc" },
    });
  }

  async createChildren(info) {
    const {
      name,
      birth_date,
      parent_id,
      gender,
      address,
      status,
      body_weight,
      body_height,
      head_circumference,
    } = info;

    const parent = await this.db.parents.findUnique({
      where: { id: parent_id },
    });

    if (!parent) {
      throw BaseError.notFound("Parent not found");
    }

    const measurementDate = new Date(birth_date);

    const zscores = calculateAllZScores({
      weight: body_weight,
      height: body_height,
      headCircumference: head_circumference,
      gender,
      birthDate: birth_date,
      measurementDate,
    });

    return await this.db.$transaction(async (tx) => {
      const children = await tx.childrens.create({
        data: {
          name,
          birth_date: new Date(birth_date),
          parent_id,
          gender,
          address,
          status,
        },
      });

      await tx.measurements.create({
        data: {
          children_id: children.id,
          measurement_date: measurementDate,
          age_month: 0,
          body_weight,
          body_height,
          head_circumference,
          zscore_bb: zscores.zscore_bb,
          zscore_tb: zscores.zscore_tb,
          zscore_lk: zscores.zscore_lk,
          zscore_gizi: zscores.zscore_gizi,
        },
      });

      return children;
    });
  }

  async updateChildren(id, info) {
    const existingChildren = await this.db.childrens.findUnique({
      where: { id },
    });

    if (!existingChildren) {
      throw BaseError.notFound("Children not found");
    }

    const { name, birth_date, parent_id, gender, address, status } = info;

    const parent = await this.db.parents.findUnique({
      where: { id: parent_id },
    });

    if (!parent) {
      throw BaseError.notFound("Parent not found");
    }

    return await this.db.childrens.update({
      where: { id },
      data: {
        name,
        birth_date: new Date(birth_date),
        parent_id,
        gender,
        address,
        status,
      },
    });
  }

  async deleteChildren(id) {
    const existingChildren = await this.db.childrens.findUnique({
      where: { id },
    });

    if (!existingChildren) {
      throw BaseError.notFound("Children not found");
    }

    await this.db.childrens.delete({
      where: { id },
    });

    return true;
  }
}

export default new ChildrenService();
