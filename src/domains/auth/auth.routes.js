import AuthController from "./auth.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import {
  loginSchema,
  registerSchema,
  activationSchema,
  profileSchema,
  changePasswordSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
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

    this.register({
      method: "patch",
      path: "/profile",
      auth: true,
      schema: profileSchema,
      summary: "Update Current User Profile",
      handler: this.controller.updateProfile,
    });

    this.register({
      method: "patch",
      path: "/change-password",
      auth: true,
      schema: changePasswordSchema,
      summary: "Change Current User Password",
      handler: this.controller.changePassword,
    });

    this.register({
      method: "post",
      path: "/forgot-password",
      schema: forgotPasswordSchema,
      summary: "Request Password Reset",
      handler: this.controller.requestPasswordReset,
    });

    this.register({
      method: "post",
      path: "/reset-password",
      schema: resetPasswordSchema,
      summary: "Reset Password",
      handler: this.controller.resetPassword,
    });
  }
}

export default new AuthRoutes().router;
