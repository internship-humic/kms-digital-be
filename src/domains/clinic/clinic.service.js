import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";
import NotificationService from "../notification/notification.service.js";
import Roles from "../../common/enums/user-roles.enum.js";

class ClinicService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async notifyAdmins(payload) {
    const admins = await this.db.admin.findMany({
      select: {
        id: true,
      },
    });

    if (admins.length === 0) {
      return [];
    }

    return await Promise.all(
      admins.map((admin) =>
        NotificationService.createNotification({
          recipient_id: admin.id,
          recipient_role: Roles.Admin,
          title: payload.title,
          message: payload.message,
          category: payload.category,
          reference_id: payload.reference_id,
          reference_type: payload.reference_type,
        }),
      ),
    );
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

    const clinic = await this.db.clinic.create({
      data: {
        name: info.name,
        address: info.address,
        village_id: info.village_id,
      },
    });

    await this.notifyAdmins({
      title: "Posyandu berhasil dibuat",
      message: `Posyandu ${clinic.name} berhasil ditambahkan.`,
      category: "ANNOUNCEMENT",
      reference_id: clinic.id,
      reference_type: "clinic",
    });

    return clinic;
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

    const clinic = await this.db.clinic.update({
      where: {
        id,
      },
      data: info,
    });

    await this.notifyAdmins({
      title: "Posyandu berhasil diubah",
      message: `Posyandu ${clinic.name} berhasil diubah.`,
      category: "ANNOUNCEMENT",
      reference_id: clinic.id,
      reference_type: "clinic",
    });

    return clinic;
  }

  async deleteClinic(id) {
    const clinic = await this.getClinicById(id);

    await this.db.clinic.delete({
      where: {
        id,
      },
    });

    await this.notifyAdmins({
      title: "Posyandu berhasil dihapus",
      message: `Posyandu ${clinic.name} berhasil dihapus.`,
      category: "ANNOUNCEMENT",
      reference_id: clinic.id,
      reference_type: "clinic",
    });

    return true;
  }
}

export default new ClinicService();
