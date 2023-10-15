import React from "react";
import Link from "next/link";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Securepass | 404</title>
      </Head>
      <div className="text-zinc-50 font-medium text-xl flex flex-col justify-center items-center min-h-screen">
        <h3>404 | Page not found</h3>
        <Link
          href="/"
          className="text-base text-zinc-50 border-2 border-[#3f71b7] rounded-lg px-4 py-2 hover:bg-[#3f71b7] duration-150 font-medium select-none mt-6"
        >
          Return to homepage
        </Link>
      </div>
    </>
  );
}
