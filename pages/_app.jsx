import "@/styles/global.css";

require("../mocks");

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
