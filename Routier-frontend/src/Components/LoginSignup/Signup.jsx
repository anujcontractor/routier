import styles from "./Signup.module.css";
import {Link } from "react-router-dom";
import tour_set from "../Assets/tour-set-signup.svg";
import logo from "../Assets/logo_signup.svg";
import { useState } from "react";
import fb from "../Assets/fb.png";
import googlebutton from "../Assets/google.png";
// import { jwtDecode } from 'jwt-decode';
 
const Signup = () => {
  const [user, setUser] = useState({});

  //facebook login setup
  const responseFacebook = (response) => {                           //success
    
  }
  const handleLoginFailure = (error) => {                            //failure
    console.log(error)
  }

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
