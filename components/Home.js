import Image from "next/image";
import homeImg from "../public/Homeimg.png";
import classes from "./home.module.css";
import Link from "next/link";
import joyImg from "../public/final.jpg";
import Footer from "./footer";
import burgerIcon from "../public/burger.svg";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect } from "react";
function Home() {
  const { data: session } = useSession();
  let [isAuthorized, setAuthorized] = useState();
  let [isNavOpen, showNav] = useState(false);
  let router = useRouter()
  useEffect(() => {
    if (session) {
      if (session.user.email === "anwarcitcm@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "theracakecairo@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "mohamedaymanmoudy1@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "as6993507@gmail.com") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    }
  });
  return (
    <>
      <section className={classes.homeSection}>
        <div className={classes.navbarContainer}>
          <h1>TheraCake</h1>
          {!session ? (
            <>
              <ul>
                <li>
                  <Link href="/menu">Menu</Link>
                </li>

                {isAuthorized ? (
                  <li>
                    <Link href="/adminorders">Admin Orders</Link>
                  </li>
                ) : null}
                <li>
                  <button onClick={() => signIn()}>Login</button>
                </li>
              </ul>
              <div className={classes.burgerNavbar}>
                <Image
                  src={burgerIcon}
                  alt="burgerIcon"
                  width={24}
                  height={24}
                  onClick={() => showNav(!isNavOpen)}
                />
                {isNavOpen && (
                  <ul>
                    <li>
                      <Link href="/menu">Menu</Link>
                    </li>
                    <hr />

                    <li>
                      <button
                        className={classes.signBtns}
                        onClick={() => signIn()}
                      >
                        Login
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <>
              <ul>
                <li>
                  <Link href="/menu">Menu</Link>
                </li>

                {isAuthorized ? (
                  <li>
                    <Link href="/adminorders">Admin</Link>
                  </li>
                ) : null}

                <li>
                  <Link href="/history">History</Link>
                </li>
                <li>
                  <Link href="/checkout">Checkout</Link>
                </li>
                <li>
                  <button
                    onClick={() =>
                      signOut({ callbackUrl: `${window.location.origin}` })
                    }
                  >
                    Logout
                  </button>
                </li>
              </ul>
              <div className={classes.burgerNavbar}>
                <Image
                  src={burgerIcon}
                  alt="burgerIcon"
                  width={24}
                  height={24}
                  onClick={() => showNav(!isNavOpen)}
                />
                {isNavOpen && (
                  <ul>
                    <li>
                      <Link href="/menu">Menu</Link>
                    </li>
                    <hr />
                    <li>
                      <button onClick={() => router.push("/checkout")}>
                        Checkout
                      </button>
                    </li>

                    <hr />

                    <li>
                      <Link href="/history">History</Link>
                    </li>
                    <hr />
                    {session.user.email === "anwarcitcm@gmail.com" && (
                      <li>
                        <Link href="/adminorders">Admin</Link>
                      </li>
                    )}

                    <hr />
                    <li>
                      <button
                        className={classes.signBtns}
                        onClick={() =>
                          signOut({ callbackUrl: `${window.location.origin}` })
                        }
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
        <Image src={joyImg} alt="homeImage" id={classes.homeImage} />
        <div className={classes.homeDetails}>
          <h1>TheraCake</h1>
          <p>
            This dessert is made with great love, <br /> extreme dedication and
            the best quality
          </p>

          <button onClick={() => router.push("/menu")}>Order Now</button>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Home;
