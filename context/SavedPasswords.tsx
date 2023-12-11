import { Password } from "../data/types";
import { createContext, useContext, useMemo, useCallback, useState, useEffect, ReactNode } from "react";

const SavedPasswordsContext = createContext({
  savedPasswords: [] as Password[],
  addSavedPassword: (password: Password) => {},
  removeSavedPassword: (password: Password) => {},
  clearSavedPasswords: () => {},
});

export const SavedPasswordsProvider = ({ children }: { children: ReactNode }) => {
  const [savedPasswords, setSavedPasswords] = useState<Password[]>([]);

  const addSavedPassword = useCallback(
    (password: Password) => {
      localStorage.setItem("savedPasswords", JSON.stringify([...savedPasswords, password]));
      setSavedPasswords((savedPasswords) => [...savedPasswords, password]);
    },
    [savedPasswords]
  );

  const loadSavedPasswords = useCallback(() => {
    const savedPasswords = localStorage.getItem("savedPasswords");
    if (savedPasswords) {
      setSavedPasswords(JSON.parse(savedPasswords));
    }
  }, []);

  const removeSavedPassword = useCallback(
    (password: Password) => {
      localStorage.setItem("savedPasswords", JSON.stringify(savedPasswords.filter((savedPassword) => savedPassword.name !== password.name)));
      setSavedPasswords((savedPasswords) => savedPasswords.filter((savedPassword) => savedPassword.name !== password.name));
    },
    [savedPasswords]
  );

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
