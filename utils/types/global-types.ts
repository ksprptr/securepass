export interface ExtendedProps {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface SavedPassword {
  name: string;
  password: string;
  date: string;
}

export const passwordGenerateTypes = {
  capital: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789',
  symbols: '$&()*+[]@#^-_!?',
};
