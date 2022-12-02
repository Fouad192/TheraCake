import Image from "next/image";
import homeImg from "../public/Homeimg.png";
import classes from "./home.module.css";
import Link from "next/link";

function Home() {
  return (
    <>
      <section className={classes.homeSection}>
        <div className={classes.homeDetails}>
          <h1>TheraCake</h1>

          <p>
           This dessert is made with great love, extreme dedication and the best quality
          </p>

          <Link href="/menu" className={classes.menuButton}>
            Our Menu
          </Link>
        </div>
        <div className={classes.homeImage}>
          <Image src={homeImg} alt="homeImage" />
        </div>
      </section>
    </>
  );
}

export default Home;
