import AuthController from "./auth.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import {
  loginSchema,
  registerSchema,
  activationSchema,
} from "./auth.schema.js";

class AuthRoutes extends BaseRoutes {
  constructor() {
    super(AuthController);
    // this.router = Router()
    // this.auth = AuthMiddleware
    // this.validate = Validate
    // this.errCatch = ErrorMiddleware.errorCatcher
    // this.controller = AuthController
    // this.roles = Roles
    // this.routes()
  }

  routes() {
    this.router.post("/login", [
      this.validate(loginSchema),
      this.errCatch(this.controller.login.bind(this.controller)),
    ]);

    this.router.post("/register", [
      this.validate(registerSchema),
      this.errCatch(this.controller.register.bind(this.controller)),
    ]);

    this.router.post("/activation", [
      this.auth.authenticate,
      this.auth.role([this.roles.Admin]),
      this.validate(activationSchema),
      this.errCatch(this.controller.activateCadre.bind(this.controller)),
    ]);
  }
}

export default new AuthRoutes().router;
