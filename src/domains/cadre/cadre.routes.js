
import CadreController from "./cadre.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { cadreSchema } from "./cadre.schema.js";

class CadreRoutes extends BaseRoutes {
  constructor() {
    super(`/cadre`, CadreController);
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
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Get Cadre by ID",
      handler: this.controller.someMethod,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      schema: cadreSchema,
      summary: "Create Cadre",
      handler: this.controller.someMethod,
    });
  }
}

export default new CadreRoutes().router;
