import BaseService from "../../common/base_classes/base-service.js";

class ChildrenService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getAllChildrens() {
    const { page, limit, offset } = getPagination(query);
    const filter = ORMfilterable(query, ["name"]) || {};

    const q = (query.search || "").trim();
    if (q) filter.name = { contains: q, mode: "insensitive" };

    const total = await this.db.children.count({ where: filter });
    const data = await this.db.children.findMany({
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
}

export default new ChildrenService();
