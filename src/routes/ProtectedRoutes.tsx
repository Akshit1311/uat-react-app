import { Route } from "react-router-dom";
import { RouteType } from "./types";

export default function ProtectedRoute(props: RouteType) {
  return <Route exact {...props} />;
}
