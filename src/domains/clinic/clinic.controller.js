import ClinicService from "./clinic.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class ClinicController extends BaseController {
  constructor() {
    super(ClinicService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = ClinicService
  }

  async getClinicsByVillage(req, res) {
    const { villageId } = req.params;

    const data = await this.service.getClinicsByVillage(villageId);

    return this.response.success(
      res,
      data,
      "Clinics by Village retrieved successfully",
    );
  }
}

export default new ClinicController();
