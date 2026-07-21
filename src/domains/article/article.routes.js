import BaseRoutes from "../../common/base_classes/base-routes.js";
import upload from "../../utils/image.util.js";

import ArticleController from "./article.controller.js";
import { createArticleSchema, updateArticleSchema } from "./article.schema.js";

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
      path: "/",
      summary: "Get All Articles",
      handler: this.controller.getAllArticles,
    });

    this.register({
      method: "get",
      path: "/:id",
      summary: "Get Article By Id",
      handler: this.controller.getArticleById,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      middlewares: [
        upload.fields([
          {
            name: "cover_image",
            maxCount: 1,
          },
        ]),
      ],
      schema: createArticleSchema,
      summary: "Create Article",
      handler: this.controller.createArticle,
    });

    this.register({
      method: "patch",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      middlewares: [
        upload.fields([
          {
            name: "cover_image",
            maxCount: 1,
          },
        ]),
      ],
      schema: updateArticleSchema,
      summary: "Update Article",
      handler: this.controller.updateArticle,
    });

    this.register({
      method: "delete",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Delete Article",
      handler: this.controller.deleteArticle,
    });

    this.register({
      method: "post",
      path: "/upload-image",
      auth: true,
      roles: [this.roles.Admin],
      middlewares: [upload.single("image")],
      summary: "Upload Article Content Image",
      handler: this.controller.uploadContentImage,
    });
  }
}

export default new ArticleRoutes().router;
