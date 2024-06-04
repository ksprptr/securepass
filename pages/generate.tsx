import Button from "@/components/common/Button";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import ModalWindow from "@/components/common/ModalWindow";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSavedPasswords } from "@/context/SavedPasswords";
import { passwordGenerateTypes } from "@/utils/types/global-types";

// Form interface
interface Form {
  length: number;
  capital: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
}

/**
 * Component representing a generate password page
 */
export default function Generate() {
  const { savedPasswords, addSavedPassword } = useSavedPasswords();
  const disabledPasswordTypes: string[] = ["Password will appear here.", "Unacceptable length."];
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("Password will appear here.");
  const [modalWindow, setModalWindow] = useState<boolean>(false);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [nameOfPassword, setNameOfPassword] = useState<string>("");
  const [form, setForm] = useState<Form>({
    length: 16,
    capital: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  /**
   * Submit form handler
   */
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.length > 64 || form.length < 4) {
      setPassword("Unacceptable length!");
      return;
    }

    form.capital && selectedTypes.push(passwordGenerateTypes.capital);
    form.lowercase && selectedTypes.push(passwordGenerateTypes.lowercase);
    form.numbers && selectedTypes.push(passwordGenerateTypes.numbers);
    form.symbols && selectedTypes.push(passwordGenerateTypes.symbols);

    let generatedPassword = "";
    let prevType: number = 0;
    let prevChar: string = "";

    for (let i = 0; i < form.length; ) {
      const currentIndex = Math.floor(Math.random() * selectedTypes.length);
      if (selectedTypes.length !== 1) {
        if (currentIndex === prevType) {
          continue;
        }
      }
      const type = selectedTypes[currentIndex];
      const randomChar = type[Math.floor(Math.random() * type.length)];
      if (randomChar === prevChar) {
        continue;
      }
      prevChar = randomChar;
      generatedPassword += randomChar;
      prevType = currentIndex;
      i++;
    }

    setPassword(generatedPassword);
    setSelectedTypes([]);
  };

  /**
   * Save password submit handler
   */
  const savePasswordHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (nameOfPassword === "") {
      setError("Name cannot be empty.");
      return;
    } else if (nameOfPassword.length > 32) {
      setError("Name cannot be longer than 32 characters.");
      return;
    } else if (savedPasswords.some((savedPassword) => savedPassword.name.toLowerCase() === nameOfPassword.toLowerCase())) {
      setError("Password with this name already exists.");
      return;
    }

    addSavedPassword({ name: nameOfPassword, password: password });
    setNameOfPassword("");
    setError(null);
    setModalWindow(false);
  };

  // Update form values
  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  // Copy password to clipboard with a changing text
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <>
      {modalWindow && (
        <ModalWindow>
          <div className="bg-zinc-50 rounded-lg p-8 xl:w-1/4 md:w-1/2 w-8/12 flex flex-col md:mx-0 mx-8 justify-between lg:mt-0 mt-8">
            <Heading size="3" className="font-medium text-zinc-800">
              Save password
            </Heading>
            <form onSubmit={savePasswordHandler} className="flex flex-col gap-y-2 mt-4">
              <label className="font-medium select-none text-zinc-800" htmlFor="name">
                Name
              </label>
              <input type="text" name="name" id="name" className="bg-transparent rounded-md px-2 py-2 border-2 border-blue-500 focus:outline-none focus:ring-0 " value={nameOfPassword} onChange={(e) => setNameOfPassword(e.target.value)} />
              <span className="text-red-500 text-sm mt-1">{error}</span>
              <div className="flex md:flex-row flex-col gap-4 mt-4">
                <Button type="submit" variant="primary">
                  Save
                </Button>
                <Button type="button" variant="danger" onClick={() => setModalWindow(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </ModalWindow>
      )}
      <div className="max-w-screen-xl px-4 mx-auto md:h-screen md:py-0 py-48 flex flex-col justify-center text-zinc-50">
        <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Heading size="2" className="text-zinc-800 md:text-left text-center">
            Generate
          </Heading>
        </motion.div>
        <div className="flex lg:flex-row flex-col justify-between mt-8 gap-x-16">
          <motion.form initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} onSubmit={submitHandler} className="md:text-lg">
            <div className="flex md:flex-row flex-col items-center justify-between gap-4 bg-zinc-100 px-8 py-6 rounded-md">
              <label className="font-medium select-none text-zinc-800" htmlFor="length">
                Length: <span className="text-blue-500">{form.length}</span>
              </label>
              <input type="range" name="length" id="length" value={form.length} onChange={updateForm} className="range" min="4" max="64" />
            </div>
            <ul className="flex md:flex-nowrap flex-wrap md:justify-start justify-center gap-x-4 mt-2">
              <li className="checkbox">
                <input type="checkbox" name="capital" id="capital" checked={form.capital} onChange={updateForm} />
                <label htmlFor="capital">Uppercase</label>
              </li>
              <li className="checkbox">
                <input type="checkbox" name="lowercase" id="lowercase" checked={form.lowercase} onChange={updateForm} />
                <label htmlFor="lowercase">Lowercase</label>
              </li>
              <li className="checkbox">
                <input type="checkbox" name="numbers" id="numbers" checked={form.numbers} onChange={updateForm} />
                <label htmlFor="numbers">Numbers</label>
              </li>
              <li className="checkbox">
                <input type="checkbox" name="symbols" id="symbols" checked={form.symbols} onChange={updateForm} />
                <label htmlFor="symbols">Symbols</label>
              </li>
            </ul>
            <div className="mt-6 md:text-left text-center">
              <Button type="submit" variant="primary" disabled={!(form.capital || form.lowercase || form.numbers || form.symbols)}>
                Generate
              </Button>
            </div>
          </motion.form>
          <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="border-2 border-blue-500 rounded-lg p-4 w-11/12 flex flex-col md:mx-0 mx-auto justify-between lg:mt-0 mt-8">
            <Paragraph className={`!mt-0 break-all ${disabledPasswordTypes.includes(password) && "opacity-50"} md:mb-0 mb-4 text-zinc-800`}>{password}</Paragraph>
            <div className="flex md:flex-row flex-col gap-y-4 justify-between mt-4">
              <div className="flex md:flex-row flex-col gap-4">
                <Button variant="primary" onClick={() => copyToClipboard(password)} disabled={disabledPasswordTypes.includes(password)}>
                  {copied ? "Copied" : "Copy"}
                </Button>
                <Button variant="primary" styleType="outline" onClick={() => setModalWindow(true)} disabled={disabledPasswordTypes.includes(password)}>
                  Save
                </Button>
              </div>
              <Button
                variant="danger"
                onClick={() => {
                  setPassword("Password will appear here.");
                  setForm({
                    length: 16,
                    capital: true,
                    lowercase: true,
                    numbers: true,
                    symbols: true,
                  });
                  setSelectedTypes([]);
                }}
                disabled={disabledPasswordTypes.includes(password)}
              >
                Clear
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
