import Header from "../components/header";
import "../App.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <div className= "header"></div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
