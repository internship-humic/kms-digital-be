import BaseService from "../../common/base_classes/base-service.js";
import { getPagination, getMeta } from "../../utils/pagination.util.js";
import Roles from "../../common/enums/user-roles.enum.js";

class NotificationService extends BaseService {
  constructor() {
    super();
  }

  async getAllNotifications(query, user) {
    const { page, limit, offset } = getPagination(query);

    const filter = {
      recipient_id: user.id,
      recipient_role: user.role,
    };

    if (query.is_read !== undefined) {
      filter.is_read = query.is_read === "true" || query.is_read === true;
    }

    if (query.category) {
      filter.category = query.category;
    }

    const total = await this.db.notification.count({
      where: filter,
    });

    const data = await this.db.notification.findMany({
      where: filter,
      skip: offset,
      take: limit,
      orderBy: {
        created_at: "desc",
      },
    });

    const pagination = getMeta(total, page, limit);

    return {
      data,
      pagination,
    };
  }

  async getNotificationById(id, user) {
    const notification = await this.db.notification.findUnique({
      where: { id },
    });

    if (!notification) {
      throw this.error.notFound("Notification not found");
    }

    if (
      notification.recipient_id !== user.id ||
      notification.recipient_role !== user.role
    ) {
      throw this.error.forbidden("Access denied to this notification");
    }

    return notification;
  }

  async createNotification(info) {
    if (info.recipient_role === Roles.Admin) {
      const recipient = await this.db.admin.findUnique({
        where: { id: info.recipient_id },
      });
      if (!recipient) {
        throw this.error.notFound("Recipient Admin not found");
      }
    } else if (info.recipient_role === Roles.Parents) {
      const recipient = await this.db.parents.findUnique({
        where: { id: info.recipient_id },
      });
      if (!recipient) {
        throw this.error.notFound("Recipient Parents not found");
      }
    } else if (info.recipient_role === Roles.Cadre) {
      const recipient = await this.db.cadre.findUnique({
        where: { id: info.recipient_id },
      });
      if (!recipient) {
        throw this.error.notFound("Recipient Cadre not found");
      }
    } else {
      throw this.error.badRequest("Invalid recipient role");
    }

    return await this.db.notification.create({
      data: {
        recipient_id: info.recipient_id,
        recipient_role: info.recipient_role,
        title: info.title,
        message: info.message,
        category: info.category,
        reference_id: info.reference_id || null,
        reference_type: info.reference_type || null,
        is_read: info.is_read !== undefined ? info.is_read : false,
      },
    });
  }

  async updateNotification(id, info, user) {
    await this.getNotificationById(id, user);

    if (info.is_read === undefined) {
      throw this.error.badRequest("Only 'is_read' field can be updated");
    }

    return await this.db.notification.update({
      where: { id },
      data: {
        is_read: info.is_read,
      },
    });
  }

  async deleteNotification(id, user) {
    await this.getNotificationById(id, user);

    await this.db.notification.delete({
      where: { id },
    });

    return true;
  }
}

export default new NotificationService();
