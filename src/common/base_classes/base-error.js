import StatusCodes from "../enums/status-codes.enum.js";

class BaseError extends Error {
  constructor({ statusCode, code, message, details = null }) {
    super(message);

    this.name = "BaseError";
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this, this.constructor);
  }

  static badRequest(message = StatusCodes.BAD_REQUEST.message, details = null) {
    return new BaseError({
      statusCode: StatusCodes.BAD_REQUEST.code,
      code: StatusCodes.BAD_REQUEST.codeName,
      message,
      details,
    });
  }

  static unauthorized(
    message = StatusCodes.UNAUTHORIZED.message,
    details = null,
  ) {
    return new BaseError({
      statusCode: StatusCodes.UNAUTHORIZED.code,
      code: StatusCodes.UNAUTHORIZED.codeName,
      message,
      details,
    });
  }

  static forbidden(message = StatusCodes.FORBIDDEN.message, details = null) {
    return new BaseError({
      statusCode: StatusCodes.FORBIDDEN.code,
      code: StatusCodes.FORBIDDEN.codeName,
      message,
      details,
    });
  }

  static notFound(message = StatusCodes.NOT_FOUND.message, details = null) {
    return new BaseError({
      statusCode: StatusCodes.NOT_FOUND.code,
      code: StatusCodes.NOT_FOUND.codeName,
      message,
      details,
    });
  }

  static unprocessable(
    message = StatusCodes.UNPROCESSABLE_ENTITY.message,
    details = null,
  ) {
    return new BaseError({
      statusCode: StatusCodes.UNPROCESSABLE_ENTITY.code,
      code: StatusCodes.UNPROCESSABLE_ENTITY.codeName,
      message,
      details,
    });
  }

  static internal(
    message = StatusCodes.INTERNAL_SERVER_ERROR.message,
    details = null,
  ) {
    return new BaseError({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR.code,
      code: StatusCodes.INTERNAL_SERVER_ERROR.codeName,
      message,
      details,
    });
  }
}

export default BaseError;
