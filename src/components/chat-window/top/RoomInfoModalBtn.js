import React, { memo } from "react";
import { Button, Modal } from "rsuite";
import { useCurrentRooms } from "../../../context/currentRoom.context";
import { useModalState } from "../../../misc/custom-hooks";

const RoomInfoModalBtn = () => {
  const description = useCurrentRooms((v) => v.description);
  const name = useCurrentRooms((v) => v.name);
  const { isOpen, onClose, onOpen } = useModalState();

  return (
    <div>
      <Button appearance="link" className="px-0" onClick={onOpen}>
        Room information{" "}
      </Button>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>About {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <span>
            <h4>Description</h4>
          </span>
          <p>{description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="default" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default memo(RoomInfoModalBtn);
