import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { SWRConfig } from "swr";
import axios from "axios";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => axios.get(url).then((res) => res.data),
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

export default MyApp;
