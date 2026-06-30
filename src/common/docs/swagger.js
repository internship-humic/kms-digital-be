import swaggerUi from "swagger-ui-express";
import generateOpenAPI from "./openapi.js";

function setupSwagger(app) {
  const openapi = generateOpenAPI();

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(openapi));
}

export default setupSwagger;
