import RegionController from "./region.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { regionSchema } from "./region.schema.js";

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
    this.router.get("/province/:Keyword?", [
      this.auth.authenticate,
      this.auth.role([this.roles.Admin]),
      this.errCatch(this.controller.province.bind(this.controller)),
    ]);
    this.router.get("/regency/:ProvinceId/:Keyword?", [
      this.auth.authenticate,
      this.auth.role([this.roles.Admin]),
      this.errCatch(this.controller.regency.bind(this.controller)),
    ]);
    this.router.get("/district/:RegencyId/:Keyword?", [
      this.auth.authenticate,
      this.auth.role([this.roles.Admin]),
      this.errCatch(this.controller.district.bind(this.controller)),
    ]);
    this.router.get("/village/:DistrictId/:Keyword?", [
      this.auth.authenticate,
      this.auth.role([this.roles.Admin]),
      this.errCatch(this.controller.village.bind(this.controller)),
    ]);
  }
}

export default new RegionRoutes().router;
