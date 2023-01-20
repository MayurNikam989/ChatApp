import React, { useState } from "react";
import { Button, Modal, Tag, Icon } from "rsuite";
import { useModalState } from "../../../misc/custom-hooks";
import ProfileAvatar from "../../ProfileAvatar";

const ProfileInfoModalBtn = ({ profile, children }) => {
  const { isOpen, onClose, onOpen } = useModalState();

  const shortName = profile.name.split(" ")[0];
  const memberSince = new Date(profile.createdAt).toLocaleDateString();

  //   const [isConnected] = useState({
  //     "google.com": auth.currentUser.providerData.some((data) => {
  //       return data.providerId === "google.com";
  //     }),
  //     "facebook.com": auth.currentUser.providerData.some((data) => {
  //       return data.providerId === "facebook.com";
  //     }),
  //   });

  return (
    <div>
      <Button
        appearance="link"
        className="text-black font-normal"
        onClick={onOpen}
      >
        {profile.name}
      </Button>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header>
          <Modal.Title>{shortName} Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={profile.avatar}
            className="width-200 height-200 img-fullsize font-huge"
            name={profile.name}
          />
          <h4>{profile.name}</h4>

          <span>Member since {memberSince}</span>
          {/* <p className="mt-1 ">
            {isConnected["google.com"] && (
              <Tag color="green">
                <Icon icon="google" /> Connected{" "}
              </Tag>
            )}
            {isConnected["facebook.com"] && (
              <Tag color="blue">
                <Icon icon="facebook" /> Connected
              </Tag>
            )}
          </p> */}
        </Modal.Body>
        <Modal.Footer>
          {children}
          <Button block appearance="default" onClick={onClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfileInfoModalBtn;
