import "../styles/globals.css";

//bootstrap 5
import "bootstrap/dist/css/bootstrap.css";

//Amplify Config
import { Amplify } from "aws-amplify";
import awsExports from "../src/aws-exports";

// components
import Layout from "../components/layout";

Amplify.configure({
  ...awsExports,
  ssr: true,
});

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
