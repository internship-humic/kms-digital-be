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

    const result = await this.service.login(info);

    return res.success(result, "Login successful");
  }

  async register(req, res) {
    const info = req.body;

    const result = await this.service.register(info);

    return res.created(result, "Register successful");
  }

  async activateCadre(req, res) {
    const info = req.body;

    const result = await this.service.activateCadre(info);

    return res.created(result, "Cadre activated successfully");
  }

  async getMe(req, res) {
    const user = req.user;

    const result = await this.service.getMe(user);

    return res.success(result, "Profile retrieved successfully");
  }

  async updateProfile(req, res) {
    const info = req.body;
    const user = req.user;

    const result = await this.service.updateProfile(info, user);

    return res.success(result, "Profile updated successfully");
  }

  async changePassword(req, res) {
    const info = req.body;
    const user = req.user;

    const result = await this.service.changePassword(info, user);

    return res.success(result, "Password changed successfully");
  }

  async requestPasswordReset(req, res) {
    const info = req.body;

    const result = await this.service.requestPasswordReset(info);

    return res.success(result, "Password reset email sent successfully");
  }

  async resetPassword(req, res) {
    const info = req.body;

    const result = await this.service.resetPassword(info);

    return res.success(result, "Password reset successfully");
  }
}

export default new AuthController();
