import NotificationController from "./notification.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { createNotificationSchema, updateNotificationSchema } from "./notification.schema.js";

class NotificationRoutes extends BaseRoutes {
  constructor() {
    super("/notification", NotificationController);
  }

  routes() {
    this.register({
      method: "get",
      path: "/",
      auth: true,
      summary: "Get All Notifications",
      handler: this.controller.getAllNotifications,
    });

    this.register({
      method: "get",
      path: "/:id",
      auth: true,
      summary: "Get Notification by ID",
      handler: this.controller.getNotificationById,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      schema: createNotificationSchema,
      summary: "Create Notification",
      handler: this.controller.createNotification,
    });

    this.register({
      method: "patch",
      path: "/:id",
      auth: true,
      schema: updateNotificationSchema,
      summary: "Update Notification",
      handler: this.controller.updateNotification,
    });

    this.register({
      method: "delete",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Delete Notification",
      handler: this.controller.deleteNotification,
    });
  }
}

export default new NotificationRoutes().router;
