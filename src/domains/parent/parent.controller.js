import ParentService from "./parent.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class ParentController extends BaseController {
  constructor() {
    super(ParentService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = ParentService
  }

  async getAllParents(req, res) {
    const query = req.query;
    const data = await this.service.getAllParents(query);
    return this.response.success(
      res,
      data.data,
      "Parents retrieved successfully",
      data.pagination,
    );
  }

  async getAllParentsByClinic(req, res) {
    const query = req.query;
    const { clinicId } = req.params;
    const data = await this.service.getAllParentsByClinic(query, clinicId);
    return this.response.success(
      res,
      data.data,
      "Parents retrieved successfully",
      data.pagination,
    );
  }
}

export default new ParentController();
