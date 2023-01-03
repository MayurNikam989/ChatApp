import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute = ({ children, ...restRoutes }) => {
  const profile = false;
  if (!profile) {
    return <Redirect to="/signin" />;
  }

  return <Route {...restRoutes}>{children}</Route>;
};

export default PrivateRoute;
