import React, { createContext, useEffect } from "react";
import { useContext, useState } from "react";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

export const isOfflineForDatabase = {
  state: "offline",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const isOnlineForDatabase = {
  state: "online",
  last_changed: firebase.database.ServerValue.TIMESTAMP,
};

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let user, userStatusRef;
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      // console.log(authObj);

      if (authObj) {
        user = database.ref(`/profiles/${authObj.uid}`);
        userStatusRef = database.ref(`/status/${authObj.uid}`);
        user.on("value", (snap) => {
          //database obtained from firebase database
          const { name, createdAt, avatar } = snap.val();
          // console.log(profileData);
          //getting additional data from authObj
          const data = {
            name,
            createdAt,
            avatar,
            uid: authObj.uid,
            Email: authObj.email,
          };

          database.ref(".info/connected").on("value", (snapshot) => {
            // If we're not currently connected, don't do anything.
            if (!!snapshot.val() === false) {
              return;
            }
            userStatusRef
              .onDisconnect()
              .set(isOfflineForDatabase)
              .then(() => {
                userStatusRef.set(isOnlineForDatabase);
              });
          });

          //setting profile data
          setProfiles(data);
          setIsLoading(false);
        });
      } else {
        database.ref(".info/connected").off("value");

        if (user) {
          user.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }
        setProfiles(null);
        setIsLoading(false);
      }

      return () => {
        database.ref(".info/connected").off("value");

        if (user) {
          user.off();
        }
        if (userStatusRef) {
          userStatusRef.off();
        }
      };
    });
  }, []);

  return (
    <ProfileContext.Provider value={{ profiles, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
