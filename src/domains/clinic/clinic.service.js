import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";

class ClinicService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getClinicsByVillage(villageId) {
    const clinics = await this.db.clinic.findMany({
      where: { village_id: villageId },
    });

    if (clinics.length === 0) {
      throw this.error.notFound("No clinics found for the specified village");
    }

    return clinics;
  }

  async getAllClinics(query) {
    const { page, limit, offset } = getPagination(query);

    const filter = ORMfilterable(query, ["name"]) || {};

    const q = (query.search || "").trim();
    if (q) {
      filter.name = {
        contains: q,
        mode: "insensitive",
      };
    }

    const total = await this.db.clinic.count({
      where: filter,
    });

    const data = await this.db.clinic.findMany({
      where: filter,
      include: {
        village: {
          select: {
            id: true,
            name: true,
          },
        },
        _count: {
          select: {
            parents: true,
            Cadre: true,
          },
        },
      },
      skip: offset,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const pagination = getMeta(total, page, limit);

    return {
      data,
      pagination,
    };
  }

  async getClinicById(id) {
    const clinic = await this.db.clinic.findUnique({
      where: {
        id,
      },
      include: {
        village: true,
        parents: {
          select: {
            id: true,
            name: true,
            phone_number: true,
          },
        },
        Cadre: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!clinic) {
      throw this.error.notFound("Clinic not found");
    }

    return clinic;
  }

  async createClinic(info) {
    const village = await this.db.village.findUnique({
      where: {
        id: info.village_id,
      },
    });

    if (!village) {
      throw this.error.notFound("Village not found");
    }

    return await this.db.clinic.create({
      data: {
        name: info.name,
        address: info.address,
        village_id: info.village_id,
      },
    });
  }

  async updateClinic(id, info) {
    await this.getClinicById(id);

    if (info.village_id) {
      const village = await this.db.village.findUnique({
        where: {
          id: info.village_id,
        },
      });

      if (!village) {
        throw this.error.notFound("Village not found");
      }
    }

    return await this.db.clinic.update({
      where: {
        id,
      },
      data: info,
    });
  }

  async deleteClinic(id) {
    await this.getClinicById(id);

    await this.db.clinic.delete({
      where: {
        id,
      },
    });

    return true;
  }
}

export default new ClinicService();
