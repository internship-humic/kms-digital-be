import Joi from "joi";

const userRole = Joi.string()
  .valid("ADMIN", "PARENTS", "CADRE")
  .messages({
    "any.only": "recipient_role must be ADMIN, PARENTS, or CADRE.",
  });

const notificationCategory = Joi.string()
  .valid("ARTICLE", "MEASUREMENT", "SCHEDULE", "ANNOUNCEMENT", "ACCOUNT")
  .messages({
    "any.only": "category must be ARTICLE, MEASUREMENT, SCHEDULE, ANNOUNCEMENT, or ACCOUNT.",
  });

const createNotificationSchema = Joi.object({
  recipient_id: Joi.string().required().messages({
    "string.empty": "recipient_id is required.",
    "any.required": "recipient_id is required.",
  }),

  recipient_role: userRole.required().messages({
    "any.required": "recipient_role is required.",
  }),

  title: Joi.string().required().messages({
    "string.empty": "title is required.",
    "any.required": "title is required.",
  }),

  message: Joi.string().required().messages({
    "string.empty": "message is required.",
    "any.required": "message is required.",
  }),

  category: notificationCategory.required().messages({
    "any.required": "category is required.",
  }),

  reference_id: Joi.string().allow(null, "").optional(),
  reference_type: Joi.string().allow(null, "").optional(),
});

const updateNotificationSchema = Joi.object({
  is_read: Joi.boolean().messages({
    "boolean.base": "is_read must be a boolean.",
  }),

  title: Joi.string().messages({
    "string.empty": "title cannot be empty.",
  }),

  message: Joi.string().messages({
    "string.empty": "message cannot be empty.",
  }),

  category: notificationCategory,

  reference_id: Joi.string().allow(null, "").optional(),
  reference_type: Joi.string().allow(null, "").optional(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required for update.",
  });

export { createNotificationSchema, updateNotificationSchema };
