/* eslint-disable no-param-reassign */

import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Alert } from "rsuite";
import { auth, database } from "../../../misc/firebase";
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

  const handleLike = useCallback(async (msgId) => {
    let alertMsg;
    const { uid } = auth.currentUser;
    const msgRef = database.ref(`/messages/${msgId}`);
    await msgRef.transaction((msg) => {
      if (msg) {
        if (msg.likes && msg.likes[uid]) {
          msg.likeCount -= 1;
          msg.likes[uid] = null;
          alertMsg = "Like Removed";
        } else {
          msg.likeCount += 1;
          if (!msg.likes) {
            msg.likes = {};
          }
          msg.likes[uid] = true;
          alertMsg = "Liked ";
        }
      }
      return msg;
    });
    Alert.info(alertMsg, 4000);
  }, []);

  const handleDelete = useCallback(
    async (msgId) => {
      if (!window.confirm("Delete This message")) {
        return;
      }

      const isLast = message[message.length - 1].id === msgId;

      const updates = {};

      updates[`/messages/${msgId}`] = null;

      if (isLast && message.length > 1) {
        updates[`/rooms/${chatId}/lastMessage`] = {
          ...message[message.length - 2],
          msgId: message[message.length - 2].id,
        };
      }

      if (isLast && message.length === 1) {
        updates[`/rooms/${chatId}/lastMessage`] = null;
      }

      try {
        await database.ref().update(updates);
        Alert.info("Message deleted", 4000);
      } catch (err) {
        Alert.error(err.message, 4000);
      }
    },
    [chatId, message]
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
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          );
        })}
    </ul>
  );
};

export default ChatMsg;
