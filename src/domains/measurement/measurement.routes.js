
import MeasurementController from "./measurement.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { measurementSchema } from "./measurement.schema.js";

class MeasurementRoutes extends BaseRoutes {
  constructor() {
    super(MeasurementController);
    // this.router = Router();
    // this.auth = AuthMiddleware;
    // this.validate = Validate;
    // this.errCatch = ErrorMiddleware.errorCatcher;
    // this.controller = controller;
    // this.roles = Roles;
    // this.routes();
  }

  routes() {
    this.router.get("/", [
      this.auth.authenticate,
      this.errCatch(this.controller.getMeasurements.bind(this.controller)),
    ]);

    this.router.get("/graph/:childrenId", [
      this.auth.authenticate,
      this.errCatch(this.controller.getMeasurementGraph.bind(this.controller)),
    ]);

    this.router.get("/:id", [
      this.auth.authenticate,
      this.errCatch(this.controller.getMeasurementById.bind(this.controller)),
    ]);

    this.router.post("/", [
      this.auth.authenticate,
      this.auth.role([this.roles.Cadre, this.roles.Admin]),
      this.validate(measurementSchema),
      this.errCatch(this.controller.createMeasurement.bind(this.controller)),
    ]);

    this.router.put("/:id", [
      this.auth.authenticate,
      this.auth.role([this.roles.Cadre, this.roles.Admin]),
      this.validate(measurementSchema),
      this.errCatch(this.controller.updateMeasurement.bind(this.controller)),
    ]);

    this.router.delete("/:id", [
      this.auth.authenticate,
      this.auth.role([this.roles.Cadre, this.roles.Admin]),
      this.errCatch(this.controller.deleteMeasurement.bind(this.controller)),
    ]);
  }
}

export default new MeasurementRoutes().router;
