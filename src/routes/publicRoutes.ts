import HomePage from "../pages/HomePage";
import { RouteType } from "./types";
import Accordion from "../components/Accordiontest";
import ViewInsight from "../pages/ViewInsight";
import HealthCheckUrl from "./HealthCheckUrl";

export const publicRoutes: Array<RouteType> = [
  { path: "/startup-india-maps/maps/accordion", component: Accordion },
  { path: "/startup-india-maps/maps/", component: HomePage },
  { path: "/startup-india-maps/maps/view-insight", component: ViewInsight },
  { path: "/startup-india-maps/maps/health", component: HealthCheckUrl },
];
