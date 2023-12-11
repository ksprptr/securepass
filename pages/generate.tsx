import types from "../data/types.json";
import React, { useState } from "react";
import { motion } from "framer-motion";

type Form = {
  length: number;
  capital: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function Generate() {
  const [copied, setCopied] = useState(false);
  const [password, setPassword] = useState("Password will appear here");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [form, setForm] = useState<Form>({
    length: 16,
    capital: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.length > 64 || form.length < 4) {
      setPassword("Unacceptable length!");
      return;
    }

    form.capital && selectedTypes.push(types.capital);
    form.lowercase && selectedTypes.push(types.lowercase);
    form.numbers && selectedTypes.push(types.numbers);
    form.symbols && selectedTypes.push(types.symbols);

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

  const Copy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <motion.main initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-screen-xl md:h-screen md:py-0 py-48 flex flex-col justify-center px-4 mx-auto text-zinc-50">
      <h1 className="md:text-6xl text-4xl font-medium text-zinc-800 md:text-left text-center">Generate</h1>
      <div className="flex lg:flex-row flex-col justify-between mt-8 gap-x-16">
        <form onSubmit={submitForm} className="md:text-lg">
          <div className="flex md:flex-row flex-col items-center justify-between gap-4 bg-zinc-100 px-8 py-6 rounded-md">
            <label className="font-medium select-none text-zinc-800" htmlFor="length">
              Length: <span className="text-blue-500">{form.length}</span>
            </label>
            <input type="range" name="length" id="length" value={form.length} onChange={updateForm} className="bg-zinc-200 appearance-none md:w-[16rem] h-[0.5rem] rounded focus:outline-none focus:border-none" min="4" max="64" />
          </div>
          <div className="flex md:flex-nowrap flex-wrap md:justify-start justify-center gap-x-4 mt-2">
            <div className="flex gap-x-3 items-center bg-zinc-100 rounded-md px-4 py-3 mt-4 w-auto">
              <input type="checkbox" name="capital" id="capital" checked={form.capital} onChange={updateForm} className="w-5 h-5 text-blue-500 bg-zinc-200 rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
              <label className="font-medium select-none text-zinc-800 hover:cursor-pointer" htmlFor="capital">
                Uppercase
              </label>
            </div>
            <div className="flex gap-x-3 items-center bg-zinc-100 rounded-md px-4 py-3 mt-4 w-auto">
              <input type="checkbox" name="lowercase" id="lowercase" checked={form.lowercase} onChange={updateForm} className="w-5 h-5 text-blue-500 bg-zinc-200 rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
              <label className="font-medium select-none text-zinc-800 hover:cursor-pointer" htmlFor="lowercase">
                Lowercase
              </label>
            </div>
            <div className="flex gap-x-3 items-center bg-zinc-100 rounded-md px-4 py-3 mt-4 w-auto">
              <input type="checkbox" name="numbers" id="numbers" checked={form.numbers} onChange={updateForm} className="w-5 h-5 text-blue-500 bg-zinc-200 rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
              <label className="font-medium select-none text-zinc-800 hover:cursor-pointer" htmlFor="numbers">
                Numbers
              </label>
            </div>
            <div className="flex gap-x-3 items-center bg-zinc-100 rounded-md px-4 py-3 mt-4 w-auto">
              <input type="checkbox" name="symbols" id="symbols" checked={form.symbols} onChange={updateForm} className="w-5 h-5 text-blue-500 bg-zinc-200 rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
              <label className="font-medium select-none text-zinc-800 hover:cursor-pointer" htmlFor="symbols">
                Symbols
              </label>
            </div>
          </div>
          <div className="mt-6 md:text-left text-center">
            <button type="submit" disabled={!(form.capital || form.lowercase || form.numbers || form.symbols)} className="btn-primary">
              Generate
            </button>
          </div>
        </form>
        <div className="border-2 border-blue-500 rounded-lg p-4 w-11/12 flex flex-col md:mx-0 mx-auto justify-between lg:mt-0 mt-8">
          <p className={`break-all md:text-lg ${password === "Password will appear here" && "opacity-50"} font-medium md:mb-0 mb-4 text-zinc-800`}>{password}</p>
          <div className="flex md:flex-row flex-col gap-y-4 justify-between mt-4">
            <div className="flex md:flex-row flex-col gap-4">
              <button className="btn-primary" disabled={password === "Password will appear here"} onClick={() => Copy(password)}>
                {copied ? "Copied" : "Copy"}
              </button>
              <button className="btn-secondary" disabled={password === "Password will appear here"}>
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
              disabled={password === "Password will appear here"}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </motion.main>
  );
}
