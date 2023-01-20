import React from "react";
import { useParams } from "react-router";
import { Loader } from "rsuite";
import ChatBottom from "../../components/chat-window/bottom";
import ChatMsg from "../../components/chat-window/messages";
import ChatTop from "../../components/chat-window/top";
import { CurrentRoomProvider } from "../../context/currentRoom.context";
import { useRooms } from "../../context/room.context";
import { auth } from "../../misc/firebase";
import { objectToArr, objToArr } from "../../misc/helpers";

const Chat = () => {
  const { chatId } = useParams();

  const rooms = useRooms();

  if (!rooms) {
    return (
      <Loader speed="slow" content="Loading..." size="md" center vertical />
    );
  }

  const currentRoom = rooms.find((room) => room.id === chatId);

  if (!currentRoom) {
    return (
      <h6 className="text-center mt-page">Oops!..Chat {chatId} not Found</h6>
    );
  }

  const { name, description } = currentRoom;

  const admins = objToArr(currentRoom.admins);
  const isAdmin = admins.includes(auth.currentUser.uid);

  const currentRoomData = { name, description, admins, isAdmin };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <ChatMsg />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
