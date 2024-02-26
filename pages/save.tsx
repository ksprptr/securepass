import React from "react";
import Layout from "@/components/layouts/Layout";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import SavedPassword from "@/components/SavedPassword";
import { motion } from "framer-motion";
import { useSavedPasswords } from "@/context/SavedPasswords";

/**
 * Component representing a saved passwords page
 */
export default function Save() {
  const { savedPasswords } = useSavedPasswords();

  return (
    <Layout>
      <div className={`${savedPasswords.length === 0 ? "h-screen" : "md:h-screen  md:py-0 py-48"} flex flex-col justify-center`}>
        <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Heading size="2" className="md:text-left text-center text-zinc-800">
            Saved passwords
          </Heading>
        </motion.div>
        <div className="flex md:flex-row flex-col gap-8 flex-wrap mt-8">
          {savedPasswords.length > 0 ? (
            <>
              {savedPasswords.map((password, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: (i + 1) * 0.25 }}>
                  <SavedPassword name={password.name} password={password.password} />
                </motion.div>
              ))}
            </>
          ) : (
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
              <Paragraph className="md:text-left text-center !mt-0">{"We couldn't find any saved passwords. Generate a password and save it to view it here."}</Paragraph>
            </motion.div>
          )}
        </div>
      </div>
    </Layout>
  );
}
