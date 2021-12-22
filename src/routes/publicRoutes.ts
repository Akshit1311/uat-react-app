import HomePage from "../pages/HomePage/HomePage";
import { RouteType } from "./types"
import Accordion from "../components/Accordiontest";
import ViewInsight from "../pages/ViewInsight"

export const publicRoutes: Array<RouteType> = [
  { path: "/accordion", component: Accordion },
  { path: "/", component: HomePage },
  { path: "/view-insight", component: ViewInsight },
];
