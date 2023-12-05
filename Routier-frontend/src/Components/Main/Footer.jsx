// Style sheet
import styles2 from "./Footer.module.css";

// Images
import tourists from "../Assets/main/tourists.png";
import logoimg from "../Assets/main/logo.png";
import footerlogo from "../Assets/main/footerlogo.png";
import git from "../Assets/main/git.png";
import newsletterpic from "../Assets/main/newsletterpic.png";
import { Link , useNavigate} from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleGitlink = () => {
    window.location.href = 'https://github.com/anujcontractor/routier';
  };

  return (
    <>
      <div className={styles2.container}>
        <div className={styles2.leftpart}>
          <img src={logoimg} alt="logo" className={styles2.logo}></img>
          <div className={styles2.text6}>Want to know about,Routier?</div>
          <Link className={styles2.pillbutton} to="/aboutus?info=aboutUs">
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
            <div className={styles2.footerroutier}>
              <div>Routier</div>
              <div className={styles2.icons}>
                <img  className={styles2.iconpic} src={git} alt="git" onClick={handleGitlink}></img>
              </div>
            </div>
          </div>

          <div className={styles2.footertextblockcover}>
            <div className={styles2.footertextblock}>
              <div className={styles2.footertexttitle}>About us</div>
              <Link
                className={styles2.footernormaltext}
                to="/aboutus?info=aboutUs"
              >
                What is Routier?
              </Link>
              <Link
                className={styles2.footernormaltext}
                to="/aboutus?info=ourTeam"
              >
                Our Team
              </Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
