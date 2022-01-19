import Header from "../components/header";
import Head from "next/head";
import "../App.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Resale Heaven</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <div className="header" />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
