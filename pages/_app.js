import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import { Analytics } from "@vercel/analytics/react";
import { getSession } from "next-auth/react";

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Navbar />
      <Component {...pageProps} />
      <Analytics />
      <Footer />
    </SessionProvider>
  );
}

export default MyApp;
