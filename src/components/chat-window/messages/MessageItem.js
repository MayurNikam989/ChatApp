import React from "react";
import ProfileAvatar from "../../ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoModalBtn from "./ProfileInfoModalBtn";
import PresenceDot from "../../PresenceDot";

const MessageItem = ({ message }) => {
  const { author, text, createdAt } = message;
  return (
    <li className="padded mb-1 ">
      <div className="d-flex  align-items-center font-bolder  ">
        <PresenceDot uid={author.uid} />

        <ProfileAvatar
          src={author.avatar}
          name={author.name}
          className="ml-1"
          size="xs"
        />
        <span>
          <ProfileInfoModalBtn profile={author}></ProfileInfoModalBtn>
        </span>

        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-size-xs  text-black-45"
        />
      </div>
      <div>
        <span className="word-break-all ">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
