import React, { useCallback, useEffect, useState } from "react";

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
