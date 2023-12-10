import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Head>
      <body>
        <div className="bg-zinc-50">
          <Main />
          <NextScript />
        </div>
      </body>
    </Html>
  );
}
