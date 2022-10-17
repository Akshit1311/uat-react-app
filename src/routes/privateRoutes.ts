import ProfilePage from "../pages/ProfilePage/Profile";
import { RouteType } from "./types";

export const privateRoutes: Array<RouteType> = [
  {
    path: `${process.env.REACT_APP_BASE_URL}/profile`,
    component: ProfilePage,
  },
];
