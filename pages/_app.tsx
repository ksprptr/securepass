import "../styles/styles.css";
import Head from "next/head";
import Header from "@/layouts/Header";
import { useRouter } from "next/router";
import type { AppProps } from "next/app";
import { config } from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  const Router = useRouter();
  const isErrorPath = Router.pathname.startsWith("/404");

  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      {!isErrorPath && <Header />}
      <Component {...pageProps} />
    </>
  );
}
