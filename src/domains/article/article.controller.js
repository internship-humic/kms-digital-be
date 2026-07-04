
import ArticleService from "./article.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class ArticleController extends BaseController {
  constructor() {
    super(ArticleService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = ArticleService
  }

  async someMethod(req, res) {
    // implement method logic here
  }
}

export default new ArticleController();
