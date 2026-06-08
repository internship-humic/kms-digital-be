import BaseService from "../../common/base_classes/base-service.js";

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
}

export default new ClinicService();
