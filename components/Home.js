import Image from "next/image";
import homeImg from "../public/Homeimg.png";
import classes from "./home.module.css";
import Link from "next/link";
import Navbar from "./navbar";
import Footer from "./footer";
function Home() {
  return (
    <>
      <section className={classes.homeSection}>
        <div className={classes.homeDetails}>
          <h1>TheraCake</h1>

          <p>
            We care for our cheesecake to serve it with best ingredients,
            delight ways and beautiful backing
          </p>

          <Link href="/menu" className={classes.menuButton}>
            Our Menu
          </Link>
        </div>
        <div className={classes.homeImage}>
          <Image src={homeImg} />
        </div>
      </section>
    </>
  );
}

export default Home;
