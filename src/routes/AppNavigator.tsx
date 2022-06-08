import { map } from "lodash";
import React from "react";
import { Route, Switch } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent";
import { privateRoutes } from "./privateRoutes";
import ProtectedRoute from "./ProtectedRoutes";
import { publicRoutes } from "./publicRoutes";
import { RouteType } from "./types";

interface AppNavigatorTypes {}

export default function AppNavigator(props: AppNavigatorTypes) {
  return (
    <>
      <HeaderComponent></HeaderComponent>
      <Switch>
        {map(publicRoutes, (publicRoute: RouteType, index:number) => (
          <Route exact {...publicRoute} key={index} />
        ))}
        {map(privateRoutes, (privateRoute: RouteType, index: number) => (
          <ProtectedRoute exact {...privateRoute} key={index} />
        ))}
      </Switch>
    </>
  );
}
