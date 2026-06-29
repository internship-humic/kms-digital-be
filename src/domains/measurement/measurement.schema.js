
import Joi from "joi";

const measurementSchema = Joi.object({
  children_id: Joi.string()
    .guid({
      version: ["uuidv4", "uuidv5"],
    })
    .required(),

  measurement_date: Joi.date()
    .required(),

  body_weight: Joi.number()
    .positive()
    .max(100)
    .required(),

  body_height: Joi.number()
    .positive()
    .max(200)
    .required(),

  head_circumference: Joi.number()
    .positive()
    .max(100)
    .allow(null),
});

export { measurementSchema };
