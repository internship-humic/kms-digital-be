import ArticleService from "./article.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class ArticleController extends BaseController {
  constructor() {
    super(ArticleService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = ArticleService
  }

  async getAllArticles(req, res) {
    const query = req.query;

    const data = await this.service.getAllArticles(query);

    return this.response.success(
      res,
      data.data,
      "Articles retrieved successfully",
      data.pagination,
    );
  }

  async getArticleById(req, res) {
    const { id } = req.params;

    const data = await this.service.getArticleById(id);

    return this.response.success(res, data, "Article retrieved successfully");
  }

  async createArticle(req, res) {
    const info = req.body;
    const files = req.files;

    const data = await this.service.createArticle(info, files);

    return this.response.created(res, data, "Article created successfully");
  }

  async updateArticle(req, res) {
    const { id } = req.params;
    const info = req.body;
    const file = req.file;

    const data = await this.service.updateArticle(id, info, file);

    return this.response.success(res, data, "Article updated successfully");
  }

  async deleteArticle(req, res) {
    const { id } = req.params;

    const data = await this.service.deleteArticle(id);

    return this.response.success(res, data, "Article deleted successfully");
  }

  async uploadContentImage(req, res) {
    const file = req.file;

    const data = await this.service.uploadContentImage(file);

    return this.response.created(res, data, "Image uploaded successfully");
  }
}

export default new ArticleController();
