import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useOnClickOutside } from "@/utils/hooks/useOnClickOutside";

export default function Header() {
  const navRef = useRef<HTMLDivElement | null>(null);
  const [navbar, setNavbar] = useState<boolean>(false);
  const [colorChange, setColorChange] = useState<boolean>(false);

  useOnClickOutside(navRef, () => setNavbar(false));

  const changeNavbarColor = () => {
    if (window.scrollY >= 1) {
      setColorChange(true);
    } else {
      setColorChange(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeNavbarColor);
  }, []);

  return (
    <nav className={`bg-zinc-100 z-10 fixed w-full text-zinc-800 ${colorChange && "shadow-xl"}`}>
      <div className="max-w-screen-xl mx-auto px-4 py-6 text-xl flex items-center justify-between z-30">
        <Link href="/" className="font-medium italic text-2xl hover:scale-105 duration-500 select-none">
          Securepass
        </Link>
        <ul className="md:flex hidden gap-x-8">
          <li>
            <Link href="/" className="nav-btn">
              Home
            </Link>
          </li>
          <li>
            <Link href="/generate" className="nav-btn">
              Generate
            </Link>
          </li>
          <li>
            <Link href="/save" className="nav-btn">
              Save
            </Link>
          </li>
        </ul>
        <div ref={navRef} className="md:hidden flex text-2xl">
          <FontAwesomeIcon icon={navbar ? faXmark : faBars} onClick={() => setNavbar(!navbar)} />
        </div>
      </div>
      <motion.ul initial={{ height: 0 }} animate={{ height: navbar ? "auto" : 0 }} transition={{ duration: 0.5 }} className="flex-col gap-y-2 text-right text-xl bg-zinc-100 overflow-hidden px-4">
        <li>
          <Link href="/" onClick={() => setNavbar(false)} className="nav-btn">
            Home
          </Link>
        </li>
        <li>
          <Link href="/generate" onClick={() => setNavbar(false)} className="nav-btn">
            Generate
          </Link>
        </li>
        <li className="mb-4">
          <Link href="/save" onClick={() => setNavbar(false)} className="nav-btn">
            Save
          </Link>
        </li>
      </motion.ul>
    </nav>
  );
}
