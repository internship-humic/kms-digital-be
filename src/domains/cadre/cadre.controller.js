
import CadreService from "./cadre.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class CadreController extends BaseController {
  constructor() {
    super(CadreService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = CadreService
  }

  async someMethod(req, res) {
    // implement method logic here
  }
}

export default new CadreController();
