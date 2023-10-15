import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Algorithm() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-screen-xl px-4 mx-auto"
      >
        <div className="flex flex-col justify-center py-32">
          <Image
            src="/algorithm.png"
            width={1500}
            height={200}
            alt="Algorithm"
          />
        </div>
      </motion.div>
    </>
  );
}
