import NotificationService from "./notification.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class NotificationController extends BaseController {
  constructor() {
    super(NotificationService);
  }

  async getAllNotifications(req, res) {
    const query = req.query;
    const user = req.user;

    const result = await this.service.getAllNotifications(query, user);

    return this.response.success(
      res,
      result.data,
      "Notifications retrieved successfully",
      result.pagination,
    );
  }

  async getNotificationById(req, res) {
    const { id } = req.params;
    const user = req.user;

    const result = await this.service.getNotificationById(id, user);

    return this.response.success(
      res,
      result,
      "Notification retrieved successfully",
    );
  }

  async createNotification(req, res) {
    const info = req.body;

    const result = await this.service.createNotification(info);

    return this.response.created(
      res,
      result,
      "Notification created successfully",
    );
  }

  async updateNotification(req, res) {
    const { id } = req.params;
    const info = req.body;
    const user = req.user;

    const result = await this.service.updateNotification(id, info, user);

    return this.response.success(
      res,
      result,
      "Notification updated successfully",
    );
  }

  async deleteNotification(req, res) {
    const { id } = req.params;
    const user = req.user;

    await this.service.deleteNotification(id, user);

    return this.response.success(
      res,
      true,
      "Notification deleted successfully",
    );
  }
}

export default new NotificationController();
