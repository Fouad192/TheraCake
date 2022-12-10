import Home from "../components/Home";
import Footer from "../components/footer";
import Navbar from "../components/navbar";
import Head from 'next/head'
function HomePage() {
  return (
    <>
      <Head>
        <title>Thera Cake</title>
        <meta
          name="description"
          content="This dessert made with great love,
extreme dedication and the best quality"
        />
      </Head>
      <Home />
    </>
  );
}

export default HomePage;
