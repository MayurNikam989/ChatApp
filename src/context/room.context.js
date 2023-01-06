import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../misc/firebase";
import { objectToArr } from "../misc/helpers";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomRef = database.ref("rooms");

    roomRef.on("value", (snap) => {
      //convert snap.val object to an Array
      const roomData = objectToArr(snap.val());
      setRooms(roomData);

      // console.log("room", roomList);
    });

    return () => {
      if (roomRef) roomRef.off();
    };
  }, []);

  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>;
};

export const useRooms = () => useContext(RoomContext);
