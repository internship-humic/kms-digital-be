import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";

class CadreService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getAllCadres(query) {
    const { page, limit, offset } = getPagination(query);

    const filter = ORMfilterable(query, ["name"]) || {};

    const q = (query.search || "").trim();

    if (q) {
      filter.name = {
        contains: q,
        mode: "insensitive",
      };
    }

    const total = await this.db.cadre.count({
      where: filter,
    });

    const data = await this.db.cadre.findMany({
      where: filter,
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    data.forEach((cadre) => {
      delete cadre.password;
    });

    const pagination = getMeta(total, page, limit);

    return {
      data,
      pagination,
    };
  }

  async updateCadre(id, info) {
    const cadre = await this.db.cadre.findUnique({
      where: { id },
    });

    if (!cadre) {
      throw this.error.notFound("Cadre not found");
    }

    if (info.email) {
      const [parent, admin, existingCadre] = await Promise.all([
        this.db.parents.findUnique({
          where: { email: info.email },
        }),
        this.db.admin.findUnique({
          where: { email: info.email },
        }),
        this.db.cadre.findUnique({
          where: { email: info.email },
        }),
      ]);

      if (parent) {
        throw this.error.badRequest("Email already registered as Parents");
      }

      if (admin) {
        throw this.error.badRequest("Email already registered as Admin");
      }

      if (existingCadre && existingCadre.id !== id) {
        throw this.error.badRequest("Email already registered as Cadre");
      }
    }

    if (info.clinic_id) {
      const clinic = await this.db.clinic.findUnique({
        where: { id: info.clinic_id },
      });

      if (!clinic) {
        throw this.error.notFound("Clinic not found");
      }
    }

    const updatedCadre = await this.db.cadre.update({
      where: { id },
      data: info,
      include: {
        clinic: {
          select: {
            id: true,
            name: true,
            address: true,
          },
        },
      },
    });

    delete updatedCadre.password;

    return updatedCadre;
  }

  async deleteCadre(id) {
    const cadre = await this.db.cadre.findUnique({
      where: {
        id,
      },
    });

    if (!cadre) {
      throw this.error.notFound("Cadre not found");
    }

    await this.db.cadre.delete({
      where: {
        id,
      },
    });

    return true;
  }
}

export default new CadreService();
