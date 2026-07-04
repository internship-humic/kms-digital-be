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

  async getAllClinics(req, res) {
    const query = req.query;

    const result = await this.service.getAllClinics(query);

    return this.success(
      res,
      result.data,
      "Clinics retrieved successfully",
      result.pagination,
    );
  }

  async getClinicById(req, res) {
    const { id } = req.params;

    const result = await this.service.getClinicById(id);

    return this.success(res, result, "Clinic retrieved successfully");
  }

  async createClinic(req, res) {
    const info = req.body;

    const result = await this.service.createClinic(info);

    return this.created(res, result, "Clinic created successfully");
  }

  async updateClinic(req, res) {
    const { id } = req.params;
    const info = req.body;

    const result = await this.service.updateClinic(id, info);

    return this.success(res, result, "Clinic updated successfully");
  }

  async deleteClinic(req, res) {
    const { id } = req.params;

    await this.service.deleteClinic(id);

    return this.success(res, true, "Clinic deleted successfully");
  }
}

export default new ClinicController();
