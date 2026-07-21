import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import { ORMfilterable } from "../../utils/query.util.js";

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
    const { page, limit, offset } = getPagination(query);

    const coverageFilter = {
      clinics: {
        some: {},
      },
    };

    const filter = {
      ...coverageFilter,
      ...(ORMfilterable(query, ["name"]) || {}),
    };

    const q = (query.search || "").trim();
    if (q) {
      filter.name = {
        contains: q,
        mode: "insensitive",
      };
    }

    const [
      totalVillages,
      totalCoveredVillages,
      totalFilteredCoveredVillages,
      villages,
    ] = await this.db.$transaction([
      this.db.village.count(),

      this.db.village.count({
        where: coverageFilter,
      }),

      this.db.village.count({
        where: filter,
      }),

      this.db.village.findMany({
        where: filter,
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
                      intervention: {
                        select: {
                          is_intervented: true,
                        },
                      },
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
          !child.intervention?.is_intervented,
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
      pagination: getMeta(totalFilteredCoveredVillages, page, limit),
    };
  }
}

export default new RegionService();
