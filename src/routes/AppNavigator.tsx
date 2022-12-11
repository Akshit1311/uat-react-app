import { map } from "lodash";
import { Route, Switch, useHistory } from "react-router-dom";
import { privateRoutes } from "./privateRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import { publicRoutes } from "./publicRoutes";
import { RouteType } from "./types";

interface AppNavigatorTypes {}

export default function AppNavigator(props: AppNavigatorTypes) {
  const history = useHistory();
  return (
    <>
      {/* {history.location.pathname === "/health" ? undefined : (
        <HeaderComponent></HeaderComponent>
      )} */}
      <Switch>
        {map(publicRoutes, (publicRoute: RouteType, index: number) => (
          <Route exact {...publicRoute} key={index} />
        ))}
        {map(privateRoutes, (privateRoute: RouteType, index: number) => (
          <ProtectedRoute exact {...privateRoute} key={index} />
        ))}
      </Switch>
    </>
  );
}
