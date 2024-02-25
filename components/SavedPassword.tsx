import Button from "./common/Button";
import React, { useState } from "react";
import { useSavedPasswords } from "@/context/SavedPasswords";

// Props interface
interface Props {
  name: string;
  password: string;
}

/**
 * Component representing saved password
 */
export default function SavedPassword({ name, password }: Readonly<Props>) {
  const { removeSavedPassword } = useSavedPasswords();
  const [copied, setCopied] = useState<boolean>(false);

  // Copy password to clipboard with a changing text
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start bg-zinc-100 p-4 rounded-md gap-x-10 text-zinc-800">
      <div>
        <h1 className="font-medium text-xl break-all">{name}</h1>
        <p className="mt-1 break-all">{password}</p>
      </div>
      <div className="flex gap-4 sm:mt-0 mt-4">
        <Button variant="primary" onClick={() => copyToClipboard(password)}>
          {copied ? "Copied" : "Copy"}
        </Button>
        <Button variant="danger" onClick={() => removeSavedPassword({ name, password })}>
          Delete
        </Button>
      </div>
    </div>
  );
}
