import React from "react";
import ProfileAvatar from "../../ProfileAvatar";
import TimeAgo from "timeago-react";
import ProfileInfoModalBtn from "./ProfileInfoModalBtn";
import PresenceDot from "../../PresenceDot";
import { Button } from "rsuite";
import { useCurrentRooms } from "../../../context/currentRoom.context";
import { auth } from "../../../misc/firebase";
import { useHover, useMediaQuery } from "../../../misc/custom-hooks";
import IconBtnControl from "./IconBtnControl";

const MessageItem = ({ message, handleAdmins, handleLike, handleDelete }) => {
  const { author, text, createdAt, likes, likeCount } = message;

  const isAdmin = useCurrentRooms((v) => v.isAdmin);
  const admins = useCurrentRooms((v) => v.admins);
  const isMobile = useMediaQuery("(max-width:992px)");
  const isMsgAuthorAdmin = admins.includes(author.uid);
  const isAuthor = auth.currentUser.uid === author.uid;
  const canGrantAdminPermission = isAdmin && !isAuthor;
  const [selfRef, isHovered] = useHover();
  const canShowIcons = isMobile || isHovered;

  const isLiked = likes && Object.keys(likes).includes(auth.currentUser.uid);

  return (
    <li
      className={`padded mb-1 cursor-pointer ${isHovered ? "bg-black-02" : ""}`}
      ref={selfRef}
    >
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
        <IconBtnControl
          {...(isLiked ? { color: "red" } : {})}
          isVisible={canShowIcons}
          iconName="heart"
          tooltip="Like Message"
          onClick={() => handleLike(message.id)}
          badgeContent={likeCount}
        />
        {isAuthor && (
          <IconBtnControl
            isVisible={canShowIcons}
            iconName="close"
            tooltip="Delete Message"
            onClick={() => handleDelete(message.id)}
          />
        )}
      </div>
      <div>
        <span className="word-break-all ">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
