import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";

class RegionService extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async getProvinces(query = "") {
    return this.db.province.findMany({
      where: {
        ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
      },
    });
  }

  async getRegencies(provinceId, query = "") {
    return this.db.regency.findMany({
      where: {
        province_id: provinceId,
        ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
      },
    });
  }

  async getDistricts(regencyId, query = "") {
    return this.db.district.findMany({
      where: {
        regency_id: regencyId,
        ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
      },
    });
  }

  async getVillages(districtId, query = "") {
    return this.db.village.findMany({
      where: {
        district_id: districtId,
        ...(query ? { name: { contains: query, mode: "insensitive" } } : {}),
      },
    });
  }

  async getCoveredRegions(query) {
    const page = Number(query?.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const coveredVillageWhere = {
      clinics: {
        some: {},
      },
    };

    const [totalVillages, totalCoveredVillages, villages] =
      await this.db.$transaction([
        this.db.village.count(),

        this.db.village.count({
          where: coveredVillageWhere,
        }),

        this.db.village.findMany({
          where: coveredVillageWhere,
          skip: offset,
          take: limit,
          orderBy: {
            name: "asc",
          },
          include: {
            district: {
              select: {
                id: true,
                name: true,
              },
            },
            clinics: {
              include: {
                parents: {
                  include: {
                    children: {
                      select: {
                        status: true,
                        is_intervented: true,
                      },
                    },
                  },
                },
              },
            },
          },
        }),
      ]);

    const uncoveredVillages = totalVillages - totalCoveredVillages;

    const coveredVillagePercentage =
      totalVillages === 0
        ? 0
        : Number(((totalCoveredVillages / totalVillages) * 100).toFixed(5));

    const riskRegions = villages.map((village) => {
      const children = village.clinics.flatMap((clinic) =>
        clinic.parents.flatMap((parent) => parent.children),
      );

      const totalChildren = children.length;

      const riskyChildren = children.filter(
        (child) =>
          ["LOWRISK", "HIGHRISK"].includes(child.status) &&
          !child.is_intervented,
      ).length;

      const percentage =
        totalChildren === 0
          ? 0
          : Number(((riskyChildren / totalChildren) * 100).toFixed(2));

      let label = "LOW";

      if (percentage >= 30) {
        label = "HIGH";
      } else if (percentage >= 15) {
        label = "MEDIUM";
      }

      return {
        districtId: village.district.id,
        district: village.district.name,
        villageId: village.id,
        village: village.name,
        totalChildren,
        riskyChildren,
        percentage,
        label,
      };
    });

    return {
      data: {
        coverage: {
          totalVillages,
          totalCoveredVillages,
          uncoveredVillages,
          coveredVillagePercentage,
        },
        riskRegions,
      },
      pagination: getMeta(totalCoveredVillages, page, limit),
    };
  }
}

export default new RegionService();
