import React, { createContext, useEffect } from "react";
import { useContext, useState } from "react";
import { auth, database } from "../misc/firebase";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profiles, setProfiles] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let user;
    const authUnsub = auth.onAuthStateChanged((authObj) => {
      // console.log(authObj);

      if (authObj) {
        user = database.ref(`/profiles/${authObj.uid}`);
        user.on("value", (snap) => {
          //database obtained from firebase database
          const { name, createdAt } = snap.val();
          console.log(profileData);
          //getting additional data from authObj
          const data = {
            name,
            createdAt,
            uid: authObj.uid,
            Email: authObj.email,
          };
          //setting profile data
          setProfiles(data);
          setIsLoading(false);
        });
      } else {
        if (user) {
          user.off();
        }
        setProfiles(null);
        setIsLoading(false);
      }

      return () => {
        authUnsub();
        if (user) {
          user.off();
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
