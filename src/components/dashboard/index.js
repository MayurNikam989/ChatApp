import React, { useCallback } from "react";
import { Alert, Button, Divider, Drawer, Icon } from "rsuite";
import { useProfile } from "../../context/profile.context";
import { database } from "../../misc/firebase";
import { getUserUpdate } from "../../misc/helpers";
import EditableInput from "../EditableInput";
import ProviderBlock from "../ProviderBlock";
import AvatarUploadBtn from "./AvatarUploadBtn";

const Dashboard = ({ onSignOut }) => {
  const { profiles } = useProfile();

  const onSave = async (newData) => {
    // const userNicknameRef = database
    //   .ref(`/profiles/${profiles.uid}`)
    //   .child("name");
    try {
      // await userNicknameRef.set(newData);
      const updates = await getUserUpdate(
        profiles.uid,
        "name",
        newData,
        database
      );
      database.ref().update(updates);
      Alert.success("Nickname Updated Succesfully", 4000);
    } catch (error) {
      Alert.error(error.message, 4000);
    }
  };
  return (
    <>
      <Drawer.Header>
        <Drawer.Title>Dashboard</Drawer.Title>
      </Drawer.Header>

      <Drawer.Body>
        <h3>hey, {profiles.name}</h3>
        <ProviderBlock />
        <Divider />
        <EditableInput
          placeholder="Write your Nickname"
          onSave={onSave}
          label={<h6 className="mb-3">Nickname</h6>}
          initialValue={profiles.name}
          name="Nickname"
        />
        <AvatarUploadBtn />
      </Drawer.Body>

      <Drawer.Footer>
        <Button appearance="ghost" color="red" onClick={onSignOut}>
          <Icon icon="sign-out" /> Sign Out
        </Button>
      </Drawer.Footer>
    </>
  );
};

export default Dashboard;
