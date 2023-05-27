import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Analytics } from "@vercel/analytics/react";
import { getSession } from "next-auth/react";
import { Toaster } from "react-hot-toast";
function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Toaster/>
      <Component {...pageProps} />

      {/* <Analytics /> */}
    </SessionProvider>
  );
}

export default MyApp;
