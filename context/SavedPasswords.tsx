import { SavedPassword } from '@/utils/types/global-types';
import { SavedPasswordsContext as SavedPasswordsContextType } from '@/utils/types/context-types';
import { useState, useEffect, useContext, createContext, PropsWithChildren } from 'react';

// Create context
const SavedPasswordsContext = createContext<SavedPasswordsContextType>({
  savedPasswords: [],
  addSavedPassword: (_password: SavedPassword) => {},
  removeSavedPassword: (_password: SavedPassword) => {},
  clearSavedPasswords: () => {},
});

/**
 * Component representing the saved passwords provider
 */
export const SavedPasswordsProvider = ({ children }: PropsWithChildren) => {
  const [savedPasswords, setSavedPasswords] = useState<SavedPassword[]>([]);

  /**
   * Add a saved password to local storage
   */
  const addSavedPassword = (password: SavedPassword) => {
    localStorage.setItem('saved-passwords', JSON.stringify([...savedPasswords, password]));
    setSavedPasswords((savedPasswords) => [...savedPasswords, password]);
  };

  /**
   * Remove a saved password from local storage
   */
  const removeSavedPassword = (password: SavedPassword) => {
    localStorage.setItem(
      'saved-passwords',
      JSON.stringify(savedPasswords.filter((savedPassword) => savedPassword.name !== password.name))
    );

    setSavedPasswords((prevSavedPasswords) =>
      prevSavedPasswords.filter((prevSavedPasswords) => prevSavedPasswords.name !== password.name)
    );
  };

  /**
   * Clear all saved passwords from local storage
   */
  const clearSavedPasswords = () => {
    localStorage.removeItem('saved-passwords');

    setSavedPasswords([]);
  };

  /**
   * Load saved passwords from local storage on component mount
   */
  useEffect(() => {
    const loadSavedPasswords = () => {
      const savedPasswords = localStorage.getItem('saved-passwords');

      if (savedPasswords) setSavedPasswords(JSON.parse(savedPasswords));
    };

    loadSavedPasswords();
  }, []);

  return (
    <SavedPasswordsContext.Provider
      value={{ savedPasswords, addSavedPassword, removeSavedPassword, clearSavedPasswords }}>
      {children}
    </SavedPasswordsContext.Provider>
  );
};

/**
 * Hook to use the saved passwords context
 */
export const useSavedPasswords = () => {
  return useContext(SavedPasswordsContext);
};
