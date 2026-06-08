import RegionController from "./region.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";

class RegionRoutes extends BaseRoutes {
  constructor() {
    super(RegionController);
    //this.router = Router();
    //this.auth = AuthMiddleware;
    //this.validate = Validate;
    //this.errCatch = ErrorMiddleware.errorCatcher;
    //this.controller = controller;
    //this.roles = Roles;
    //this.routes();
  }

  routes() {
    this.router.get("/province", [
      this.errCatch(this.controller.getProvinces.bind(this.controller)),
    ]);
    this.router.get("/regency/:provinceId", [
      this.errCatch(this.controller.getRegencies.bind(this.controller)),
    ]);
    this.router.get("/district/:regencyId", [
      this.errCatch(this.controller.getDistricts.bind(this.controller)),
    ]);
    this.router.get("/village/:districtId", [
      this.errCatch(this.controller.getVillages.bind(this.controller)),
    ]);
  }
}

export default new RegionRoutes().router;
