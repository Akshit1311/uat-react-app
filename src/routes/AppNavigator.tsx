import React from 'react';
import { Switch, Route } from "react-router-dom"
import { map } from "lodash"
import ProtectedRoute from "./ProtectedRoutes"
import { publicRoutes } from "./publicRoutes"
import { privateRoutes } from "./privateRoutes"
import { RouteType } from "./types"
import HeaderComponent from '../components/HeaderComponent';
// import ComponentA from '../demo/AComponent';

export default function AppNavigator() {
    return (
        <>
            {/* <ComponentA /> */}
            <HeaderComponent></HeaderComponent>
            <Switch>
                {
                    map(publicRoutes, (publicRoute: RouteType) => (
                        <Route exact {...publicRoute} />
                    ))
                }
                {
                    map(privateRoutes, (privateRoute: RouteType) => (
                        <ProtectedRoute exact {...privateRoute} />
                    ))
                }
            </Switch>
        </>
    )
}