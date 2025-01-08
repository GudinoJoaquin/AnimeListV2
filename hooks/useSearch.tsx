// hooks/useSearch.ts

import { useState, useEffect } from "react";
import { Keyboard } from "react-native";
import { useDebounce } from "use-debounce";

export default function useSearch(initialQuery: string = "") {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => setIsKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setIsKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    debouncedQuery,
    isKeyboardVisible,
  };
}
