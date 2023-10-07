import "aos/dist/aos.css";
import "../styles/styles.css";
import Head from "next/head";
import AOS from "aos";
import { useEffect } from "react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <>
      <Head>
        <title>Securepass</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
