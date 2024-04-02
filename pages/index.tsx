import Image from "next/image";
import React from "react";
import Button from "@/components/common/Button";
import Layout from "@/components/layouts/Layout";
import Heading from "@/components/common/Heading";
import Paragraph from "@/components/common/Paragraph";
import LinkButton from "@/components/common/LinkButton";
import StrongSecure from "@/public/assets/strong_secure.png";
import { motion } from "framer-motion";

/**
 * Component representing a home page
 */
export default function Home() {
  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-blue-500">
        <Layout>
          <div className="xl:flex xl:text-left text-center justify-between items-center md:pt-72 md:py-0 pt-56 py-24">
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <Heading size="1" className="text-zinc-50 py-4">
                Securepass
              </Heading>
              <Heading size="3" className="italic text-zinc-100 md:mt-4">
                Adjustable password generator
              </Heading>
              <Button rounded onClick={() => document.getElementById("how-does-it-work")?.scrollIntoView()} className="mt-4">
                Learn More
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }}>
              <Image src={StrongSecure} width={600} height={500} alt="Strong & Secure" className="xl:mt-0 mt-16 xl:mx-0 mx-auto select-none" />
            </motion.div>
          </div>
        </Layout>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#fafafa" fillOpacity="1" d="M0,224L80,213.3C160,203,320,181,480,192C640,203,800,245,960,266.7C1120,288,1280,288,1360,288L1440,288L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path>
        </svg>
      </section>
      <Layout>
        <motion.section id="how-does-it-work" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }} className="md:py-32 py-16">
          <Heading size="2" className="text-zinc-800">
            How does it work?
          </Heading>
          <Paragraph className="md:w-2/3">
            Securepass allows you to generate a password of a certain length with the option of using capital letters, lowercase letters, numbers and symbols.
            <br />
            <br />
            It uses custom algorithm that guranteen you there will be no repeating letters following each other.
          </Paragraph>
        </motion.section>
        <motion.section id="generate" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.75 }} className="md:py-32 py-16 text-right">
          <Heading size="2" className="text-zinc-800">
            Want to generate password?
          </Heading>
          <Paragraph className="md:w-2/3 ml-auto">{"Generate a password by clicking the button below. It'll redirect you to the page where you can choose the parameters of the password."}</Paragraph>
          <LinkButton href="/generate" variant="primary" className="mt-8 text-lg">
            Generate
          </LinkButton>
        </motion.section>
        <motion.section id="save" initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1 }} className="md:py-32 py-16 pb-32">
          <Heading size="2" className="text-zinc-800">
            Need to save password? No problem!
          </Heading>
          <Paragraph className="md:w-2/3">{"You can save as many generated passwords as you want."}</Paragraph>
          <LinkButton href="/save" variant="primary" className="mt-8 text-lg">
            Saved passwords
          </LinkButton>
        </motion.section>
      </Layout>
    </>
  );
}
