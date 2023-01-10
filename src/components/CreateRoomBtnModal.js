import React, { useCallback, useRef, useState } from "react";
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Schema,
  Modal,
} from "rsuite";
import { useModalState } from "../misc/custom-hooks";
import firebase from "firebase/app";
import { database } from "../misc/firebase";

const INITIAL_VALUE = {
  name: "",
  description: "",
};
const model = Schema.Model({
  name: Schema.Types.StringType().isRequired("Room name is required."),
  description: Schema.Types.StringType().isRequired("description is required."),
});

const CreateRoomBtnModal = () => {
  const { isOpen, onClose, onOpen } = useModalState();
  const [formValue, setFormValue] = useState(INITIAL_VALUE);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback((value) => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }
    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };

    try {
      await database.ref("rooms").push(newRoomData);
      Alert.info(`${formValue.name} has been created`, 4000);
      setIsLoading(false);
      setFormValue(INITIAL_VALUE);
      onClose();
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={onOpen}>
        <Icon icon="creative" /> Create New chat room
      </Button>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>Create new Chat room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            formValue={formValue}
            onChange={onFormChange}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room name</ControlLabel>
              <FormControl name="name" placeholder="Enter chat room name..." />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                row={5}
                componentClass="textarea"
                name="description"
                placeholder="Enter chat room description..."
              />
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            color="cyan"
            onClick={onSubmit}
            disabled={isLoading}
          >
            <Icon icon="plus"> Create new room</Icon>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
