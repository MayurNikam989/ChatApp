import React, { useState, useRef, useEffect } from "react";
import { Divider } from "rsuite";
import { RoomProvider } from "../context/room.context";
import CreateRoomBtnModal from "./CreateRoomBtnModal";
import DashboardToggle from "./dashboard/DashboardToggle";
import ChatRoomList from "./rooms/ChatRoomList";

const Sidebar = () => {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <RoomProvider>
      <div className="h-100 pt-1">
        <div ref={topSidebarRef}>
          <DashboardToggle />
          <CreateRoomBtnModal />
          <Divider>Join Conversation</Divider>
        </div>
        <ChatRoomList aboveElHeight={height} />
      </div>
    </RoomProvider>
  );
};

export default Sidebar;
