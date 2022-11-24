import classes from "./navbar.module.css";
import Link from "next/link";
function Navbar() {
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
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar