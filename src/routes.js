import authRoutes from "./domains/auth/auth.routes.js";
import regionRoutes from "./domains/region/region.routes.js";
import clinicRoutes from "./domains/clinic/clinic.routes.js";
import childrenRoutes from "./domains/children/children.routes.js";
import parentRoutes from "./domains/parent/parent.routes.js";
const routes = [
  { path: "/parent", route: parentRoutes },
  { path: "/children", route: childrenRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/region", route: regionRoutes },
  { path: "/clinic", route: clinicRoutes },
];

export default routes;
