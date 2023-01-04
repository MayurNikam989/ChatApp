import React from "react";
import { Button, Drawer, Icon } from "rsuite";
import Dashboard from ".";
import { useMediaQuery, useModalState } from "../../misc/custom-hooks";

const DashboardToggle = () => {
  const { isOpen, onClose, onOpen } = useModalState();
  const isMobile = useMediaQuery("(max-width:872px)");
  return (
    <>
      <Button block appearance="primary" color="orange" onClick={onOpen}>
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={isMobile} onHide={onClose} show={isOpen} placement="left">
        <Dashboard />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
