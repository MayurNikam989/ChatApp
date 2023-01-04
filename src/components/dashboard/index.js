import React from "react";
import { Button, Drawer, Icon } from "rsuite";
import { useProfile } from "../../context/profile.context";

const Dashboard = ({ onSignOut }) => {
  const { profiles } = useProfile();
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>hey,{profiles.name}</h3>
      </Drawer.Body>

      <Drawer.Footer>
        <Button appearance="ghost" color="red" onClick={onSignOut}>
          <Icon icon="sign-out" /> Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
