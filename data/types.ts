export type Password = {
  name: string;
  password: string;
};

export const passwordGenerateTypes = {
  "capital": "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  "lowercase": "abcdefghijklmnopqrstuvwxyz",
  "numbers": "0123456789",
  "symbols": "$&()*+[]@#^-_!?"
}