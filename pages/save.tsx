import React from "react";
import Password from "@/components/Password";
import { motion } from "framer-motion";
import { useSavedPasswords } from "@/context/SavedPasswords";

export default function Save() {
  const { savedPasswords } = useSavedPasswords();

  return (
    <main className={`max-w-screen-xl ${savedPasswords.length === 0 ? "h-screen" : "md:h-screen  md:py-0 py-48"} flex flex-col justify-center px-4 mx-auto text-zinc-50`}>
      <motion.h1 initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="md:text-6xl text-4xl font-medium text-zinc-800 md:text-left text-center">
        Saved passwords
      </motion.h1>
      <div className="flex md:flex-row flex-col mt-8 gap-8 flex-wrap">
        {savedPasswords.length > 0 ? (
          <>
            {savedPasswords.map((password, i) => (
              <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: (i + 1) * 0.25 }} key={i}>
                <Password name={password.name} password={password.password} />
              </motion.div>
            ))}
          </>
        ) : (
          <motion.p initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-zinc-800 md:text-xl text-lg md:text-left text-center">
            No saved passwords.
          </motion.p>
        )}
      </div>
    </main>
  );
}
