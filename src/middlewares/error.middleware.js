import crypto from "crypto";
import StatusCodes from "../common/enums/status-codes.enum.js";
import BaseError from "../common/base_classes/base-error.js";
import logger from "../utils/logger.util.js";

class ErrorMiddleware {
  getErrorLocation(stack) {
    if (!stack) return null;

    const lines = stack.split("\n");

    return lines.length > 1 ? lines[1].trim() : null;
  }

  errorHandler = (err, req, res, next) => {
    const requestId =
      req.id || req.headers["x-request-id"] || crypto.randomUUID();

    const timestamp = new Date().toISOString();
    const location = this.getErrorLocation(err.stack);

    logger.error({
      requestId,
      method: req.method,
      url: req.originalUrl,
      location,
      code:
        err instanceof BaseError
          ? err.code
          : StatusCodes.INTERNAL_SERVER_ERROR.codeName,
      message: err.message,
      details: err.details ?? null,
    });

    const errorResponse = {
      code:
        err instanceof BaseError
          ? err.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR.code,
      message:
        err instanceof BaseError
          ? err.message
          : process.env.NODE_ENV === "production"
            ? StatusCodes.INTERNAL_SERVER_ERROR.message
            : err.message,
      details: err.details ?? null,
      request_id: requestId,
      timestamp,
    };

    if (process.env.NODE_ENV !== "production") {
      errorResponse.location = location;
    }

    return res
      .status(
        err instanceof BaseError
          ? err.statusCode
          : StatusCodes.INTERNAL_SERVER_ERROR.code,
      )
      .json({
        error: errorResponse,
      });
  };

  errorCatcher = (controller) => async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (err) {
      err.controller = controller.name?.replace(/^bound\s*/, "");
      next(err);
    }
  };
}

export default new ErrorMiddleware();
