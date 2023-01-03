import React from "react";
import { Redirect, Route } from "react-router";
import { Container, Loader } from "rsuite";
import { useProfile } from "../context/profile.context";

const PublicRoute = ({ children, ...restRoutes }) => {
  const { profile, isLoading } = useProfile();

  if (!profile && isLoading) {
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
  if (profile && !isLoading) {
    return <Redirect to="/" />;
  }

  return <Route {...restRoutes}>{children}</Route>;
};

export default PublicRoute;
