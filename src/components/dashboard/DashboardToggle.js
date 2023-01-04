import React from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import { auth } from "../../misc/firebase";

const DashboardToggle = () => {
  const { isOpen, onClose, onOpen } = useModalState();
  const isMobile = useMediaQuery("(max-width:872px)");

  const onSignOut = () => {
    auth.signOut();
    onClose();
    Alert.info("Signed Out");
  };
  return (
    <>
      <Button block appearance="primary" color="orange" onClick={onOpen}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} onHide={onClose} show={isOpen} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
