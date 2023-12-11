import React, { useState } from "react";
import { useSavedPasswords } from "@/context/SavedPasswords";

type Props = {
  name: string;
  password: string;
};

export default function Password({ name, password }: Readonly<Props>) {
  const { removeSavedPassword } = useSavedPasswords();
  const [copied, setCopied] = useState<boolean>(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="flex sm:flex-row flex-col justify-between sm:items-center items-start text-zinc-800 bg-zinc-100 p-4 rounded-md gap-x-10">
      <div>
        <h1 className="font-medium text-xl">{name}</h1>
        <p className="mt-1">{password}</p>
      </div>
      <div className="flex gap-4 sm:mt-0 mt-4">
        <button onClick={() => copyToClipboard(password)} className="btn-primary">
          {copied ? "Copied" : "Copy"}
        </button>
        <button onClick={() => removeSavedPassword({ name, password })} className="btn-danger">
          Delete
        </button>
      </div>
    </div>
  );
}
