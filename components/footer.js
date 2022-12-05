import classes from "./footer.module.css";
import Image from "next/image";
import facebookIcon from "../public/icon/facebook.png";
import callIcon from "../public/icon/call_24px.png";
import instagramIcon from "../public/icon/instagram.png";
import emailIcon from "../public/icon/email_24px.png";
import tiktokIcon from "../public/icon/tiktok.png";
import Link from "next/link";
function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.contactContainer}>
        <h1>Contact Details</h1>
        <div className={classes.iconTextFlex}>
          <Image src={instagramIcon} alt="instagram" />
          <p>
            <Link
              target="_blank"
              href="https://www.instagram.com/theracakecairo/"
            >
              @Theracakecairo
            </Link>
          </p>
        </div>
        <div className={classes.iconTextFlex}>
          <Image src={facebookIcon} alt="facebook" />
          <p>
            <Link
              target="_blank"
              href="https://www.facebook.com/theracakecairo/"
            >
              @Theracakecairo
            </Link>
          </p>
        </div>
        {/* <div className={classes.iconTextFlex}>
          <Image src={emailIcon} alt="emailIcon" />
          <p>@theracakecairo</p>
        </div> */}
        <div className={classes.iconTextFlex}>
          <Image src={tiktokIcon} alt="tiktokIcon" />
          <p>
            <Link
              target="_blank"
              href="https://www.tiktok.com/@theracakecairo?_t=8WdMJhUGmxx&_r=1"
            >
              @Theracakecairo
            </Link>
          </p>
        </div>
        <div className={classes.iconTextFlex}>
          <Image src={callIcon} alt="callIcon" />
          <p>
            <Link target="_blank" href="https://wa.me/message/I6QCQJVLIWL7L1">
              01029283671
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
