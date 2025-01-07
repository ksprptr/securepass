import { SavedPassword } from '@/utils/types/global-types';

export interface SavedPasswordsContext {
  savedPasswords: SavedPassword[];
  addSavedPassword: (password: SavedPassword) => void;
  removeSavedPassword: (password: SavedPassword) => void;
  clearSavedPasswords: () => void;
}
