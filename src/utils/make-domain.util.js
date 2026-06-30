import { program } from "commander";
import fs from "fs-extra";
import path from "path";
import capitalize from "capitalize";
import logger from "./logger.util.js";

const ROOT = process.cwd();

program
  .command("make:domain <name>")
  .description(
    "Generate a new domain folder with controller, service, routes, and schema",
  )
  .action((name) => {
    const domainParts = name.split("/");
    const domainPath = path.join(ROOT, "src", "domains", ...domainParts);

    if (fs.existsSync(domainPath)) {
      logger.error(`Domain ${name} already exists!`);
      process.exit(1);
    }

    fs.ensureDirSync(domainPath);

    const domainName = domainParts.at(-1);

    const className = (value) => {
      return value
        .split(/[-_ ]+/)
        .map((s) => capitalize(s))
        .join("");
    };

    const schemaName = (value) => {
      return value.split(/[-_ ]+/).join("");
    };

    const controllerTemplate = `
import ${className(domainName)}Service from "./${domainName}.service.js";
import BaseController from "../../common/base_classes/base-controller.js";

class ${className(domainName)}Controller extends BaseController {
  constructor() {
    super(${className(domainName)}Service);
    // this.error = BaseError
    // this.response = BaseResponse
    // this.service = ${className(domainName)}Service
  }

  async someMethod(req, res) {
    // implement method logic here
  }
}

export default new ${className(domainName)}Controller();
`;

    const serviceTemplate = `
import BaseService from "../../common/base_classes/base-service.js";

class ${className(domainName)}Service extends BaseService {
  constructor() {
    super();
    // this.error = BaseError
    // this.db = Prisma
  }

  async someMethod() {
    // implement method logic here
  }
}

export default new ${className(domainName)}Service();
`;

    const routesTemplate = `
import ${className(domainName)}Controller from "./${domainName}.controller.js";
import BaseRoutes from "../../common/base_classes/base-routes.js";
import { ${schemaName(domainName)}Schema } from "./${domainName}.schema.js";

class ${className(domainName)}Routes extends BaseRoutes {
  constructor() {
    super(\`/\${domainName}\`, ${className(domainName)}Controller);
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
      path: "/:id",
      auth: true,
      roles: [this.roles.Admin],
      summary: "Get ${className(domainName)} by ID",
      handler: this.controller.someMethod,
    });

    this.register({
      method: "post",
      path: "/",
      auth: true,
      roles: [this.roles.Admin],
      schema: ${schemaName(domainName)}Schema,
      summary: "Create ${className(domainName)}",
      handler: this.controller.someMethod,
    });
  }
}

export default new ${className(domainName)}Routes().router;
`;

    const schemaTemplate = `
import Joi from "joi";

const ${schemaName(domainName)}Schema = Joi.object({
  // Define your validation schema here
});

export { ${schemaName(domainName)}Schema };
`;

    fs.writeFileSync(
      path.join(domainPath, `${domainName}.controller.js`),
      controllerTemplate,
    );

    fs.writeFileSync(
      path.join(domainPath, `${domainName}.service.js`),
      serviceTemplate,
    );

    fs.writeFileSync(
      path.join(domainPath, `${domainName}.routes.js`),
      routesTemplate,
    );

    fs.writeFileSync(
      path.join(domainPath, `${domainName}.schema.js`),
      schemaTemplate,
    );

    const routesFile = path.join(ROOT, "src", "routes.js");

    if (fs.existsSync(routesFile)) {
      let routesContent = fs.readFileSync(routesFile, "utf8");

      const importPath = `./domains/${domainParts.join("/")}/${domainName}.routes.js`;

      const importLine = `import ${domainName}Routes from "${importPath}";`;

      const routeLine = `  { path: "/${domainName}", route: ${domainName}Routes },`;

      if (!routesContent.includes(importLine)) {
        const exportIndex = routesContent.indexOf("const routes =");

        if (exportIndex !== -1) {
          routesContent =
            routesContent.slice(0, exportIndex) +
            `${importLine}\n` +
            routesContent.slice(exportIndex);
        }
      }

      if (!routesContent.includes(`route: ${domainName}Routes`)) {
        routesContent = routesContent.replace(
          /const routes = \[/,
          `const routes = [\n${routeLine}`,
        );
      }

      fs.writeFileSync(routesFile, routesContent);
    }

    logger.info(`Domain '${name}' created successfully!`);
  });

program.parse(process.argv);
