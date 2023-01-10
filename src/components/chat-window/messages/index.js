/* eslint-disable no-param-reassign */

import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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

  return (
    <ul className="msg-list custom-scroll">
      {isChatEmpty && (
        <li className="text-centre mt-page">
          <h5>No Messages</h5>
        </li>
      )}
      {canShowMsgs &&
        message.map((msg) => {
          return <MessageItem key={msg.id} message={msg} />;
        })}
    </ul>
  );
};

export default ChatMsg;
