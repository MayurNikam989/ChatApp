import React, { useCallback, useState } from "react";
import { Alert, Icon, Input, InputGroup } from "rsuite";
import firebase from "firebase/app";
import { useProfile } from "../../../context/profile.context";
import { useParams } from "react-router";
import { database } from "../../../misc/firebase";

function assembleMsgData(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      name: profile.name,
      uid: profile.uid,
      createdAt: profile.createdAt,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    createdAt: firebase.database.ServerValue.TIMESTAMP,
    likeCount: 0,
  };
}

const ChatBottom = () => {
  const [input, setInput] = useState("");
  const { profiles } = useProfile();
  const { chatId } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  const onInputChange = useCallback((value) => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === "") {
      return;
    }
    setIsLoading(true);
    const msgData = assembleMsgData(profiles, chatId);
    msgData.text = input;

    const messageId = database.ref("messages").push().key;

    const updates = {};

    updates[`messages/${messageId}`] = msgData;
    updates[`rooms/${chatId}/lastMessage`] = { ...msgData, msgId: messageId };

    try {
      await database.ref().update(updates);
      setInput("");
      setIsLoading(false);
    } catch (error) {
      Alert.error(error.message, 4000);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <InputGroup>
        <Input
          placeholder="write your messages here..."
          value={input}
          onChange={onInputChange}
          onPressEnter={onSendClick}
        />
        <InputGroup.Button
          color="cyan"
          onClick={onSendClick}
          disabled={isLoading}
        >
          <Icon icon="send"></Icon>
        </InputGroup.Button>
      </InputGroup>
    </div>
  );
};

export default ChatBottom;
