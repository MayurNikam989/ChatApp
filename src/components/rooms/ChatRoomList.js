import React from "react";
import { Loader, Nav } from "rsuite";
import { useRooms } from "../../context/room.context";
import RoomItem from "./RoomItem";
import { Link, useLocation } from "react-router-dom";

const ChatRoomList = ({ aboveElHeight }) => {
  const rooms = useRooms();
  const location = useLocation();

  return (
    <Nav
      reversed
      appearance="subtle"
      vertical
      className="overflow-y-scroll custom-scroll"
      style={{
        height: `calc(100% - ${aboveElHeight}px - 20px)`,
      }}
      activeKey={location.pathname}
    >
      {!rooms && (
        <Loader size="md" speed="slow" content="Loading..." center vertical />
      )}

      {rooms &&
        rooms.length > 0 &&
        rooms.map((room) => {
          return (
            <Nav.Item
              componentClass={Link}
              to={`/chat/${room.id}`}
              key={room.id}
              eventKey={`/chat/${room.id}`}
            >
              <RoomItem room={room} />
            </Nav.Item>
          );
        })}
    </Nav>
  );
};

export default ChatRoomList;
