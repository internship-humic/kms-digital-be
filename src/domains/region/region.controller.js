import RegionService from "./region.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class RegionController extends BaseController {
  constructor() {
    super(RegionService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = RegionService
  }

  async getProvinces(req, res) {
    const { keyword = "" } = req.query;

    const data = await this.service.getProvinces(keyword);

    return this.response.success(res, data, "Provinces retrieved successfully");
  }

  async getRegencies(req, res) {
    const { provinceId } = req.params;
    const { keyword = "" } = req.query;

    const data = await this.service.getRegencies(provinceId, keyword);

    return this.response.success(res, data, "Regencies retrieved successfully");
  }

  async getDistricts(req, res) {
    const { regencyId } = req.params;
    const { keyword = "" } = req.query;

    const data = await this.service.getDistricts(regencyId, keyword);

    return this.response.success(res, data, "Districts retrieved successfully");
  }

  async getVillages(req, res) {
    const { districtId } = req.params;
    const { keyword = "" } = req.query;

    const data = await this.service.getVillages(districtId, keyword);

    return this.response.success(res, data, "Villages retrieved successfully");
  }

  async getCoveredRegions(req, res) {
    const query = req.query;
    const data = await this.service.getCoveredRegions(query);

    return this.response.success(
      res,
      data.data,
      "Covered regions retrieved successfully",
      data.pagination,
    );
  }
}

export default new RegionController();
