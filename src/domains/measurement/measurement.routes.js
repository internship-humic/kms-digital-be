
import MeasurementController from "./measurement.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { measurementSchema } from "./measurement.schema.js";

class MeasurementRoutes extends BaseRoutes {
  constructor() {
    super("/measurement", MeasurementController);
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
      auth: true,
      summary: "Get Measurements",
      handler: this.controller.getMeasurements,
    });

    this.register({
      method: "get",
      path: "/graph/:childrenId",
      auth: true,
      summary: "Get Measurement Graph for Child",
      handler: this.controller.getMeasurementGraph,
    });

    this.register({
      method: "get",
      path: "/:id",
      auth: true,
      summary: "Get Measurement by ID",
      handler: this.controller.getMeasurementById,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      schema: measurementSchema,
      summary: "Create Measurement",
      handler: this.controller.createMeasurement,
    });

    this.register({
      method: "put",
      path: "/:id",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      schema: measurementSchema,
      summary: "Update Measurement by ID",
      handler: this.controller.updateMeasurement,
    });

    this.register({
      method: "delete",
      path: "/:id",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Delete Measurement by ID",
      handler: this.controller.deleteMeasurement,
    });
  }
}

export default new MeasurementRoutes().router;
