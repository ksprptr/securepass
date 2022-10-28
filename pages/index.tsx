import React, { useState } from "react";
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import { useTranslation } from "next-i18next";

type Form = {
  length: number;
  capital: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function Generator() {
  const { t } = useTranslation("generator");
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
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const capital = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%<>{}[]";

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
    setTimeout(() => { setCopy(false) }, 1000)
  }

  return (
    <>
      <main className='bg-[#161a21]'>
        <div className="container px-6 md:px-20 xl:px-48 mx-auto md:pb-16 pb-0">
          <div className="block md:items-center md:justify-between">
            <div className="md:py-24 py-24 text-center">
              <h1 className="text-[3rem] text-white font-bold">Securepass</h1>
              <p className="text-xl text-[#999999]">Adjustable password generator</p>
            </div>
          </div>
          <div>
            <form onSubmit={submitForm} className="pb-16">
              <div className='bg-[#12151a] px-8 py-4 mb-12 rounded'>
                <h3 className='pb-2 text-xl text-gray-300 md:text-left text-center'>Select a type of the password</h3>
                <div className='flex md:justify-between md:flex-row flex-col rounded text-xl items-center md:flex-wrap gap-2'>
                  <div className='text-center md:w-[13rem] w-[11rem] border-2 border-red-700 hover:border-red-800 bg-red-600 hover:bg-red-900 duration-150 hover:cursor-pointer hover:text-gray-300 px-6 py-2 rounded-full font-medium text-shadow select-none' onClick={() => setForm(f => { return { ...f, length: 4, capital: false, lowercase: true, symbols: false, numbers: true }})}>Weak</div>
                  <div className='text-center md:w-[13rem] w-[11rem] border-2 border-orange-700 hover:border-orange-800 bg-orange-600 hover:bg-orange-900 duration-150 hover:cursor-pointer hover:text-gray-300 px-6 py-2 rounded-full font-medium text-shadow select-none' onClick={() => setForm(f => { return { ...f, length: 10, capital: true, lowercase: true, numbers: true, symbols: false }})}>OK</div>
                  <div className='text-center md:w-[13rem] w-[11rem] border-2 border-yellow-700 hover:border-yellow-800 bg-yellow-600 hover:bg-yellow-900 duration-150 hover:cursor-pointer hover:text-gray-300 px-6 py-2 rounded-full font-medium text-shadow select-none' onClick={() => setForm(f => { return { ...form, length: 16, capital: true, lowercase: true, numbers: true, symbols: true }})}>Strong</div>
                  <div className='text-center md:w-[13rem] w-[11rem] border-2 border-green-700 hover:border-green-800 bg-green-600 hover:bg-green-900 duration-150 hover:cursor-pointer hover:text-gray-300 px-6 py-2 rounded-full font-medium text-shadow select-none' onClick={() => setForm(f => { return { ...form, length: 24, capital: true, lowercase: true, numbers: true, symbols: true }})}>Very Strong</div>
                </div>
              </div>
              <div className='bg-[#12151a] px-8 py-2 rounded mb-2'>
                <div className="md:flex md:flex-row justify-between md:text-xl text-lg items-center">
                  <label className="py-4 font-medium" htmlFor="length">Length: <span className="text-[#3f71b7] text-shadow font-semibold">{form.length}</span></label>
                  <input type="range" name="length" id="length" value={form.length} onChange={updateForm} className="bg-white appearance-none md:w-[16rem] w-auto h-[0.5rem] items-center rounded focus:outline-none focus:border-none md:ml-0 ml-6" min="4" max="64" />
                </div>
              </div>
              <div className='flex md:justify-between md:flex-row flex-col bg-[#12151a] px-8 py-2 rounded mb-2'>
                <div className="flex md:text-xl text-lg items-center">
                  <input type="checkbox" name="capital" id="capital" checked={form.capital} onChange={updateForm} className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
                  <label className="py-4 font-medium ml-2 hover:cursor-pointer" htmlFor="capital">Uppercase</label>
                </div>
                <div className="flex md:text-xl text-lg items-center">
                  <input type="checkbox" name="lowercase" id="lowercase" checked={form.lowercase} onChange={updateForm} className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
                  <label className="py-4 font-medium ml-2 hover:cursor-pointer" htmlFor="lowercase">Lowercase</label>
                </div>
                <div className="flex md:text-xl text-lg items-center">
                  <input type="checkbox" name="numbers" id="numbers" checked={form.numbers} onChange={updateForm} className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
                  <label className="py-4 font-medium ml-2 hover:cursor-pointer" htmlFor="numbers">Numbers</label>
                </div>
                <div className="flex md:text-xl text-lg items-center">
                  <input type="checkbox" name="symbols" id="symbols" checked={form.symbols} onChange={updateForm} className="w-5 h-5 text-[#3f71b7] bg-[#424244] rounded border-none focus:ring-0 focus:ring-offset-0 hover:cursor-pointer" />
                  <label className="py-4 font-medium ml-2 hover:cursor-pointer" htmlFor="symbols">Symbols</label>
                </div>
              </div>
              <div className="block mt-6">
                <div className='md:text-left text-center'>
                  <button type="submit" disabled={!(form.capital || form.lowercase || form.numbers || form.symbols)} className="text-xl text-white border-2 border-[#3f71b7] rounded-full px-6 py-2 hover:bg-[#3f71b7] duration-150 ease-in text-shadow font-medium disabled:opacity-[50%] disabled:cursor-default disabled:bg-none submit-button">Generate
                  </button>
                </div>
                <div className='border border-[#3f71b7] rounded-lg mt-6 p-4'>
                  <div className="md:mt-0 md:flex md:justify-between md:items-center">
                    <p className="md:break-normal break-all text-white md:text-xl font-medium text-shadow md:mb-0 mb-4">{password}</p>
                    <a className='px-6 py-2 border-2 border-[#3f71b7] rounded-lg hover:bg-[#3f71b7] text-shadow hover:cursor-pointer duration-150 text-xl' onClick={() => { navigator.clipboard.writeText(password); onCopy(); }}>{copy ? "Copied" : "Copy"}</a>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <footer className='bg-[#161a21]'>
        <div className="container px-6 lg:px-24 mx-auto font-custom tracking-wide font-medium">
          <div className="xl:flex xl:justify-between block text-center py-4">
            <h4 className='text-lg text-shadow font-light'>Designed by <a href="https://freepik.com/" className="font-medium underline hover:text-gray-300 duration-150">Freepik</a></h4>
            <h4 className='text-lg text-shadow font-light'>&copy; Securepass 2022</h4>
            <h4 className='text-lg font-light'>Created by <a href="https://www.dortwess.com/" className="font-medium underline hover:text-gray-300 duration-150">Petr Dortwess</a></h4>
          </div>
        </div>
      </footer>
    </>
  );
};
