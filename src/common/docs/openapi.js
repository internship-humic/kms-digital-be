import j2s from "joi-to-swagger";
import ApiRegistry from "./api-registry.js";

import authDocs from "./modules/auth.docs.js";
import childrenDocs from "./modules/children.docs.js";
import clinicDocs from "./modules/clinic.docs.js";
import measurementDocs from "./modules/measurement.docs.js";
import parentDocs from "./modules/parent.docs.js";
import regionDocs from "./modules/region.docs.js";
import cadreDocs from "./modules/cadre.docs.js";
import articleDocs from "./modules/article.docs.js";

const endpointDocs = {
  ...articleDocs,
  ...authDocs,
  ...childrenDocs,
  ...clinicDocs,
  ...measurementDocs,
  ...parentDocs,
  ...regionDocs,
  ...cadreDocs,
};

function generateOpenAPI() {
  const paths = {};

  const routes = ApiRegistry.getRoutes();

  for (const route of routes) {
    const { method, path, summary, schema, tag, auth } = route;

    const swaggerPath = path.replace(/:([a-zA-Z0-9_]+)/g, "{$1}");

    if (!paths[swaggerPath]) {
      paths[swaggerPath] = {};
    }

    const key = `${method.toUpperCase()} ${path}`;

    const docs = endpointDocs[key] || {};

    const operation = {
      tags: [{ name: "article" }, tag],
      summary: docs.summary || summary,
      description: docs.description || "",
      responses: {},
    };

    if (auth) {
      operation.security = [
        {
          bearerAuth: [],
        },
      ];
    }

    if (schema && ["post", "put", "patch"].includes(method.toLowerCase())) {
      const { swagger } = j2s(schema);

      operation.requestBody = {
        required: true,
        content: {
          "application/json": {
            schema: swagger,
            example: docs.request,
          },
        },
      };
    }

    operation.responses["200"] = {
      description: "Success",
      content: {
        "application/json": {
          example: docs.response,
        },
      },
    };

    paths[swaggerPath][method.toLowerCase()] = operation;
  }

  return {
    openapi: "3.0.3",

    info: {
      title: "Posyandu API",
      version: "1.0.0",
      description: "REST API Documentation",
    },

    servers: [
      {
        url: "http://localhost:3000/api",
      },
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },

    tags: [
      { name: "auth" },
      { name: "children" },
      { name: "parent" },
      { name: "clinic" },
      { name: "measurement" },
      { name: "region" },
    ],

    paths,
  };
}

export default generateOpenAPI;
