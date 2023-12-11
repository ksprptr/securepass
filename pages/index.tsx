import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Generator() {
  return (
    <main>
      <motion.section initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gradient-to-r from-blue-600 to-blue-500">
        <div className="max-w-screen-xl mx-auto px-4 md:pt-72 md:py-0 pt-56 py-24">
          <h1 className="md:text-8xl sm:text-6xl text-4xl font-bold bg-clip-text text-transparent from-zinc-50 to-zinc-400 bg-gradient-to-r py-4">Securepass</h1>
          <h2 className="text-zinc-100 md:text-2xl text-lg italic md:mt-4">Adjustable password generator</h2>
          <button onClick={() => document.getElementById("how-does-it-works")?.scrollIntoView()} className="btn mt-4 rounded-full">
            More...
          </button>
        </div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fafafa" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,266.7C1120,288,1280,288,1360,288L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </motion.section>
      <motion.section id="how-does-it-works" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="md:py-32 py-16 max-w-screen-xl mx-auto px-4">
        <h1 className="md:text-5xl text-2xl font-medium text-zinc-800">How does it work?</h1>
        <p className="md:text-2xl text-lg text-zinc-500 mt-4 md:w-2/3">
          Securepass allows you to generate a password of a certain length with the option of using capital letters, lowercase letters, numbers and symbols.
          <br />
          <br />
          It uses custom algorithm that guranteen you there will be no repeating letters following each other.
        </p>
      </motion.section>
      <motion.section id="generate" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="md:py-32 py-16 max-w-screen-xl mx-auto px-4 text-right">
        <h1 className="md:text-5xl text-2xl font-medium text-zinc-800">Want to generate password?</h1>
        <p className="md:text-2xl text-lg text-zinc-500 mt-4 md:w-2/3 ml-auto">{"Generate a password by clicking the button below. It'll redirect you to the page where you can choose the parameters of the password."}</p>
        <div className="mt-8">
          <Link href="/generate" className="btn-primary md:text-xl text-lg">
            Generate
          </Link>
        </div>
      </motion.section>
      <motion.section id="save" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="md:py-32 py-16 max-w-screen-xl mx-auto px-4">
        <h1 className="md:text-5xl text-2xl font-medium text-zinc-800">Need to save password? No problem!</h1>
        <p className="md:text-2xl text-lg text-zinc-500 mt-4 md:w-2/3">{"You can save as many passwords as you want."}</p>
        <div className="mt-8">
          <Link href="/save" className="btn-primary md:text-xl text-lg">
            Save password
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
