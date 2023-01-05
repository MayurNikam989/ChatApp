import React from "react";
import { Avatar } from "rsuite";
import { getNameInitials } from "../misc/helpers";

const ProfileAvatar = ({ name, src }) => {
  return (
    <Avatar
      circle
      src={src}
      className="width-200 height-200 img-fullsize font-huge"
    >
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
