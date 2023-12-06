// Style sheet
import styles2 from "./FooterSmall.module.css";

// Images
import tourists from "../Assets/main/tourists.png";
import logoimg from "../Assets/main/logo.png";
import footerlogo from "../Assets/main/footerlogo.png";
import fb from "../Assets/main/fb.png";
import x from "../Assets/main/x.png";
import yt from "../Assets/main/yt.png";
import insta from "../Assets/main/insta.png";
import newsletterpic from "../Assets/main/newsletterpic.png";
import git from "../Assets/main/git.png";

import { Link , useNavigate} from "react-router-dom";

const FooterSmall = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    window.scrollTo(0, 0); // Scroll to the top
    navigate.push('/aboutus'); // Navigate to the About Us page
  };

  const handleGitlink = () => {
    window.location.href = 'https://github.com/anujcontractor/routier';
  };

  return (
    <>
      <div className={styles2.footer}>
        {/* <div className={styles2.newsletter}>
          <img src={newsletterpic} alt="newsletter"></img>
        </div> */}

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
              <Link onClick={handleAboutUsClick} className={styles2.footernormaltext} to="/aboutus">What is Routier?</Link>
              <Link onClick={handleAboutUsClick} className={styles2.footernormaltext} to="/aboutus">Our Team</Link>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default FooterSmall;
