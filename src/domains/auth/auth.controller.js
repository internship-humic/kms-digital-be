import AuthService from "./auth.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class AuthController extends BaseController {
  constructor() {
    super(AuthService);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = AuthService
  }

  async login(req, res) {
    const info = req.body;

    const data = await this.service.login(info);

    return this.response.success(res, data, "Login successful");
  }

  async register(req, res) {
    const info = req.body;

    const data = await this.service.register(info);

    return this.response.created(res, data, "Register successful");
  }

  async activateCadre(req, res) {
    const info = req.body;

    const data = await this.service.activateCadre(info);

    return this.response.created(res, data, "Cadre activated successfully");
  }

  async getMe(req, res) {
    const user = req.user;

    const data = await this.service.getMe(user);

    return this.response.success(res, data, "Profile retrieved successfully");
  }

  async updateProfile(req, res) {
    const info = req.body;
    const user = req.user;

    const data = await this.service.updateProfile(user, info);

    return this.response.success(res, data, "Profile updated successfully");
  }

  async changePassword(req, res) {
    const info = req.body;
    const user = req.user;

    const data = await this.service.changePassword(user, info);

    return this.response.success(res, data, "Password changed successfully");
  }

  async requestPasswordReset(req, res) {
    const info = req.body;

    const data = await this.service.requestPasswordReset(info);

    return this.response.success(
      res,
      data,
      "Password reset email sent successfully",
    );
  }

  async resetPassword(req, res) {
    const info = req.body;

    const data = await this.service.resetPassword(info);

    return this.response.success(res, data, "Password reset successfully");
  }
}

export default new AuthController();
