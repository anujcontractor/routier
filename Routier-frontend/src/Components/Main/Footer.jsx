// Style sheet
import styles2 from "./Footer.module.css";

// Images
import tourists from "../Assets/main/tourists.png";
import logoimg from "../Assets/main/logo.png";
import footerlogo from "../Assets/main/footerlogo.png";
import fb from "../Assets/main/fb.png";
import x from "../Assets/main/x.png";
import yt from "../Assets/main/yt.png";
import insta from "../Assets/main/insta.png";
import newsletterpic from "../Assets/main/newsletterpic.png";

const Footer = () => {
  return (
    <>
      <div className={styles2.container}>
        <div className={styles2.leftpart}>
          <img src={logoimg} alt="logo" className={styles2.logo}></img>
          <div className={styles2.text6}>Want to know about,Routier?</div>
          <button className={styles2.pillbutton} onClick={""}>
            About us
          </button>
        </div>
        <div>
          <img src={tourists} alt="tourists" className={styles2.tourists}></img>
        </div>
      </div>

      <div className={styles2.footer}>
        <div className={styles2.newsletter}>
          <img src={newsletterpic} alt="newsletter"></img>
        </div>

        <div className={styles2.aboutus}>
          <div className={styles2.footerlogoblock}>
            <img
              src={footerlogo}
              alt="logo"
              className={styles2.footerlogopic}
            ></img>
            <div className={styles2.footerroutier}>Routier</div>
            <div className={styles2.icons}>
              <img src={fb} alt="fb"></img>
              <img src={x} alt="x"></img>
              <img src={yt} alt="yt"></img>
              <img src={insta} alt="insta"></img>
            </div>
          </div>

          <div className={styles2.footertextblockcover}>
            <div className={styles2.footertextblock}>
              <div className={styles2.footertexttitle}>About us</div>
              <div className={styles2.footernormaltext}>What is Routier?</div>
              <div className={styles2.footernormaltext}>How it works?</div>
            </div>

            <div className={styles2.footertextblock}>
              <div className={styles2.footertexttitle}>Travel Blogs</div>
              <div className={styles2.footernormaltext}>Bali Travel Guide</div>
              <div className={styles2.footernormaltext}>
                Sri Lanks Travel Guide
              </div>
              <div className={styles2.footernormaltext}>Peru Travel Guide</div>
            </div>

            <div className={styles2.footertextblock}>
              <div className={styles2.footertexttitle}>Contact us</div>
              <div className={styles2.footernormaltext}>Our Story</div>
              <div className={styles2.footernormaltext}>Work with us</div>
              <div className={styles2.footernormaltext}>
                Want to be Collaborator?
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
