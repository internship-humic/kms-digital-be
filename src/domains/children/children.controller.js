import ChildrenService from "./children.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class ChildrenController extends BaseController {
  constructor() {
    super(ChildrenService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = ChildrenService
  }

  async getAllRiskyChildren(req, res) {
    const query = req.query;
    const data = await this.service.getAllRiskyChildren(query);
    return this.response.success(
      res,
      data.data,
      "Risky childrens retrieved successfully",
      data.pagination,
    );
  }

  async getInterventionByChildrenId(req, res) {
    const { id } = req.params;
    const data = await this.service.getInterventionByChildrenId(id);
    return this.response.success(
      res,
      data,
      "Intervention retrieved successfully",
    );
  }

  async updateIntervention(req, res) {
    const { id } = req.params;
    const payload = req.body;
    const data = await this.service.updateIntervention(id, payload);
    return this.response.success(
      res,
      data,
      "Intervention updated successfully",
    );
  }

  async getAllChildrens(req, res) {
    const query = req.query;
    const data = await this.service.getAllChildrens(query);
    return this.response.success(
      res,
      data.data,
      "Childrens retrieved successfully",
      data.pagination,
    );
  }

  async getChildrensByParent(req, res) {
    const { parentId } = req.params;
    const data = await this.service.getChildrensByParent(parentId);
    return this.response.success(res, data, "Childrens retrieved successfully");
  }

  async createChildren(req, res) {
    const info = req.body;
    const data = await this.service.createChildren(info);
    return this.response.success(res, data, "Children created successfully");
  }

  async updateChildren(req, res) {
    const { id } = req.params;
    const info = req.body;
    const data = await this.service.updateChildren(id, info);
    return this.response.success(res, data, "Children updated successfully");
  }

  async deleteChildren(req, res) {
    const { id } = req.params;

    await this.service.deleteChildren(id);

    return this.response.success(res, null, "Children deleted successfully");
  }

  async getAllChildrenByClinic(req, res) {
    const { clinicId } = req.params;
    const query = req.query;

    const data = await this.service.getAllChildrenByClinic(clinicId, query);

    return this.response.success(
      res,
      data.data,
      "Children by clinic retrieved successfully",
      data.pagination,
    );
  }

  async getAllRiskyChildrenByClinic(req, res) {
    const { clinicId } = req.params;
    const query = req.query;

    const data = await this.service.getAllRiskyChildrenByClinic(
      clinicId,
      query,
    );

    return this.response.success(
      res,
      data.data,
      "Risky children by clinic retrieved successfully",
      data.pagination,
    );
  }
}

export default new ChildrenController();
