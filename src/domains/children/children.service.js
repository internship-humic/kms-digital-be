import BaseService from "../../common/base_classes/base-service.js";
import { calculateAllZScores } from "../../utils/zscore.util.js";
import calculateAgeInMonths from "../../utils/age.util.js";

class ChildrenService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
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
    const data = await this.db.childrens.findMany({
      where: { parent_id: parentId },
      skip: offset,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    return data;
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

    await this.findParent(parent_id);

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
    await this.findChildren(id);

    const { name, birth_date, parent_id, gender, address, status } = info;

    await this.findParent(parent_id);

    return await this.db.childrens.update({
      where: {
        id,
      },
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
    await this.findChildren(id);

    await this.db.childrens.delete({
      where: {
        id,
      },
    });

    return true;
  }
}

export default new ChildrenService();
