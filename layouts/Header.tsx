import Link from "next/link";
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  const [navbar, setNavbar] = useState<boolean>(false);

  return (
    <>
      <header className="bg-primary fixed w-full">
        <div className="max-w-screen-xl px-4 mx-auto flex justify-between items-center py-4 text-xl">
          <Link href="/" className="font-semibold bg-clip-text text-zinc-50">
            Securepass
          </Link>
          <ul className="gap-x-8 md:flex hidden">
            <li>
              <Link href="/generate" className="text-zinc-50 hover:underline">
                Generate
              </Link>
            </li>
            <li>
              <Link href="/algorithm" className="text-zinc-50 hover:underline">
                Algorithm
              </Link>
            </li>
          </ul>
          <button
            onClick={() => setNavbar(!navbar)}
            className="md:hidden flex text-zinc-50"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
        <div className={`${navbar ? "block" : "hidden"} text-center`}>
          <ul className="py-4 text-xl space-y-4">
            <li>
              <Link href="/generate" className="text-zinc-50">
                Generate
              </Link>
            </li>
            <li>
              <Link href="/algorithm" className="text-zinc-50">
                Algorithm
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
