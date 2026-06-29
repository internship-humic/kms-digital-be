import Joi from "joi";

const childrenSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),

  birth_date: Joi.date().required(),

  parent_id: Joi.string().uuid().required(),

  gender: Joi.string().valid("LAKI_LAKI", "PEREMPUAN").required(),

  address: Joi.string().min(5).max(255).required(),

  status: Joi.string().valid("ACTIVE", "INACTIVE").optional(),

  body_weight: Joi.number().min(0.5).max(30).required(),

  body_height: Joi.number().min(20).max(130).required(),

  head_circumference: Joi.number().min(20).max(60).optional().allow(null),
});

export { childrenSchema };
