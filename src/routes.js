import authRoutes from "./domains/auth/auth.routes.js";
import regionRoutes from "./domains/region/region.routes.js";
import clinicRoutes from "./domains/clinic/clinic.routes.js";
import childrenRoutes from "./domains/children/children.routes.js";
import parentRoutes from "./domains/parent/parent.routes.js";
import measurementRoutes from "./domains/measurement/measurement.routes.js";
import cadreRoutes from "./domains/cadre/cadre.routes.js";
import articleRoutes from "./domains/article/article.routes.js";
import notificationRoutes from "./domains/notification/notification.routes.js";
import dashboardRoutes from "./domains/dashboard/dashboard.routes.js";
const routes = [
  { path: "/dashboard", route: dashboardRoutes },
  { path: "/notification", route: notificationRoutes },
  { path: "/article", route: articleRoutes },
  { path: "/cadre", route: cadreRoutes },
  { path: "/measurement", route: measurementRoutes },
  { path: "/parent", route: parentRoutes },
  { path: "/children", route: childrenRoutes },
  { path: "/auth", route: authRoutes },
  { path: "/region", route: regionRoutes },
  { path: "/clinic", route: clinicRoutes },
];

export default routes;
