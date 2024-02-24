import Link from "next/link";
import React from "react";
import Layout from "./Layout";

/**
 * Component representing footer
 */
export default function Footer() {
  return (
    <footer className="bg-zinc-100">
      <Layout>
        <div className="flex md:flex-row flex-col md:justify-between justify-center md:text-xl text-lg py-6 text-center">
          <span>&copy; Securepass {new Date().getFullYear()}</span>
          <span>
            Created by{" "}
            <Link href="https://kasparpetr.com" target="_blank" className="text-blue-600 hover:underline select-none">
              Petr Kaspar
            </Link>
          </span>
        </div>
      </Layout>
    </footer>
  );
}
