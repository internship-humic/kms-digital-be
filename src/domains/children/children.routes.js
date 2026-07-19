import ChildrenController from "./children.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { childrenSchema, interventionSchema } from "./children.schema.js";

class ChildrenRoutes extends BaseRoutes {
  constructor() {
    super("/children", ChildrenController);
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
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Get All Children",
      handler: this.controller.getAllChildrens,
    });

    this.register({
      method: "get",
      path: "/risky",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Get All Risky Children",
      handler: this.controller.getAllRiskyChildren,
    });

    this.register({
      method: "get",
      path: "/:parentId",
      auth: true,
      summary: "Get Children by Parent ID",
      handler: this.controller.getChildrensByParent,
    });

    this.register({
      method: "get",
      path: "/:id/intervention",
      auth: true,
      summary: "Get Intervention by Children ID",
      handler: this.controller.getInterventionByChildrenId,
    });

    this.register({
      method: "get",
      path: "/:id/export",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin, this.roles.Parents],
      summary: "Export child growth report to PDF",
      handler: this.controller.exportChildPdf,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      schema: childrenSchema,
      summary: "Create Child",
      handler: this.controller.createChildren,
    });

    this.register({
      method: "put",
      path: "/:id",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      schema: childrenSchema,
      summary: "Update Child by ID",
      handler: this.controller.updateChildren,
    });

    this.register({
      method: "patch",
      path: "/:id/intervention",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      schema: interventionSchema,
      summary: "Update Intervention",
      handler: this.controller.updateIntervention,
    });

    this.register({
      method: "delete",
      path: "/:id",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Delete Child by ID",
      handler: this.controller.deleteChildren,
    });

    this.register({
      method: "get",
      path: "/clinic/:clinicId",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Get All Children by Clinic",
      handler: this.controller.getAllChildrenByClinic,
    });

    this.register({
      method: "get",
      path: "/clinic/:clinicId/risky",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Get All Risky Children by Clinic",
      handler: this.controller.getAllRiskyChildrenByClinic,
    });

    this.register({
      method: "get",
      path: "/clinic/:clinicId/export",
      auth: true,
      roles: [this.roles.Cadre, this.roles.Admin],
      summary: "Export all children in clinic to PDF",
      handler: this.controller.exportClinicPdf,
    });
  }
}

export default new ChildrenRoutes().router;
