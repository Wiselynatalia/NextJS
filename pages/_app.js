import "../styles/globals.css";
import Layout from "../components/layout/Layout";

//Root component nextJS render
function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      {" "}
      <Component {...pageProps} />{" "}
    </Layout>
  );
}

export default MyApp;
