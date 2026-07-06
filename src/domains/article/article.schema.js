import Joi from "joi";

const articleType = Joi.string()
  .valid("ACTIVITY", "NUTRITION", "HEALTH")
  .messages({
    "any.only": "Type must be ACTIVITY, NUTRITION, or HEALTH.",
  });

const createArticleSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required.",
  }),

  description: Joi.string().required().messages({
    "string.empty": "Description is required.",
  }),

  content: Joi.object().required().messages({
    "any.required": "Content is required.",
    "object.base": "Content must be a valid JSON object.",
  }),

  writer_name: Joi.string().required().messages({
    "string.empty": "Writer name is required.",
  }),

  writer_identity: Joi.string().required().messages({
    "string.empty": "Writer identity is required.",
  }),

  type: articleType.required(),
});

const updateArticleSchema = Joi.object({
  title: Joi.string().messages({
    "string.empty": "Title cannot be empty.",
  }),

  description: Joi.string().messages({
    "string.empty": "Description cannot be empty.",
  }),

  content: Joi.object().required().messages({
    "any.required": "Content is required.",
    "object.base": "Content must be a valid JSON object.",
  }),

  writer_name: Joi.string().messages({
    "string.empty": "Writer name cannot be empty.",
  }),

  writer_identity: Joi.string().messages({
    "string.empty": "Writer identity cannot be empty.",
  }),

  type: articleType,
})
  .min(1)
  .messages({
    "object.min": "At least one field is required.",
  });

export { createArticleSchema, updateArticleSchema };
