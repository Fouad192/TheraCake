import classes from "./navbar.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import burgerIcon from "../public/burger.svg";
import { useEffect, useState } from "react";
import uuid from "react-uuid";
import Badge from "@mui/material/Badge";
function Navbar(props) {
  const { data: session } = useSession();
  let [authorized, setAuthorized] = useState();

  let [isNavOpen, showNav] = useState(false);
  useEffect(() => {
    if (session) {
      if (session.user.email === "anwarcitcm@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "theracakecairo@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "mohamedaymanmoudy1@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "esraa.mostafa6.em@gmail.com") {
        setAuthorized(true);
      } else if (session.user.email === "as6993507@gmail.com") {
        setAuthorized(true);
      } else {
        setAuthorized(false);
      }
    }
  });

  if (session) {
    return (
      <div className={classes.navbarContainer}>
        <div className={classes.halfCircle}></div>
        <Link href="/">TheraCake</Link>
        <div className={classes.navbar}>
          <ul>
            <li>
              <Link href="/menu">Menu</Link>
              {props.count ? (
                <Badge badgeContent={props.count} color="primary">
                  <Link href="/checkout">Checkout</Link>
                </Badge>
              ) : (
                <Link href="/checkout">Checkout</Link>
              )}

              <Link href="/history">History</Link>
              {authorized && (
                <Link href="/bf06617af457f5fe41b4a547b8b4cab4">
                  Admin Orders
                </Link>
              )}
              {authorized && (
                <Link href="/data">
                  Client Data
                </Link>
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
              {authorized && (
                <li>
                  <Link href="/bf06617af457f5fe41b4a547b8b4cab4">Admin</Link>
                </li>
              )}
              {authorized && (
                <li>
                  <Link href="/data">Client Data</Link>
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

              <Link href="/checkout">Checkout</Link>

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
              <hr/>
              <li>
                <Link href="/checkout">Checkout</Link>
              </li>
              <hr />

              <li>
                <button className={classes.signBtns} onClick={() => signIn()}>
                  Sign In
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
