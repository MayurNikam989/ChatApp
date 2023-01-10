import React from "react";
import { Redirect, Route } from "react-router";
import { useProfile } from "../context/profile.context";
import { Container, Loader } from "rsuite";

const PrivateRoute = ({ children, ...restRoutes }) => {
  const { profiles, isLoading } = useProfile();
  if (!profiles && isLoading) {
    return (
      <Container>
        <Loader
          size="sm"
          vertical={true}
          center={true}
          speed="slow"
          content="Loading..."
        />
      </Container>
    );
  }
  if (!profiles && !isLoading) {
    return <Redirect to="/signin/" />;
  }

  return <Route {...restRoutes}>{children}</Route>;
};

export default PrivateRoute;
