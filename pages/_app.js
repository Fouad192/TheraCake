import "../styles/globals.css";
import {SessionProvider} from 'next-auth/react'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session}>
      <Navbar/>
      <Component {...pageProps} />
      <Footer/>
    </SessionProvider>
  );
}

export default MyApp;
