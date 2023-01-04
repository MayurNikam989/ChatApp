import React, { useCallback, useState } from "react";
import { Icon, InputGroup, Input, Alert } from "rsuite";

const EditableInput = ({ placeHolder, onSave, initialValue }) => {
  const [input, setInput] = useState(initialValue);
  const [isEditable, setIsEditable] = useState(false);

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setIsEditable((p) => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      Alert.info("No Change made", 4000);
    }
    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
    setIsEditable(false);
  };

  return (
    <div>
      <h6 className="mb-3">Nickname</h6>
      <InputGroup>
        <Input
          disabled={!isEditable}
          name="nickname"
          placeholder={placeHolder}
          value={input}
          onChange={onInputChange}
        ></Input>
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={isEditable ? "close" : "edit2"} />
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default EditableInput;
