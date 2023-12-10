import "../styles/styles.css";
import SEO from "../next-seo.config";
import Header from "@/layouts/Header";
import Footer from "@/layouts/Footer";
import { DefaultSeo } from "next-seo";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...SEO} />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
