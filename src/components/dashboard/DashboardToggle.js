import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import { auth } from "../../misc/firebase";

const DashboardToggle = () => {
  const { isOpen, onClose, onOpen } = useModalState();
  const isMobile = useMediaQuery("(max-width:872px)");

  const onSignOut = useCallback(() => {
    auth.signOut();
    onClose();
    Alert.info("Signed Out");
  }, [onClose]);
  return (
    <>
      <Button block appearance="primary" color="yellow" onClick={onOpen}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} onHide={onClose} show={isOpen} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
