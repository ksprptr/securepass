import Footer from "@/layouts/Footer";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <div className="bg-[#161a21] min-h-screen">
          <Main />
          <NextScript />
          <Footer />
        </div>
      </body>
    </Html>
  );
}
