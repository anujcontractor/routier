import styles from "./Signup.module.css";
import tour_set from "../Assets/tour-set-signup.svg";
import logo from "../Assets/logo_signup.svg";
import {Link} from "react-router-dom";

const Signup = () => {
  return (
    <>
      <div className={styles.mainCont}>
        <div className={styles.logoCont}>
          <img src={logo} alt="logo" className={styles.logo} />
          <img src={tour_set} alt="tourset" className={styles.tourset} />
        </div>
        <div className={styles.signupCont}>
          <form method="post" className={styles.signupForm}>
            <div className={styles.header}>
              <div className={styles.text}>Create Account</div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <input type="text" placeholder="Full Name" />
              </div>
              <div className={styles.input}>
                <input type="email" placeholder="Email Address" />
              </div>
              <div className={styles.input}>
                <input type="password" placeholder="Password" />
              </div>
              <div className={styles.input}>
                <input type="password" placeholder="Repeat Password" />
              </div>
            </div>
            <button className={styles.signupSubmit} type="submit">
              Create Account
            </button>
          </form>
          <div className={styles.alreadyAcc} id="alreadyAcc">
            Already have account?{" "}
            <Link to="/login" className={styles.login}>
              Log in
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
