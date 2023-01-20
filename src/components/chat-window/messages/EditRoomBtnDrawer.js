import React from "react";
import { useParams } from "react-router";
import { Alert, Button, Drawer } from "rsuite";
import { useCurrentRooms } from "../../../context/currentRoom.context";
import { useModalState } from "../../../misc/custom-hooks";
import { database } from "../../../misc/firebase";
import { useMediaQuery } from "../../../misc/custom-hooks";
import EditableInput from "../../EditableInput";

const EditRoomBtnDrawer = () => {
  const { isOpen, onClose, onOpen } = useModalState();
  const isMobile = useMediaQuery("(max-width:992px)");
  const { chatId } = useParams();
  const name = useCurrentRooms((v) => v.name);
  const description = useCurrentRooms((v) => v.description);

  const updateData = (key, value) => {
    database
      .ref(`/rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        Alert.success("Succesfully updated", 4000);
      })
      .catch((err) => {
        Alert.error(err.message, 4000);
      });
  };

  const onRoomUpdate = (newName) => {
    updateData("name", newName);
  };
  const onDescUpdate = (newDesc) => {
    updateData("description", newDesc);
  };

  return (
    <div>
      <Button className=".br-circle" size="sm" color="red" onClick={onOpen}>
        A
      </Button>
      <Drawer full={isMobile} show={isOpen} onHide={onClose} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>

        <Drawer.Body>
          <EditableInput
            placeholder="Enter Room Name..."
            label={<h6 className="mb-3">Room Name</h6>}
            onSave={onRoomUpdate}
            initialValue={name}
            name="name"
          />
          <EditableInput
            componentClass="textarea"
            rows={5}
            placeholder="Enter Deescription..."
            onSave={onDescUpdate}
            label={<h6 className="mb-3">Deescription</h6>}
            initialValue={description}
            name="description"
            wrapperClass="mt-3"
          />
        </Drawer.Body>

        <Drawer.Footer>
          <Button block onClick={onClose}>
            Close
          </Button>
        </Drawer.Footer>
      </Drawer>
    </div>
  );
};

export default EditRoomBtnDrawer;
