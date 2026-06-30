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
    summary = "",
  }) {
    const middlewares = [];

    if (auth) {
      middlewares.push(this.auth.authenticate);
    }

    if (roles.length) {
      middlewares.push(this.auth.role(roles));
    }

    if (schema) {
      middlewares.push(this.validate(schema));
    }

    middlewares.push(this.errCatch(handler.bind(this.controller)));

    this.router[method](path, middlewares);

    ApiRegistry.register({
      method,
      path: this.basePath + path,
      summary,
      schema,
      tag: this.basePath.replace("/", ""),
    });
  }

  routes() {
    throw new Error("Routes method must be implemented.");
  }
}

export default BaseRoutes;
