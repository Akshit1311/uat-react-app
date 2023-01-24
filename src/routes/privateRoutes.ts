import ProfilePage from "../pages/ProfilePage/Profile";
import { RouteType } from "./types";

export const privateRoutes: Array<RouteType> = [
  {
    path: `/profile`,
    component: ProfilePage,
  },
];
