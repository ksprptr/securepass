import { Password } from "@/utils/types/global-types";
import { createContext, useContext, useMemo, useCallback, useState, useEffect, ReactNode } from "react";

// Saved passwords context
const SavedPasswordsContext = createContext({
  savedPasswords: [] as Password[],
  addSavedPassword: (password: Password) => {},
  removeSavedPassword: (password: Password) => {},
  clearSavedPasswords: () => {},
});

/**
 * Provider for saved passwords
 */
export const SavedPasswordsProvider = ({ children }: { children: ReactNode }) => {
  const [savedPasswords, setSavedPasswords] = useState<Password[]>([]);

  // Add password to local storage
  const addSavedPassword = useCallback(
    (password: Password) => {
      localStorage.setItem("savedPasswords", JSON.stringify([...savedPasswords, password]));
      setSavedPasswords((savedPasswords) => [...savedPasswords, password]);
    },
    [savedPasswords]
  );

  // Load saved passwords from local storage
  const loadSavedPasswords = useCallback(() => {
    const savedPasswords = localStorage.getItem("savedPasswords");
    if (savedPasswords) {
      setSavedPasswords(JSON.parse(savedPasswords));
    }
  }, []);

  // Remove password from local storage
  const removeSavedPassword = useCallback(
    (password: Password) => {
      localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords.filter((savedPassword) => savedPassword.name !== password.name)));
      setSavedPasswords((savedPasswords) => savedPasswords.filter((savedPassword) => savedPassword.name !== password.name));
    },
    [savedPasswords]
  );

  // Clear all saved passwords from local storage
  const clearSavedPasswords = useCallback(() => {
    localStorage.removeItem("savedPasswords");
    setSavedPasswords([]);
  }, []);

  useEffect(() => {
    loadSavedPasswords();
  }, [loadSavedPasswords]);

  const valueObject = useMemo(() => ({ savedPasswords, addSavedPassword, removeSavedPassword, clearSavedPasswords }), [savedPasswords, addSavedPassword, removeSavedPassword, clearSavedPasswords]);

  return <SavedPasswordsContext.Provider value={valueObject}>{children}</SavedPasswordsContext.Provider>;
};

export const useSavedPasswords = () => useContext(SavedPasswordsContext);
