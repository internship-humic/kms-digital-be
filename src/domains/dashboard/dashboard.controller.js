import DashboardService from "./dashboard.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class DashboardController extends BaseController {
  constructor() {
    super(DashboardService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = DashboardService
  }

  async getParentDashboard(req, res) {
    const parentId = req.user.id;

    const result = await this.service.getParentDashboard(parentId);

    return this.response.success(
      res,
      result,
      "Parent dashboard retrieved successfully",
    );
  }

  async getCadreDashboard(req, res) {
    const cadreId = req.user.id;
    const clinicId = req.user.clinic_id;

    const result = await this.service.getCadreDashboard(cadreId, clinicId);

    return this.response.success(
      res,
      result,
      "Cadre dashboard retrieved successfully",
    );
  }

  async getAdminDashboard(req, res) {
    const result = await this.service.getAdminDashboard();

    return this.response.success(
      res,
      result,
      "Admin dashboard retrieved successfully",
    );
  }
}

export default new DashboardController();
