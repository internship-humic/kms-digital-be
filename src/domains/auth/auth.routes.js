import AuthController from "./auth.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import {
  loginSchema,
  registerSchema,
  activationSchema,
} from "./auth.schema.js";

class AuthRoutes extends BaseRoutes {
  constructor() {
    super("/auth", AuthController);
    // this.router = Router()
    // this.auth = AuthMiddleware
    // this.validate = Validate
    // this.errCatch = ErrorMiddleware.errorCatcher;
    // this.controller = AuthController
    // this.roles = Roles
    // this.routes()
  }

  routes() {
    this.register({
      method: "post",
      path: "/login",
      schema: loginSchema,
      summary: "Login",
      handler: this.controller.login,
    });

    this.register({
      method: "post",
      path: "/register",
      schema: registerSchema,
      summary: "Register",
      handler: this.controller.register,
    });

    this.register({
      method: "post",
      path: "/activation",
      auth: true,
      roles: [this.roles.Admin],
      schema: activationSchema,
      summary: "Activate Cadre",
      handler: this.controller.activateCadre,
    });
  }
}

export default new AuthRoutes().router;
