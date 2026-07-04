import ClinicController from "./clinic.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { createClinicSchema, updateClinicSchema } from "./clinic.schema.js";

class ClinicRoutes extends BaseRoutes {
  constructor() {
    super("/clinic", ClinicController);
    //this.router = Router();
    //this.auth = AuthMiddleware;
    //this.validate = Validate;
    //this.errCatch = ErrorMiddleware.errorCatcher;
    //this.controller = controller;
    //this.roles = Roles;
    //this.routes();
  }

  routes() {
    this.register({
      method: "get",
      path: "/village/:villageId",
      summary: "Get Clinics by Village ID",
      handler: this.controller.getClinicsByVillage,
    });

    this.register({
      method: "get",
      path: "/",
      auth: true,
      summary: "Get All Clinics",
      handler: this.controller.getAllClinics,
    });

    this.register({
      method: "get",
      path: "/:id",
      auth: true,
      summary: "Get Clinic By Id",
      handler: this.controller.getClinicById,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      schema: createClinicSchema,
      summary: "Create Clinic",
      handler: this.controller.createClinic,
    });

    this.register({
      method: "patch",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      schema: updateClinicSchema,
      summary: "Update Clinic",
      handler: this.controller.updateClinic,
    });

    this.register({
      method: "delete",
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Delete Clinic",
      handler: this.controller.deleteClinic,
    });
  }
}

export default new ClinicRoutes().router;
