import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Generator() {
  return (
    <>
      <motion.main
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-xl px-4 mx-auto text-zinc-50 min-h-screen flex items-center"
      >
        <div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent from-zinc-50 to-zinc-400 bg-gradient-to-r py-4">
            Securepass
          </h1>
          <h2 className="text-zinc-100 text-lg">
            Password generator based on custom algorithm
          </h2>
          <Link
            href="/generate"
            className="text-zinc-50 border-2 border-primary rounded-lg px-4 py-2 hover:bg-primary duration-150 font-medium disabled:opacity-50 disabled:hover:bg-transparent select-none inline-block mt-8"
          >
            Generate
          </Link>
        </div>
      </motion.main>
    </>
  );
}
