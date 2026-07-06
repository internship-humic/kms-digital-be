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
import notificationDocs from "./modules/notification.docs.js";
const endpointDocs = {
  ...notificationDocs,
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
      tags: [tag],
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

    const parameters = [];

    if (docs.params) {
      parameters.push(
        ...Object.entries(docs.params).map(([name, example]) => ({
          name,
          in: "path",
          required: true,
          schema: {
            type: "string",
          },
          example,
        })),
      );
    }

    if (docs.query) {
      parameters.push(
        ...Object.entries(docs.query).map(([name, config]) => {
          const isObject = typeof config === "object" && config !== null;
          return {
            name,
            in: "query",
            required: isObject ? config.required || false : false,
            description: isObject ? config.description || "" : "",
            schema: {
              type: isObject ? config.type || "string" : "string",
            },
            example: isObject ? config.example : config,
          };
        }),
      );
    }

    if (parameters.length > 0) {
      operation.parameters = parameters;
    }

    paths[swaggerPath][method.toLowerCase()] = operation;
  }

  return {
    openapi: "3.0.3",

    info: {
      title: "Jagacilik API",
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
      { name: "notification" },
      { name: "article" },
      { name: "auth" },
      { name: "children" },
      { name: "parent" },
      { name: "clinic" },
      { name: "measurement" },
      { name: "region" },
      { name: "cadre" },
    ],

    paths,
  };
}

export default generateOpenAPI;
