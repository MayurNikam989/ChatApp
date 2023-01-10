import React, { memo } from "react";
import { ButtonToolbar, Icon } from "rsuite";
import { useCurrentRooms } from "../../../context/currentRoom.context";
import { Link } from "react-router-dom";
import { useMediaQuery } from "../../../misc/custom-hooks";
import RoomInfoModalBtn from "./RoomInfoModalBtn";
import EditRoomBtnDrawer from "../messages/EditRoomBtnDrawer";

const ChatTop = () => {
  const name = useCurrentRooms((v) => v.name);

  const isMobile = useMediaQuery("(max-width:992px");

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="text-disappear d-flex justify-content-between align-items-center">
          <Icon
            componentClass={Link}
            to={"/"}
            icon="arrow-circle-left"
            size="2x"
            style={{ color: "cyan" }}
            className={isMobile ? "d-inline-block mr-2 pd-0" : "d-none"}
          />
          <span className="text-disappear">{name}</span>
        </h4>

        <ButtonToolbar className="ws-nowrap">
          <EditRoomBtnDrawer />
        </ButtonToolbar>
      </div>

      <div className="d-flex justify-content-between align-items-center">
        <span>todo</span>
        <RoomInfoModalBtn />
      </div>
    </div>
  );
};

export default memo(ChatTop);
