import ChildrenService from "./children.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class ChildrenController extends BaseController {
  constructor() {
    super(ChildrenService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = ChildrenService
  }

  async getChildrens(req, res) {
    const query = req.query;
    const data = await this.service.getAllChildrens(query);
    return this.response.success(
      res,
      data.data,
      "Childrens retrieved successfully",
      data.pagination,
    );
  }

  async getChildrensByParent(req, res) {}

  async createChildren(req, res) {}
}

export default new ChildrenController();
