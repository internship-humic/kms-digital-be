import RegionController from "./region.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";

class RegionRoutes extends BaseRoutes {
  constructor() {
    super("/region", RegionController);
    //this.router = Router();
    //this.auth = AuthMiddleware;
    //this.validate = Validate;
    //this.errCatch = ErrorMiddleware.errorCatcher;
    //this.controller = controller;
    //this.roles = Roles;
    //this.routes();
  }

  routes() {
    this.register({
      method: "get",
      path: "/province",
      summary: "Get Provinces",
      handler: this.controller.getProvinces,
    });
    this.register({
      method: "get",
      path: "/regency/:provinceId",
      summary: "Get Regencies by Province ID",
      handler: this.controller.getRegencies,
    });
    this.register({
      method: "get",
      path: "/district/:regencyId",
      summary: "Get Districts by Regency ID",
      handler: this.controller.getDistricts,
    });
    this.register({
      method: "get",
      path: "/village/:districtId",
      summary: "Get Villages by District ID",
      handler: this.controller.getVillages,
    });
  }
}

export default new RegionRoutes().router;
