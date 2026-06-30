import ParentController from "./parent.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { parentSchema } from "./parent.schema.js";

class ParentRoutes extends BaseRoutes {
  constructor() {
    super("/parent", ParentController);
    // this.router = Router();
    // this.auth = AuthMiddleware;
    // this.validate = Validate;
    // this.errCatch = ErrorMiddleware.errorCatcher;
    // this.controller = controller;
    // this.roles = Roles;
    // this.routes();
  }

  routes() {
    this.register({
      method: "get",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Get All Parents",
      handler: this.controller.getAllParents,
    });

    this.register({
      method: "get",
      path: "/:clinicId",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Get All Parents by Clinic ID",
      handler: this.controller.getAllParentsByClinic,
    });
  }
}

export default new ParentRoutes().router;
