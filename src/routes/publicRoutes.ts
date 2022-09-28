import HomePage from "../pages/HomePage";
import { RouteType } from "./types";
import Accordion from "../components/Accordiontest";
import ViewInsight from "../pages/ViewInsight";
import HealthCheckUrl from "./HealthCheckUrl";

const baseRoute = process.env.REACT_APP_BASE_URL || "";

export const publicRoutes: Array<RouteType> = [
  {
    path: `${baseRoute}/maps/accordion`,
    component: Accordion,
  },
  { path: `${baseRoute}/maps/`, component: HomePage },
  {
    path: `${baseRoute}/maps/view-insight`,
    component: ViewInsight,
  },
  {
    path: `${baseRoute}/maps/health`,
    component: HealthCheckUrl,
  },
];
