import styles from "./Login.module.css";
import tour_set from "../Assets/tour_set_login.svg";
import logo from "../Assets/logo_login.svg";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from 'react'
import { baseUrl } from "../../shared";

const Login = (props) => {

  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });


  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(credentials.email, credentials.password)
    if(credentials.password.length<8)
    {
      props.createNotification('warning', 'password length must be at least 8');
      return;
    }
    props.setProgress(20);
    const response = await fetch(`${baseUrl}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    props.setProgress(70);
    // console.log(response.status);
    
    if (response.ok) {
      const loginData = await response.json();
      localStorage.setItem('token', loginData.token);
      // console.log(loginData.token);
      props.createNotification('success', 'Logged in successfully')
      navigate('/home');
      // console.log(json);

    } else if (response.status === 401 ) {
      props.createNotification('warning', `Unauthorized: Please check your credentials.`)
      // console.log("Unauthorized: Please check your credentials.");
    } else {
      props.createNotification('warning', `Error: ${response.status} - ${response.statusText}`)
      // console.log(`Error: ${response.status} - ${response.statusText}`);
    }
    props.setProgress(100);
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
                <input type="email" placeholder="Email Address" id="email1" name='email' value={credentials?.email} onChange={onChange} aria-describedby="emailHelp" required />
              </div>
              <div className={styles.input}>
                <label htmlFor="password" className="form-label" required></label>
                <input type="password" placeholder="Password" id="password" name='password' value={credentials?.password} onChange={onChange} />
              </div>
            </div>

           <div></div>
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
