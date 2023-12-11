import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function Custom500() {
  return (
    <div className="bg-zinc-50">
      <div className="px-4 flex h-screen justify-center items-center">
        <div className="text-center font-medium text-lg text-zinc-800">
          <Image src="/favicon.ico" alt="Logo" width={30} height={30} className="mx-auto" />
          <h1 className="my-8">500 | Internal Server Error</h1>
          <Link href="/" className="btn-primary text-base">
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}
