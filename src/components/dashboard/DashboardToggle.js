import React, { useCallback } from "react";
import { Alert, Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";
import { auth, database } from "../../misc/firebase";
import { isOfflineForDatabase } from "../../context/profile.context";
const DashboardToggle = () => {
  const { isOpen, onClose, onOpen } = useModalState();
  const isMobile = useMediaQuery("(max-width:992px)");

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        onClose();
        Alert.info("Signed Out");
      })
      .catch((error) => {
        Alert.error(error.message, 4000);
      });
  }, [onClose]);
  return (
    <>
      <Button block appearance="primary" color="cyan" onClick={onOpen}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} onHide={onClose} show={isOpen} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
