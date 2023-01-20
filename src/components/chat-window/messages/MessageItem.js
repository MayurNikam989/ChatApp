import React from "react";
import ProfileAvatar from "../../ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoModalBtn from "./ProfileInfoModalBtn";
import PresenceDot from "../../PresenceDot";
import { Button } from "rsuite";
import { useCurrentRooms } from "../../../context/currentRoom.context";
import { auth } from "../../../misc/firebase";

const MessageItem = ({ message, handleAdmins }) => {
  const { author, text, createdAt } = message;

  const isAdmin = useCurrentRooms((v) => v.isAdmin);
  const admins = useCurrentRooms((v) => v.admins);
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdminPermission = isAdmin && !isAuthor;

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
          <ProfileInfoModalBtn profile={author}>
            {canGrantAdminPermission && (
              <Button
                appearance="primary"
                block
                color={isMsgAuthorAdmin ? "red" : "blue"}
                onClick={() => handleAdmins(author.uid)}
              >
                {isMsgAuthorAdmin ? "Remove Admin" : "Make Admin"}
              </Button>
            )}
          </ProfileInfoModalBtn>
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
