  import BaseService from "../../common/base_classes/base-service.js";

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

    async createChildren() {
      
    }
  }

  export default new ChildrenService();
