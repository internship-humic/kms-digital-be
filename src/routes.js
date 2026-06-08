import authRoutes from "./domains/auth/auth.routes.js";
import regionRoutes from "./domains/region/region.routes.js";
import clinicRoutes from "./domains/clinic/clinic.routes.js";

const routes = [
  { path: "/auth", route: authRoutes },
  { path: "/region", route: regionRoutes },
  { path: "/clinic", route: clinicRoutes },
];

export default routes;
