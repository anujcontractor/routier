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
import { Link , useNavigate} from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    window.scrollTo(0, 0); // Scroll to the top
    navigate.push('/aboutus'); // Navigate to the About Us page
  };

  return (
    <>
      <div className={styles2.container}>
        <div className={styles2.leftpart}>
          <img src={logoimg} alt="logo" className={styles2.logo}></img>
          <div className={styles2.text6}>Want to know about,Routier?</div>
          <Link className={styles2.pillbutton} to="/aboutus">
            About us
          </Link>
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
              <Link onClick={handleAboutUsClick} className={styles2.footernormaltext} to="/aboutus">What is Routier?</Link>
              <Link onClick={handleAboutUsClick} className={styles2.footernormaltext} to="/aboutus">Our Team</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
