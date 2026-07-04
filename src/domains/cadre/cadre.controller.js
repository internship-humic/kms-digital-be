import CadreService from "./cadre.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class CadreController extends BaseController {
  constructor() {
    super(CadreService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = CadreService
  }

  async getAllCadres(req, res) {
    const query = req.query;

    const result = await this.service.getAllCadres(query);

    return this.response.success(
      res,
      result.data,
      "Cadres retrieved successfully",
      result.pagination,
    );
  }

  async updateCadre(req, res) {
    const { id } = req.params;
    const info = req.body;

    const data = await this.service.updateCadre(id, info);

    return this.response.success(res, data, "Cadre updated successfully");
  }

  async deleteCadre(req, res) {
    const { id } = req.params;

    await this.service.deleteCadre(id);

    return this.response.success(res, true, "Cadre deleted successfully");
  }
}

export default new CadreController();
