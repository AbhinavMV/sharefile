import "tailwindcss/tailwind.css";

import connectDatabase from "../lib/database";
connectDatabase();

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
