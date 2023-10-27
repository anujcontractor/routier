import styles from "./Login.module.css";
import tour_set from "../Assets/tour_set_login.svg";
import logo from "../Assets/logo_login.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const Login = () => {
  return (
    <>
      <div className={styles.mainCont}>
        <div className={styles.loginCont}>
          <form method="post" className={styles.loginForm}>
            <div className={styles.header}>
              <div className={styles.text}>Login</div>
              <p className={styles.normaltext}>Enter your Account Details</p>
            </div>

            <div className={styles.inputs}>
              <div className={styles.input}>
                <input type="email" placeholder="Email Address" />
              </div>
              <div className={styles.input}>
                <input type="password" placeholder="Password" />
              </div>
            </div>

            <a href="/">Forget Password?</a>
            <button className={styles.loginSubmit} type="submit">
              Login
            </button>
          </form>

          <p className={styles.normaltext} id={styles.signupAcc}>
            Don't have an account?{" "}
            <Link to="/signup" className={styles.signup}>
              Sign Up
            </Link>
          </p>
        </div>

        <div className={styles.logoCont}>
          <div>
            <img src={logo} alt="" />
            <h3 className={styles.text}>Sign in to unlock</h3>
            <p className={styles.titletext}>best of Routier</p>
          </div>
          <img src={tour_set} alt="" className={styles.tourSet} />
        </div>

        {/* for mobile view */}
        <div className={styles.shortlogoCont}>
          <div>
            <img src={logo} alt="" />
            <h3 className={styles.text}>Login to experience the</h3>
            <p className={styles.titletext}>best of Routier</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
