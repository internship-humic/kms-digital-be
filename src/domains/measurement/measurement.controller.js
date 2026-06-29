import MeasurementService from "./measurement.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class MeasurementController extends BaseController {
  constructor() {
    super(MeasurementService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = MeasurementService
  }

  async createMeasurement(req, res) {
    const data = await this.service.createMeasurement(req.body);

    return this.response.success(res, data, "Measurement created successfully");
  }

  async updateMeasurement(req, res) {
    const { id } = req.params;

    const data = await this.service.updateMeasurement(id, req.body);

    return this.response.success(res, data, "Measurement updated successfully");
  }

  async getMeasurements(req, res) {
    const query = req.query;

    const data = await this.service.getMeasurements(query);

    return this.response.success(
      res,
      data.data,
      "Measurements retrieved successfully",
      data.pagination,
    );
  }

  async getMeasurementById(req, res) {
    const { id } = req.params;

    const data = await this.service.getMeasurementById(id);

    return this.response.success(
      res,
      data,
      "Measurement retrieved successfully",
    );
  }

  async getMeasurementGraph(req, res) {
    const { childrenId } = req.params;

    const data = await this.service.getMeasurementGraph(childrenId);

    return this.response.success(
      res,
      data,
      "Measurement graph retrieved successfully",
    );
  }

  async deleteMeasurement(req, res) {
    const { id } = req.params;

    await this.service.deleteMeasurement(id);

    return this.response.success(res, null, "Measurement deleted successfully");
  }
}

export default new MeasurementController();
