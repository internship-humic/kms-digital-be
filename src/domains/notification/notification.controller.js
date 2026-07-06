
import NotificationService from "./notification.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class NotificationController extends BaseController {
  constructor() {
    super(NotificationService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = NotificationService
  }

  async someMethod(req, res) {
    // implement method logic here
  }
}

export default new NotificationController();
