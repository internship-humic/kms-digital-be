import DashboardController from "./dashboard.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { dashboardSchema } from "./dashboard.schema.js";

class DashboardRoutes extends BaseRoutes {
  constructor() {
    super("/dashboard", DashboardController);
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
      path: "/parent",
      auth: true,
      roles: [this.roles.Parents],
      summary: "Get Dashboard Parent",
      handler: this.controller.getParentDashboard,
    });
    this.register({
      method: "get",
      path: "/cadre",
      auth: true,
      roles: [this.roles.Cadre],
      summary: "Get Dashboard Cadre",
      handler: this.controller.getCadreDashboard,
    });
    this.register({
      method: "get",
      path: "/admin",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Get Dashboard Admin",
      handler: this.controller.getAdminDashboard,
    });

    // this.register({
    //   method: "post",
    //   path: "/",
    //   auth: true,
    //   roles: [this.roles.Admin],
    //   schema: dashboardSchema,
    //   summary: "Create Dashboard",
    //   handler: this.controller.someMethod,
    // });
  }
}

export default new DashboardRoutes().router;
