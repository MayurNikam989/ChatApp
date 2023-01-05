import React, { useRef, useState } from "react";
import { Alert, Button, Modal } from "rsuite";
import { useModalState } from "../../misc/custom-hooks";
import AvatarEditor from "react-avatar-editor";
import { database, storage } from "../../misc/firebase";
import { useProfile } from "../../context/profile.context";
import ProfileAvatar from "../ProfileAvatar";
const inputType = ".png,.jpg,.jpeg";
const acceptedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
const isValidFile = (file) => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const { isOpen, onClose, onOpen } = useModalState();
  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { profiles } = useProfile();

  const AvatarEditorRef = useRef();
  const getBlob = (canvasEditorImg) => {
    return new Promise((resolve, reject) => {
      canvasEditorImg.toBlob((blob) => {
        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("File Process error"));
        }
      });
    });
  };

  const onUploadClick = async () => {
    const canvasEditorImg = AvatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);
    try {
      const blob = await getBlob(canvasEditorImg);

      const userFileRef = storage
        .ref(`/profiles/${profiles.uid}`)
        .child("avatar");

      const uploadAvatarResult = await userFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${profiles.uid}`)
        .child("avatar");

      userAvatarRef.set(downloadUrl);

      Alert.info("Avatar has been uploaded", 4000);
      setIsLoading(false);
    } catch (error) {
      Alert.info(error.message, 4000);
      setIsLoading(false);
    }
  };

  const onFileInputChange = (ev) => {
    const currFile = ev.target.files;
    if (currFile.length === 1) {
      const file = currFile[0];
      if (isValidFile(file)) {
        setImg(file);
        onOpen();
      } else {
        Alert.warning(`Wrong File type ${file.type}`);
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <ProfileAvatar src={profiles.avatar} name={profiles.name} />

      <div>
        <label
          htmlFor="upload-avatar"
          className="d-block cursor-pointer padded"
        >
          Select new Avatar
          <input
            id="upload-avatar"
            type="file"
            className="d-none"
            accept={inputType}
            onChange={onFileInputChange}
          />
        </label>
        <Modal show={isOpen} onHide={onClose}>
          <Modal.Header>
            <Modal.Title>Edit and Upload avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {img && (
              <div className="d-flex justify-content-center">
                <AvatarEditor
                  ref={AvatarEditorRef}
                  image={img}
                  width={250}
                  height={250}
                  border={10}
                  borderRadius={75}
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button
              appearance="ghost"
              color="yellow"
              block
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload Avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
