import BaseService from "../../common/base_classes/base-service.js";

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
}

export default new RegionService();
