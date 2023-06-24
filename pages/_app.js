import "../styles/global.css";
import { useEffect } from "react";
import TagManager from "react-gtm-module";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-W2QVHK3" });
  }, []);
  return <Component {...pageProps} />;
}
