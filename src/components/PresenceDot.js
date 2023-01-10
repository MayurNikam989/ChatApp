import React from "react";
import { usePresence } from "../misc/custom-hooks";
import { Whisper, Button, Badge, Tooltip } from "rsuite";

const getColor = (presence) => {
  if (!presence) {
    return "yellow";
  }

  switch (presence.state) {
    case "online":
      return "green";
    case "offline":
      return "red";
    case "default":
      return "yellow";
  }
};

const getText = (presence) => {
  if (!presence) {
    return "status unknown";
  }

  if (presence.state === "online") {
    return "online";
  } else {
    return `Last seen ${new Date(presence.last_changed).toLocaleTimeString}`;
  }
};

const PresenceDot = ({ uid }) => {
  const presence = usePresence(uid);

  return (
    <Whisper
      placement="top"
      trigger="hover"
      speaker={<Tooltip>{getText(presence)}</Tooltip>}
    >
      <Badge
        className="cursor-pointer"
        style={{ backgroundColor: getColor(presence) }}
      />
    </Whisper>
  );
};

export default PresenceDot;
