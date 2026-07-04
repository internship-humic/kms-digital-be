import CadreController from "./cadre.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { updateCadreSchema } from "./cadre.schema.js";

class CadreRoutes extends BaseRoutes {
  constructor() {
    super("/cadre", CadreController);
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
      summary: "Get All Cadres",
      handler: this.controller.getAllCadres,
    });

    this.register({
      method: "patch",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      schema: updateCadreSchema,
      summary: "Update Cadre",
      handler: this.controller.updateCadre,
    });

    this.register({
      method: "delete",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Delete Cadre",
      handler: this.controller.deleteCadre,
    });
  }
}

export default new CadreRoutes().router;
