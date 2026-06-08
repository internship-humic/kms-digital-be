import authRoutes from "./domains/auth/auth.routes.js";
import regionRoutes from "./domains/region/region.routes.js";

const routes = [
  { path: "/auth", route: authRoutes },
  { path: "/region", route: regionRoutes },
];

export default routes;
