import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-zinc-50 text-zinc-800">
      <div className="max-w-screen-xl mx-auto px-4 flex md:flex-row flex-col md:justify-between justify-center md:text-xl text-lg py-6 text-center">
        <h1>&copy; Securepass 2022 - {new Date().getFullYear()}</h1>
        <h2>
          Created by{" "}
          <Link href="https://kasparpetr.com" target="_blank" className="text-blue-600 hover:underline select-none">
            Petr Kaspar
          </Link>
        </h2>
      </div>
    </footer>
  );
}
