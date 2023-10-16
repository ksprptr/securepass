import Head from "next/head";
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
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
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
      const type = selectedTypes[currentIndex]; // urcity typ (capital, lowercase, numbers, symbols)
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

  const [copy, setCopy] = useState(false);
  const onCopy = () => {
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Securepass | Generate</title>
      </Head>
      <motion.main
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-lg px-4 mx-auto text-zinc-50 py-20 min-h-screen flex flex-col items-center justify-center"
      >
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-clip-text text-transparent from-zinc-50 to-zinc-400 bg-gradient-to-r lg:mt-0 mt-20">
            Generate
          </h1>
        </div>
        <form onSubmit={submitForm} className="mt-16 text-lg w-11/12">
          <div className="flex md:flex-row flex-col items-center md:justify-between gap-y-4 bg-[#12151a] p-6 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="length">
              Length:{" "}
              <span className="text-primary font-semibold">{form.length}</span>
            </label>
            <input
              type="range"
              name="length"
              id="length"
              value={form.length}
              onChange={updateForm}
              className="bg-zinc-800 appearance-none md:w-[16rem] h-[0.5rem] rounded focus:outline-none focus:border-none"
              min="4"
              max="64"
            />
          </div>
          <div className="flex justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="capital">
              Uppercase <span className="text-zinc-200 text-sm">(ABC..)</span>
            </label>
            <input
              type="checkbox"
              name="capital"
              id="capital"
              checked={form.capital}
              onChange={updateForm}
              className="w-5 h-5 text-primary bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
            />
          </div>
          <div className="flex justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="lowercase">
              Lowercase <span className="text-zinc-200 text-sm">(abc..)</span>
            </label>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              checked={form.lowercase}
              onChange={updateForm}
              className="w-5 h-5 text-primary bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
            />
          </div>
          <div className="flex justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="numbers">
              Numbers <span className="text-zinc-200 text-sm">(1234..)</span>
            </label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={form.numbers}
              onChange={updateForm}
              className="w-5 h-5 text-primary bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
            />
          </div>
          <div className="flex justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="symbols">
              Symbols <span className="text-zinc-200 text-sm">(!#@$..)</span>
            </label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={form.symbols}
              onChange={updateForm}
              className="w-5 h-5 text-primary bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
            />
          </div>
          <div className="mt-4">
            <div className="text-center">
              <button
                type="submit"
                disabled={
                  !(
                    form.capital ||
                    form.lowercase ||
                    form.numbers ||
                    form.symbols
                  )
                }
                className="text-zinc-50 border-2 border-primary rounded-lg px-4 py-2 hover:bg-primary duration-150 font-medium disabled:opacity-50 disabled:hover:bg-transparent select-none"
              >
                Generate
              </button>
            </div>
          </div>
        </form>
        <div className="border border-primary rounded-lg mt-6 p-4 w-11/12">
          <div className="md:mt-0 md:flex md:justify-between md:items-center">
            <p
              className={`md:break-normal break-all ${
                password === "Password will appear here" && "opacity-50"
              } md:font-medium md:mb-0 mb-4 text-zinc-50`}
            >
              {password}
            </p>
            <button
              className="px-6 py-2 border-2 border-primary rounded-lg hover:bg-primary duration-150 disabled:opacity-50 disabled:hover:bg-transparent select-none"
              disabled={password === "Password will appear here"}
              onClick={() => {
                navigator.clipboard.writeText(password);
                onCopy();
              }}
            >
              {copy ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </motion.main>
    </>
  );
}
