/* eslint-disable no-param-reassign */

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Alert } from "rsuite";
import { database } from "../../../misc/firebase";
import { objectToArr } from "../../../misc/helpers";
import MessageItem from "./MessageItem";

const ChatMsg = () => {
  const [message, setMessage] = useState(null);
  const { chatId } = useParams();

  const isChatEmpty = message && message.length === 0;
  const canShowMsgs = message && message.length > 0;

  useEffect(() => {
    const msgRef = database.ref("/messages");
    msgRef
      .orderByChild("roomId")
      .equalTo(chatId)
      .on("value", (snap) => {
        const msgData = objectToArr(snap.val());

        setMessage(msgData);
      });

    return () => {
      msgRef.off("value");
    };
  }, [chatId]);

  const handleAdmins = useCallback(
    async (uid) => {
      let alertMsg;
      const adminRef = database.ref(`/rooms/${chatId}/admins`);
      await adminRef.transaction((admins) => {
        if (admins) {
          if (admins[uid]) {
            admins[uid] = null;
            alertMsg = "Admin Permission Removed";
          } else {
            admins[uid] = true;
            alertMsg = "Admin permission Granted ";
          }
        }
        return admins;
      });
      Alert.info(alertMsg, 4000);
    },
    [chatId]
  );

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && (
        <li className="text-center mt-page">
          <h5>No Messages</h5>
        </li>
      )}
      {canShowMsgs &&
        message.map((msg) => {
          return (
            <MessageItem
              key={msg.id}
              message={msg}
              handleAdmins={handleAdmins}
            />
          );
        })}
    </ul>
  );
};

export default ChatMsg;
