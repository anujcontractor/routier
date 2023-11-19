import styles from "./Login.module.css";
import tour_set from "../Assets/tour_set_login.svg";
import logo from "../Assets/logo_login.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'

const Login = (props) => {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials.email, credentials.password)
    const response = await fetch(`https://routier-production.up.railway.app/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    console.log(response.status);
    if (response.status === 401) {
      
      props.showAlert(`Unauthorized: Please check your credentials.`, "danger");
      console.log("Unauthorized: Please check your credentials.");

    } else if (response.ok) {
      const json = await response.json();
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged in successfully", "success");
      navigate('/home');
      console.log(json);

    } else {
      props.showAlert(`Error: ${response.status} - ${response.statusText}`, "danger");
      console.log(`Error: ${response.status} - ${response.statusText}`);
    }
  }

  return (
    <>
      <div className={styles.mainCont}>
        <div className={styles.loginCont}>
          <form method="post" className={styles.loginForm} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <div className={styles.text}>Login</div>
              <p className={styles.normaltext}>Enter your Account Details</p>
            </div>

            <div className={styles.inputs}>
              <div className={styles.input}>
                <label htmlFor="email" className="form-label"></label>
                <input type="email" placeholder="Email Address" id="email" name='email' value={credentials?.email} onChange={onChange} aria-describedby="emailHelp" required />
              </div>
              <div className={styles.input}>
                <label htmlFor="password" className="form-label" required></label>
                <input type="password" placeholder="Password" id="password" name='password' value={credentials?.password} onChange={onChange} />
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
