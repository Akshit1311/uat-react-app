import HomePage from "../pages/HomePage";
import { RouteType } from "./types";
import Accordion from "../components/Accordiontest";
import ViewInsight from "../pages/ViewInsight";
import HealthCheckUrl from "./HealthCheckUrl";

export const publicRoutes: Array<RouteType> = [
  {
    path: `/maps/accordion`,
    component: Accordion,
  },
  { path: `/maps/`, component: HomePage },
  {
    path: `/maps/view-insight`,
    component: ViewInsight,
  },
  {
    path: `/maps/health`,
    component: HealthCheckUrl,
  },
];
