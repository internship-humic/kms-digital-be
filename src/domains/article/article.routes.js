
import ArticleController from "./article.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { articleSchema } from "./article.schema.js";

class ArticleRoutes extends BaseRoutes {
  constructor() {
    super("/article", ArticleController);
    // this.router = Router();
    // this.auth = AuthMiddleware;
    // this.validate = Validate;
    // this.errCatch = ErrorMiddleware.errorCatcher;
    // this.controller = controller;
    // this.roles = Roles;
    // this.routes();
  }

  routes() {
    this.register({
      method: "get",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Get Article by ID",
      handler: this.controller.someMethod,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      schema: articleSchema,
      summary: "Create Article",
      handler: this.controller.someMethod,
    });
  }
}

export default new ArticleRoutes().router;
