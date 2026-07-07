import BaseError from "../common/base_classes/base-error.js";
import logger from "../utils/logger.util.js";

const validate = (schema) => (req, res, next) => {
  const validated = schema.validate(req.body, {
    abortEarly: false,
    convert: true,
    errors: {
      wrap: {
        label: "",
      },
    },
  });

  if (validated.error) {
    const details = {};

    validated.error.details.forEach((detail) => {
      const field = detail.path.join(".");

      if (!details[field]) {
        details[field] = [];
      }

      details[field].push(detail.message);
    });

    logger.warn("Request validation failed", details);

    return next(BaseError.unprocessable("Validation failed", details));
  }

  next();
};

export default validate;
