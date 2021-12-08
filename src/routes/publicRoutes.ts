import HomePage from "../pages/HomePage/HomePage";
import { RouteType } from "./types"
import Accordion from "../components/Accordiontest";

export const publicRoutes: Array<RouteType> = [
  { path: "/accordion", component: Accordion },
  { path: "/", component: HomePage },
];
