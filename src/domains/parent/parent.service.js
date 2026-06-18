import BaseService from "../../common/base_classes/base-service.js";

class ParentService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getAllParents(query) {
    const { page, limit, offset } = getPagination(query);
    const filter = ORMfilterable(query, ["name"]) || {};

    const q = (query.search || "").trim();
    if (q) filter.name = { contains: q, mode: "insensitive" };

    const total = await this.db.parents.count({ where: filter });
    const data = await this.db.parents.findMany({
      where: filter,
      include: {
        clinic: { select: { id: true, name: true, address: true } },
        children: {
          select: { id: true, name: true, birth_date: true, gender: true },
        },
      },
      skip: offset,
      take: limit,
      orderBy: { created_at: "desc" },
    });

    const pagination = getMeta(total, page, limit);
    return { data, pagination };
  }

  async getParentsByClinic(query, clinicId) {
    const { page, limit, offset } = getPagination(query);

    const filter = ORMfilterable(query, ["name"]) || {};

    filter.clinic_id = clinicId;

    const q = (query.search || "").trim();

    if (q) {
      filter.name = {
        contains: q,
        mode: "insensitive",
      };
    }

    const total = await this.db.parents.count({
      where: filter,
    });

    const data = await this.db.parents.findMany({
      where: filter,
      skip: offset,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const pagination = getMeta(total, page, limit);

    return { data, pagination };
  }
}

export default new ParentService();
