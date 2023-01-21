import React, { useCallback, useEffect, useState, useRef } from "react";
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

export function useHover() {
  const [value, setValue] = useState(false);
  const ref = useRef(null);
  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);
  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener("mouseover", handleMouseOver);
        node.addEventListener("mouseout", handleMouseOut);
        return () => {
          node.removeEventListener("mouseover", handleMouseOver);
          node.removeEventListener("mouseout", handleMouseOut);
        };
      }
    },
    [ref.current] // Recall only if ref changes
  );
  return [ref, value];
}
