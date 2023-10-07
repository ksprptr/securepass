import Link from "next/link";
import React, { useState } from "react";

type Form = {
  length: number;
  capital: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function Generator() {
  const [form, setForm] = useState<Form>({
    length: 16,
    capital: true,
    lowercase: true,
    numbers: true,
    symbols: true,
  });

  const [password, setPassword] = useState("Password will appear here");

  const updateForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "£$&()*+[]@#^-_!?";

    let charset = "";
    form.capital && (charset += capital);
    form.lowercase && (charset += lowercase);
    form.numbers && (charset += numbers);
    form.symbols && (charset += symbols);

    let password = "";
    for (let i = 0; i < form.length; ++i) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }

    setPassword(password);
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
      <div
        data-aos="fade-down"
        data-aos-duration="500"
        data-aos-once="true"
        data-aos-delay="50"
        className="max-w-screen-lg px-8 mx-auto text-zinc-50 py-32"
      >
        <div className="text-center">
          <h1 className="md:text-6xl text-4xl text-zinc-50 font-bold">
            Securepass
          </h1>
          <p className="mt-4 md:text-xl text-base text-zinc-400">
            Password generator based on{" "}
            <Link href="/algorithm" className="underline">
              custom algorithm
            </Link>
          </p>
        </div>
        <form onSubmit={submitForm} className="mt-16">
          <div className="flex md:flex-row flex-col text-xl items-center md:justify-between gap-y-4 bg-[#12151a] p-6 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="length">
              Length:{" "}
              <span className="text-[#3f71b7] font-semibold">
                {form.length}
              </span>
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
          <div className="flex text-xl justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="capital">
              Uppercase <span className="text-zinc-200 text-sm">(ABC..)</span>
            </label>
            <input
              type="checkbox"
              name="capital"
              id="capital"
              checked={form.capital}
              onChange={updateForm}
              className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
            />
          </div>
          <div className="flex text-xl justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="lowercase">
              Lowercase <span className="text-zinc-200 text-sm">(abc..)</span>
            </label>
            <input
              type="checkbox"
              name="lowercase"
              id="lowercase"
              checked={form.lowercase}
              onChange={updateForm}
              className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
            />
          </div>
          <div className="flex text-xl justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="numbers">
              Numbers <span className="text-zinc-200 text-sm">(1234..)</span>
            </label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              checked={form.numbers}
              onChange={updateForm}
              className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
            />
          </div>
          <div className="flex text-xl justify-between items-center bg-[#12151a] p-5 rounded-lg mt-4 w-auto">
            <label className="font-medium select-none" htmlFor="symbols">
              Symbols <span className="text-zinc-200 text-sm">(!#@$..)</span>
            </label>
            <input
              type="checkbox"
              name="symbols"
              id="symbols"
              checked={form.symbols}
              onChange={updateForm}
              className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer"
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
                className="text-xl text-zinc-50 border-2 border-[#3f71b7] rounded-lg px-4 py-2 hover:bg-[#3f71b7] duration-150 font-medium disabled:opacity-50 disabled:hover:bg-transparent select-none"
              >
                Generate
              </button>
            </div>
          </div>
        </form>
        <div className="border border-[#3f71b7] rounded-lg mt-6 p-4">
          <div className="md:mt-0 md:flex md:justify-between md:items-center">
            <p
              className={`md:break-normal break-all ${
                password === "Password will appear here" && "opacity-50"
              } md:text-xl font-medium md:mb-0 mb-4 text-zinc-50`}
            >
              {password}
            </p>
            <button
              className="px-6 py-2 border-2 border-[#3f71b7] rounded-lg hover:bg-[#3f71b7] duration-150 text-xl disabled:opacity-50 disabled:hover:bg-transparent select-none"
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
      </div>
    </>
  );
}
