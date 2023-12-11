import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSavedPasswords } from "@/context/SavedPasswords";
import { passwordGenerateTypes } from "../data/types";

type Form = {
  length: number;
  capital: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function Generate() {
  const disbledPassword: string[] = ["Password will appear here.", "Unacceptable length!"];
  const { savedPasswords, addSavedPassword } = useSavedPasswords();
  const [error, setError] = useState<string | null>(null);
  const [popup, setPopup] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("Password will appear here.");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [nameOfPassword, setNameOfPassword] = useState<string>("");
  const [form, setForm] = useState<Form>({
    length: 16,
    capital: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
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

  const savePasswordSubmit = () => {
    if (nameOfPassword === "") {
      setError("Name cannot be empty.");
      return;
    } else if (savedPasswords.some((savedPassword) => savedPassword.name.toLowerCase() === nameOfPassword.toLowerCase())) {
      setError("Password with this name already exists.");
      return;
    }

    addSavedPassword({ name: nameOfPassword, password: password });
    setNameOfPassword("");
    setError(null);
    setPopup(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  return (
    <>
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-zinc-50 rounded-lg p-8 md:w-1/4 w-full flex flex-col md:mx-0 mx-8 justify-between lg:mt-0 mt-8">
            <h1 className="text-3xl font-medium text-zinc-800">Save password</h1>
            <div className="flex flex-col gap-y-2 mt-4">
              <label className="font-medium select-none text-zinc-800" htmlFor="name">
                Name
              </label>
              <input type="text" name="name" id="name" className="bg-transparent rounded-md px-2 py-2 border-2 border-blue-500 focus:outline-none focus:ring-0 " value={nameOfPassword} onChange={(e) => setNameOfPassword(e.target.value)} />
            </div>
            {error && <p className="text-red-500 mt-1">{error}</p>}
            <div className="flex md:flex-row flex-col gap-4 mt-4">
              <button className="btn-primary" onClick={savePasswordSubmit}>
                Save
              </button>
              <button onClick={() => setPopup(false)} className="btn-secondary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <main className="max-w-screen-xl md:h-screen md:py-0 py-48 flex flex-col justify-center px-4 mx-auto text-zinc-50">
        <motion.h1 initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="md:text-6xl text-4xl font-medium text-zinc-800 md:text-left text-center">
          Generate
        </motion.h1>
        <div className="flex lg:flex-row flex-col justify-between mt-8 gap-x-16">
          <motion.form initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} onSubmit={submitForm} className="md:text-lg">
            <div className="flex md:flex-row flex-col items-center justify-between gap-4 bg-zinc-100 px-8 py-6 rounded-md">
              <label className="font-medium select-none text-zinc-800" htmlFor="length">
                Length: <span className="text-blue-500">{form.length}</span>
              </label>
              <input type="range" name="length" id="length" value={form.length} onChange={updateForm} className="range" min="4" max="64" />
            </div>
            <div className="flex md:flex-nowrap flex-wrap md:justify-start justify-center gap-x-4 mt-2">
              <div className="checkbox">
                <input type="checkbox" name="capital" id="capital" checked={form.capital} onChange={updateForm} />
                <label htmlFor="capital">Uppercase</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" name="lowercase" id="lowercase" checked={form.lowercase} onChange={updateForm} />
                <label htmlFor="lowercase">Lowercase</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" name="numbers" id="numbers" checked={form.numbers} onChange={updateForm} />
                <label htmlFor="numbers">Numbers</label>
              </div>
              <div className="checkbox">
                <input type="checkbox" name="symbols" id="symbols" checked={form.symbols} onChange={updateForm} />
                <label htmlFor="symbols">Symbols</label>
              </div>
            </div>
            <div className="mt-6 md:text-left text-center">
              <button type="submit" disabled={!(form.capital || form.lowercase || form.numbers || form.symbols)} className="btn-primary">
                Generate
              </button>
            </div>
          </motion.form>
          <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="border-2 border-blue-500 rounded-lg p-4 w-11/12 flex flex-col md:mx-0 mx-auto justify-between lg:mt-0 mt-8">
            <p className={`break-all md:text-lg ${disbledPassword.includes(password) && "opacity-50"} font-medium md:mb-0 mb-4 text-zinc-800`}>{password}</p>
            <div className="flex md:flex-row flex-col gap-y-4 justify-between mt-4">
              <div className="flex md:flex-row flex-col gap-4">
                <button className="btn-primary" disabled={disbledPassword.includes(password)} onClick={() => copyToClipboard(password)}>
                  {copied ? "Copied" : "Copy"}
                </button>
                <button onClick={() => setPopup(true)} className="btn-secondary" disabled={disbledPassword.includes(password)}>
                  Save
                </button>
              </div>
              <button
                className="btn-secondary"
                onClick={() => {
                  setPassword("Password will appear here");
                  setForm({
                    length: 16,
                    capital: true,
                    lowercase: true,
                    numbers: true,
                    symbols: true,
                  });
                  setSelectedTypes([]);
                }}
                disabled={disbledPassword.includes(password)}
              >
                Clear
              </button>
            </div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
