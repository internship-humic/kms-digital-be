
import NotificationController from "./notification.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { notificationSchema } from "./notification.schema.js";

class NotificationRoutes extends BaseRoutes {
  constructor() {
    super("/notification", NotificationController);
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
      summary: "Get Notification by ID",
      handler: this.controller.someMethod,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      schema: notificationSchema,
      summary: "Create Notification",
      handler: this.controller.someMethod,
    });
  }
}

export default new NotificationRoutes().router;
