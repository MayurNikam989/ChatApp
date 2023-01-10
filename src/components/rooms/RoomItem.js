import React from "react";
import { Avatar } from "rsuite";
import TimeAgo from "timeago-react";
import ProfileAvatar from "../ProfileAvatar";

const RoomItem = ({ room }) => {
  const { name, createdAt, lastMessage } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center text-vlack-50">
        <h4>{name}</h4>
        <div className="d-flex justify-content-right align-items-center text-vlack-80 font-size-xs">
          <TimeAgo
            datetime={
              lastMessage
                ? new Date(lastMessage.createdAt)
                : new Date(createdAt)
            }
            className="font-small text-black-80"
          />
        </div>
      </div>

      <div className="d-flex align-items-center text-black-70">
        {lastMessage ? (
          <>
            <div className="d-flex align-items-center ">
              <ProfileAvatar
                src={lastMessage.author.avatar}
                name={lastMessage.author.name}
                size="sm"
              />
            </div>
            <div className="text-disappear ml-2">
              <div className="italic">{lastMessage.author.name}</div>
              <span>{lastMessage.text}</span>
            </div>
          </>
        ) : (
          <span className="font-size-small">No Messages yet</span>
        )}
      </div>
    </div>
  );
};

export default RoomItem;
