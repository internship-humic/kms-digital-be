import BaseService from "../../common/base_classes/base-service.js";
import BaseError from "../../common/base_classes/base-error.js";
import { calculateAllZScores } from "../../utils/zscore.util.js";
import calculateAgeInMonths from "../../utils/age.util.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";
import NotificationService from "../notification/notification.service.js";
import Roles from "../../common/enums/user-roles.enum.js";

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
      OR: [{ intervention: null }, { intervention: { is_intervented: false } }],
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
    });

    if (!children) {
      throw this.error.notFound("Children not found");
    }

    const intervention = await this.db.interventions.findUnique({
      where: { children_id: childrenId },
      include: {
        cadre: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return (
      intervention ?? {
        id: null,
        children_id: childrenId,
        cadre_id: null,
        is_intervented: false,
        referral: false,
        supplement: false,
        education: false,
        created_at: null,
        updated_at: null,
      }
    );
  }

  async updateIntervention(childrenId, payload, cadreId) {
    const existingChildren = await this.db.childrens.findUnique({
      where: { id: childrenId },
    });

    if (!existingChildren) {
      throw this.error.notFound("Children not found");
    }

    const updated = await this.db.interventions.upsert({
      where: { children_id: childrenId },
      update: {
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
        ...(payload.cadre_id !== undefined ? { cadre_id: cadreId } : {}),
      },
      create: {
        children_id: childrenId,
        is_intervented: true,
        referral: payload.referral ?? false,
        supplement: payload.supplement ?? false,
        education: payload.education ?? false,
        cadre_id: cadreId ?? null,
      },
      select: {
        id: true,
        children_id: true,
        cadre_id: true,
        is_intervented: true,
        referral: true,
        supplement: true,
        education: true,
      },
    });

    await NotificationService.createNotification({
      recipient_id: existingChildren.parent_id,
      recipient_role: Roles.Parents,
      title: "Intervensi anak diperbarui",
      message: "Status intervensi anak Anda sudah diperbarui.",
      category: "MEASUREMENT",
      reference_id: existingChildren.id,
      reference_type: "children",
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

  async getAllChildrenByClinic(clinicId, query) {
    const { page, limit, offset } = getPagination(query);
    const filter = ORMfilterable(query, ["name"]) || {};

    const q = (query.search || "").trim();
    if (q) {
      filter.name = { contains: q, mode: "insensitive" };
    }

    filter.measurements = {
      some: {
        clinic_id: clinicId,
      },
    };

    const total = await this.db.childrens.count({ where: filter });

    const data = await this.db.childrens.findMany({
      where: filter,
      include: {
        parent: { select: { id: true, name: true, phone_number: true } },
        measurements: {
          where: { clinic_id: clinicId },
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
      },
      pagination,
    };
  }

  async getAllRiskyChildrenByClinic(clinicId, query) {
    const { page, limit, offset } = getPagination(query);

    const filter = {
      status: {
        in: ["LOWRISK", "HIGHRISK"],
      },
      OR: [{ intervention: null }, { intervention: { is_intervented: false } }],
      measurements: {
        some: {
          clinic_id: clinicId,
        },
      },
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
          where: { clinic_id: clinicId },
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

  async createChildren(info) {
    const {
      name,
      birth_date,
      parent_id,
      gender,
      address,
      status,
      clinic_id,
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
          clinic_id,
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

      await NotificationService.createNotification({
        recipient_id: parent_id,
        recipient_role: Roles.Parents,
        title: "Profil anak berhasil dibuat",
        message: `Profil anak ${children.name} berhasil ditambahkan.`,
        category: "ACCOUNT",
        reference_id: children.id,
        reference_type: "children",
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

    await NotificationService.createNotification({
      recipient_id: existingChildren.parent_id,
      recipient_role: Roles.Parents,
      title: "Profil anak berhasil diubah",
      message: `Profil anak ${existingChildren.name} berhasil diubah.`,
      category: "ACCOUNT",
      reference_id: existingChildren.id,
      reference_type: "children",
    });

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

    await NotificationService.createNotification({
      recipient_id: existingChildren.parent_id,
      recipient_role: Roles.Parents,
      title: "Profil anak berhasil dihapus",
      message: `Profil anak ${existingChildren.name} berhasil dihapus.`,
      category: "ACCOUNT",
      reference_id: existingChildren.id,
      reference_type: "children",
    });

    return true;
  }

  async exportChildPdf(childId, user) {
    const child = await this.db.childrens.findUnique({
      where: { id: childId },
      include: {
        parent: true,
        intervention: true,
      },
    });

    if (!child) {
      throw BaseError.notFound("Children not found");
    }

    if (user.role === Roles.Parents) {
      if (child.parent_id !== user.id) {
        throw BaseError.forbidden(
          "Access Denied: You can only export your own child's report",
        );
      }
    } else if (user.role === Roles.Cadre) {
      if (child.parent.clinic_id !== user.clinic_id) {
        throw BaseError.forbidden(
          "Access Denied: Child is not registered in your clinic",
        );
      }
    }

    const measurements = await this.db.measurements.findMany({
      where: { children_id: childId },
      orderBy: { measurement_date: "desc" },
    });

    const clinic = await this.db.clinic.findUnique({
      where: { id: child.parent.clinic_id },
    });

    return {
      child,
      measurements,
      clinic,
    };
  }

  async exportClinicPdf(clinicId, user) {
    if (user.role === Roles.Cadre) {
      if (user.clinic_id !== clinicId) {
        throw BaseError.forbidden(
          "Access Denied: You can only export reports for your own clinic",
        );
      }
    }

    const clinic = await this.db.clinic.findUnique({
      where: { id: clinicId },
    });

    if (!clinic) {
      throw BaseError.notFound("Clinic not found");
    }

    const childrenList = await this.db.childrens.findMany({
      where: {
        parent: {
          clinic_id: clinicId,
        },
      },
      include: {
        parent: true,
      },
      orderBy: {
        name: "asc",
      },
    });

    return {
      clinic,
      cadreName: user.name,
      childrenList,
    };
  }
}

export default new ChildrenService();
