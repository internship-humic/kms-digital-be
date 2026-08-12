export default {
  "GET /notification/": {
    summary: "Get All Notifications",
    description:
      "Retrieve notifications scoped to the current user's role and recipient ID. Admins can view all notifications and filter by recipient.",
    query: {
      page: {
        type: "integer",
        description: "Page number for pagination",
        example: 1,
      },
      limit: {
        type: "integer",
        description: "Number of items per page",
        example: 10,
      },
      is_read: {
        type: "boolean",
        description: "Filter notifications by read status",
        example: false,
      },
      category: {
        type: "string",
        description:
          "Filter by notification category (ARTICLE, MEASUREMENT, SCHEDULE, ANNOUNCEMENT, ACCOUNT)",
        example: "MEASUREMENT",
      },
      recipient_id: {
        type: "string",
        description: "Filter by recipient ID (Admin only)",
        example: "parent-uuid-1",
      },
      recipient_role: {
        type: "string",
        description: "Filter by recipient role (Admin only): ADMIN, PARENTS, or CADRE",
        example: "PARENTS",
      },
    },
    response: {
      success: true,
      status: "OK",
      message: "Notifications retrieved successfully",
      pagination: {
        total: 1,
        page: 1,
        limit: 10,
        totalPages: 1,
      },
      data: [
        {
          id: "notification-uuid-1",
          recipient_id: "parent-uuid-1",
          recipient_role: "PARENTS",
          title: "Status Gizi Anak",
          message:
            "Halo Ibu, pengukuran bulanan anak Anda telah diperbarui. Silakan cek detailnya.",
          category: "MEASUREMENT",
          is_read: false,
          reference_id: "measurement-uuid-123",
          reference_type: "MEASUREMENT",
          created_at: "2026-07-07T10:15:21.000Z",
        },
      ],
    },
  },

  "GET /notification/:id": {
    summary: "Get Notification By Id",
    description:
      "Retrieve a specific notification by its ID. Non-admin users can only access their own notifications.",
    params: {
      id: "notification-uuid-1",
    },
    response: {
      success: true,
      status: "OK",
      message: "Notification retrieved successfully",
      pagination: null,
      data: {
        id: "notification-uuid-1",
        recipient_id: "parent-uuid-1",
        recipient_role: "PARENTS",
        title: "Status Gizi Anak",
        message:
          "Halo Ibu, pengukuran bulanan anak Anda telah diperbarui. Silakan cek detailnya.",
        category: "MEASUREMENT",
        is_read: false,
        reference_id: "measurement-uuid-123",
        reference_type: "MEASUREMENT",
        created_at: "2026-07-07T10:15:21.000Z",
      },
    },
  },

  "POST /notification/": {
    summary: "Create Notification",
    description:
      "Send a notification to a specific recipient (Admin only). Validates recipient existence before creation.",
    request: {
      recipient_id: "parent-uuid-1",
      recipient_role: "PARENTS",
      title: "Jadwal Posyandu Baru",
      message: "Jadwal pelayanan posyandu bulan ini telah diatur. Datang tepat waktu ya!",
      category: "SCHEDULE",
      reference_id: "schedule-uuid-456",
      reference_type: "SCHEDULE",
    },
    response: {
      success: true,
      status: "CREATED",
      message: "Notification created successfully",
      pagination: null,
      data: {
        id: "new-notification-uuid",
        recipient_id: "parent-uuid-1",
        recipient_role: "PARENTS",
        title: "Jadwal Posyandu Baru",
        message: "Jadwal pelayanan posyandu bulan ini telah diatur. Datang tepat waktu ya!",
        category: "SCHEDULE",
        is_read: false,
        reference_id: "schedule-uuid-456",
        reference_type: "SCHEDULE",
        created_at: "2026-07-07T10:17:00.000Z",
      },
    },
  },

  "PATCH /notification/:id": {
    summary: "Update Notification",
    description:
      "Update notification fields. Non-admins can only update 'is_read'. Admins can update any field including title, message, and category.",
    params: {
      id: "notification-uuid-1",
    },
    request: {
      is_read: true,
    },
    response: {
      success: true,
      status: "OK",
      message: "Notification updated successfully",
      pagination: null,
      data: {
        id: "notification-uuid-1",
        recipient_id: "parent-uuid-1",
        recipient_role: "PARENTS",
        title: "Status Gizi Anak",
        message:
          "Halo Ibu, pengukuran bulanan anak Anda telah diperbarui. Silakan cek detailnya.",
        category: "MEASUREMENT",
        is_read: true,
        reference_id: "measurement-uuid-123",
        reference_type: "MEASUREMENT",
        created_at: "2026-07-07T10:15:21.000Z",
      },
    },
  },

  "DELETE /notification/:id": {
    summary: "Delete Notification",
    description: "Permanently delete a notification by ID (Admin only).",
    params: {
      id: "notification-uuid-1",
    },
    response: {
      success: true,
      status: "OK",
      message: "Notification deleted successfully",
      pagination: null,
      data: true,
    },
  },
};
