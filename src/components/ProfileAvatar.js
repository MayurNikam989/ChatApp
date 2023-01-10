import React from "react";
import { Avatar } from "rsuite";
import { getNameInitials } from "../misc/helpers";

const ProfileAvatar = ({ name, ...profileProps }) => {
  // const presence = usePresence(uid);
  return (
    <Avatar {...profileProps} circle>
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
