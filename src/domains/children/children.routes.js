import ChildrenController from "./children.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { childrenSchema } from "./children.schema.js";

class ChildrenRoutes extends BaseRoutes {
  constructor() {
    super(ChildrenController);
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
      this.auth.role([this.roles.Cadre, this.roles.Admin]),
      this.errCatch(this.controller.getAllChildrens.bind(this.controller)),
    ]);

    this.router.get("/:parentId", [
      this.auth.authenticate,
      this.errCatch(this.controller.getAllChildrensByParent.bind(this.controller)),
    ]);

    this.router.post("/", [
      this.auth.authenticate,
      this.auth.role([this.roles.Cadre, this.roles.Admin]),
      this.validate(childrenSchema),
      this.errCatch(this.controller.createChildren.bind(this.controller)),
    ]);
  }
}

export default new ChildrenRoutes().router;
