import Joi from "joi";

const createClinicSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": "Clinic name is required.",
  }),

  address: Joi.string().required().messages({
    "string.empty": "Clinic address is required.",
  }),

  village_id: Joi.string().required().messages({
    "string.empty": "Village ID is required.",
  }),
});

const updateClinicSchema = Joi.object({
  name: Joi.string(),

  address: Joi.string(),

  village_id: Joi.string(),
})
  .min(1)
  .messages({
    "object.min": "At least one field is required.",
  });

export { createClinicSchema, updateClinicSchema };
