import HomePage from "../pages/HomePage";
import { RouteType } from "./types"
import Accordion from "../components/Accordiontest";
import ViewInsight from "../pages/ViewInsight"
import HealthCheckUrl from "./HealthCheckUrl";


export const publicRoutes: Array<RouteType> = [
  { path: "/accordion", component: Accordion },
  { path: "/", component: HomePage },
  { path: "/view-insight", component: ViewInsight },
  { path: "/health-check", component: HealthCheckUrl },
];
