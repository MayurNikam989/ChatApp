import React from "react";
import TimeAgo from "timeago-react";

const RoomItem = ({ room }) => {
  const { name, createdAt } = room;
  return (
    <div>
      <div className="d-flex justify-content-between align-items-center text-vlack-50">
        <h4>{name}</h4>
        <TimeAgo
          datetime={new Date(createdAt)}
          className="font-small text-black-80"
        />
      </div>

      <div className="d-flex text-black-70">
        <span>No Messages yet</span>
      </div>
    </div>
  );
};

export default RoomItem;
