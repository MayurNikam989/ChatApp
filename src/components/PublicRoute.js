import React from "react";
import { Redirect, Route } from "react-router";

const PublicRoute = ({ children, ...restRoutes }) => {
  const profile = false;
  if (profile) {
    return <Redirect to="/" />;
  }

  return <Route {...restRoutes}>{children}</Route>;
};

export default PublicRoute;
