import { Router } from "express";
import AuthMiddleware from "../../middlewares/auth.middleware.js";
import Validate from "../../middlewares/request-validator.middleware.js";
import ErrorMiddleware from "../../middlewares/error.middleware.js";
import Roles from "../enums/user-roles.enum.js";
import ApiRegistry from "../docs/api-registry.js";

class BaseRoutes {
  constructor(basePath, controller) {
    this.router = Router();

    this.basePath = basePath;

    this.auth = AuthMiddleware;
    this.validate = Validate;
    this.errCatch = ErrorMiddleware.errorCatcher;
    this.controller = controller;
    this.roles = Roles;

    this.routes();
  }

  register({
    method,
    path,
    handler,
    schema = null,
    auth = false,
    roles = [],
    middlewares = [],
    summary = "",
  }) {
    const handlers = [];

    if (auth) {
      handlers.push(this.auth.authenticate);
    }

    if (roles.length) {
      handlers.push(this.auth.role(roles));
    }

    handlers.push(...middlewares);

    if (schema) {
      handlers.push(this.validate(schema));
    }

    handlers.push(this.errCatch(handler.bind(this.controller)));

    this.router[method](path, handlers);

    ApiRegistry.register({
      method,
      path: this.basePath + path,
      summary,
      schema,
      tag: this.basePath.replace("/", ""),
      auth,
      roles,
    });
  }

  routes() {
    throw new Error("Routes method must be implemented.");
  }
}

export default BaseRoutes;
