import React, { useCallback, useEffect, useState } from "react";
import { database } from "./firebase";

export function useModalState(defaultValue = false) {
  const [isOpen, setIsOpen] = useState(defaultValue);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);
  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  return { isOpen, onClose, onOpen };
}

export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  );

  useEffect(() => {
    const queryList = window.matchMedia(query);
    setMatches(queryList.matches);

    const listener = (evt) => setMatches(evt.matches);

    queryList.addEventListener("change", listener);
    return () => queryList.removeEventListener("change", listener);
  }, [query]);

  return matches;
};

export function usePresence(uid) {
  const [presence, setPresence] = useState(null);
  useEffect(() => {
    const userStatusRef = database.ref(`/status/${uid}`);

    userStatusRef.on("value", (snap) => {
      if (snap.exists()) {
        const data = snap.val();
        setPresence(data);
      }
    });

    return () => {
      if (userStatusRef) {
        userStatusRef.off();
      }
    };
  }, [uid]);

  return presence;
}
