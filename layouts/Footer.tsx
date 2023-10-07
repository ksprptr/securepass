import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <>
      <div className="max-w-screen-lg px-8 mx-auto text-zinc-50">
        <div className="flex md:flex-row flex-col md:justify-between justify-center items-center text-center py-4 text-lg">
          <h4>&copy; Securepass | 2022-2023</h4>
          <h4>
            Created by{" "}
            <Link
              href="https://kasparpetr.com/"
              target="_blank"
              className="font-medium hover:underline"
            >
              Petr Kašpar
            </Link>
          </h4>
        </div>
      </div>
    </>
  );
}
