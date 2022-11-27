import classes from "./navbar.module.css";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function Navbar() {
  const { data: session } = useSession();
  if (session) {
    return (
      <div className={classes.navbarContainer}>
        <div className={classes.halfCircle}></div>
        <h1>TheraCake</h1>
        <div className={classes.navbar}>
          <ul>
            <li>
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <Link href="/checkout">Checkout</Link>
              <button onClick={() => signOut()}>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.navbarContainer}>
        <div className={classes.halfCircle}></div>
        <h1>TheraCake</h1>
        <div className={classes.navbar}>
          <ul>
            <li>
              <Link href="/">Home</Link>
              <Link href="/menu">Menu</Link>
              <button onClick={() => signIn()}>Sign In</button>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Navbar;
