import classes from './footer.module.css'
import Image from 'next/image';
import facebookIcon from "../public/icon/facebook.png";
import callIcon from "../public/icon/call_24px.png";
import instagramIcon from "../public/icon/instagram.png";
import emailIcon from "../public/icon/email_24px.png";
import tiktokIcon from '../public/icon/tiktok.png'
function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.contactContainer}>
        <h1>Contact Details</h1>
        <div className={classes.iconTextFlex}>
          <Image src={instagramIcon} alt="instagram" />
          <p>@theracakecairo</p>
        </div>
        <div className={classes.iconTextFlex}>
          <Image src={facebookIcon} alt="facebook" />
          <p>@theracakecairo</p>
        </div>
        {/* <div className={classes.iconTextFlex}>
          <Image src={emailIcon} alt="emailIcon" />
          <p>@theracakecairo</p>
        </div> */}
        <div className={classes.iconTextFlex}>
          <Image src={tiktokIcon} alt="tiktokIcon" />
          <p>@theracakecairo</p>
        </div>
        <div className={classes.iconTextFlex}>
          <Image src={callIcon} alt="callIcon" />
          <p>01029283671</p>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
