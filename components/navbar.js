import classes from "./navbar.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import burgerIcon from '../public/burger.svg'
import { useEffect, useState } from "react";
import uuid from "react-uuid";

function Navbar() {
  const { data: session } = useSession();
  let [authorized, setAuthorized] = useState()
  let [isNavOpen, showNav] = useState(false)
  useEffect(() => {
     if (session) {
       if (session.user.email === "anwarcitcm@gmail.com") {
         setAuthorized(true);
       } else if (session.user.email === "theracakecairo@gmail.com") {
         setAuthorized(true);
       } else if (session.user.email === "mohamedaymanmoudy1@gmail.com") {
         setAuthorized(true);
       } else if(session.user.email === "as6993507@gmail.com") {
        setAuthorized(true)
       } else {
         setAuthorized(false);
       }
     }
  })
  if (session) {
    return (
      <div className={classes.navbarContainer}>
        <div className={classes.halfCircle}></div>
        <Link href="/">TheraCake</Link>
        <div className={classes.navbar}>
          <ul>
            <li>
              <Link href="/menu">Menu</Link>
              <Link href="/checkout">Checkout</Link>
              <Link href="/history">History</Link>
              {authorized && (
                <Link href="/adminorders">Admin Orders</Link>
              )}
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
        </div>
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
                <Link href="/checkout">Checkout</Link>
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
      </div>
    );
  } else {
    return (
      <div className={classes.navbarContainer}>
        <div className={classes.halfCircle}></div>
        <Link href="/">TheraCake</Link>

        <div className={classes.navbar}>
          <ul>
            <li>
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <button className={classes.signBtns} onClick={() => signIn()}>
                Sign In
              </button>
            </li>
          </ul>
        </div>
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
                >Sign In</button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
