import Joi from "joi";

const updateCadreSchema = Joi.object({
  name: Joi.string().min(4).messages({
    "string.empty": "Name cannot be empty.",
    "string.min": "Name must be at least 4 characters long.",
  }),

  email: Joi.string().email().messages({
    "string.empty": "Email cannot be empty.",
    "string.email": "Email must be a valid email address.",
  }),

  clinic_id: Joi.string().messages({
    "string.empty": "Clinic ID cannot be empty.",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required.",
  });

export { updateCadreSchema };
