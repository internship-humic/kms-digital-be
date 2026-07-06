import BaseService from "../../common/base_classes/base-service.js";

class DashboardService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getParentDashboard(parentId) {
    return await this.db.childrens.findMany({
      where: { parent_id: parentId },
      orderBy: { created_at: "desc" },
    });
  }

  async getCadreDashboard(cadreId, clinicId) {
    const childrens = await this.db.childrens.count({
      where: {
        parent: {
          clinic_id: clinicId,
        },
      },
    });

    const riskyChildren = await this.db.childrens.count({
      where: {
        parent: {
          clinic_id: clinicId,
        },
        status: {
          in: ["LOWRISK", "HIGHRISK"],
        },
        is_intervented: false,
      },
    });

    const latestMeasurements = await this.db.measurements.findMany({
      where: { clinic_id: clinicId },
      orderBy: { measurement_date: "desc" },
      take: 3,
      include: {
        children: { select: { status: true } },
      },
    });

    const data = {
      total_children: childrens,
      total_risky_children: riskyChildren,
      latest_measurements: latestMeasurements,
    };

    return data;
  }

  async getAdminDashboard() {
    const totalChildren = await this.db.childrens.count();
    const totalRiskyChildren = await this.db.childrens.count({
      where: {
        status: {
          in: ["LOWRISK", "HIGHRISK"],
        },
        is_intervented: false,
      },
    });
    const totalNormalChildren = await this.db.childrens.count({
      where: {
        status: "NORMAL",
      },
    });
    const totalClinics = await this.db.clinic.count();

    const totalVillages = await this.db.village.count();
    const totalCoveredVillages = await this.db.village.count({
      where: {
        clinics: {
          some: {},
        },
      },
    });
    const uncoveredVillage = totalVillages - totalCoveredVillages;
    const coveredVillagePercentage = Number(
      ((totalCoveredVillages / totalVillages) * 100).toFixed(5),
    );

    const totalCadres = await this.db.cadre.count();

    const latestClinics = await this.db.clinic.findMany({
      orderBy: { created_at: "desc" },
      take: 5,
      include: {
        village: { select: { name: true } },
      },
    });

    const data = {
      childrens: {
        total_children: totalChildren,
        total_risky_children: totalRiskyChildren,
        total_normal_children: totalNormalChildren,
      },
      regions: {
        total_villages: totalVillages,
        total_covered_villages: totalCoveredVillages,
        total_uncovered_villages: uncoveredVillage,
        village_percentage: coveredVillagePercentage,
      },
      clinics: {
        total_clinics: totalClinics,
        latest_clinics: latestClinics,
      },
      total_cadres: totalCadres,
    };

    return data;
  }
}

export default new DashboardService();
