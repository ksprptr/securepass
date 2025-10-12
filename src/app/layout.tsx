import type { Metadata } from "next";
import { PropsWithChildren } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: "Create Next App",
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
