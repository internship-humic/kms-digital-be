import ClinicController from "./clinic.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { clinicSchema } from "./clinic.schema.js";

class ClinicRoutes extends BaseRoutes {
  constructor() {
    super(ClinicController);
    //this.router = Router();
    //this.auth = AuthMiddleware;
    //this.validate = Validate;
    //this.errCatch = ErrorMiddleware.errorCatcher;
    //this.controller = controller;
    //this.roles = Roles;
    //this.routes();
  }

  routes() {
    this.router.get("/:villageId", [
      this.errCatch(this.controller.getClinicsByVillage.bind(this.controller)),
    ]);
  }
}

export default new ClinicRoutes().router;
