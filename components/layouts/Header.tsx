import Link from "next/link";
import Layout from "./Layout";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from "@/utils/hooks/useOnClickOutside";

/**
 * Component representing a header
 */
export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [navbar, setNavbar] = useState<boolean>(false);
  const [colorChange, setColorChange] = useState<boolean>(false);

  // Close navbar on click outside
  useOnClickOutside(navRef, () => setNavbar(false));

  // Change navbar color on scroll
  const changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  // Add event listener on mount
  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
  }, []);

  return (
    <header className={`bg-zinc-100 text-zinc-800 z-10 fixed w-full ${colorChange && "shadow-xl"}`}>
      <Layout>
        <div ref={navRef}>
          <div className="py-6 text-xl flex items-center justify-between z-30">
            <Link href="/" className="font-medium italic text-2xl hover:scale-105 duration-500 select-none">
              Securepass
            </Link>
            <ul className="md:flex hidden gap-x-8">
              <li>
                <Link href="/" className="hover:underline select-none">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/generate" className="hover:underline select-none">
                  Generate
                </Link>
              </li>
              <li>
                <Link href="/save" className="hover:underline select-none">
                  Save
                </Link>
              </li>
            </ul>
            <div className="md:hidden flex text-2xl">
              <FontAwesomeIcon icon={navbar ? faXmark : faBars} onClick={() => setNavbar(!navbar)} />
            </div>
          </div>
          <motion.div initial={{ height: 0 }} animate={{ height: navbar ? "auto" : 0 }} transition={{ duration: 0.5 }} className="flex-col gap-y-2 text-right text-xl bg-zinc-100 overflow-hidden">
            <ul>
              <li>
                <Link href="/" onClick={() => setNavbar(false)} className="hover:underline select-none">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/generate" onClick={() => setNavbar(false)} className="hover:underline select-none">
                  Generate
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/save" onClick={() => setNavbar(false)} className="hover:underline select-none">
                  Save
                </Link>
              </li>
            </ul>
          </motion.div>
        </div>
      </Layout>
    </header>
  );
}
