import ParentController from "./parent.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { parentSchema } from "./parent.schema.js";

class ParentRoutes extends BaseRoutes {
  constructor() {
    super(ParentController);
    // this.router = Router();
    // this.auth = AuthMiddleware;
    // this.validate = Validate;
    // this.errCatch = ErrorMiddleware.errorCatcher;
    // this.controller = controller;
    // this.roles = Roles;
    // this.routes();
  }

  routes() {
    this.router.get("/", [
      this.auth.authenticate,
      this.auth.role([this.roles.Admin]),
      this.errCatch(this.controller.getAllParents.bind(this.controller)),
    ]);

    this.router.get("/:clinicId", [
      this.auth.authenticate,
      this.auth.role([this.roles.Cadre, this.roles.Admin]),
      this.errCatch(
        this.controller.getAllParentsByClinic.bind(this.controller),
      ),
    ]);
  }
}

export default new ParentRoutes().router;
