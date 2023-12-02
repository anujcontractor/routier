import React, { useState } from 'react'
import styles from "./Signup.module.css";
import tour_set from "../Assets/tour-set-signup.png";
import logo from "../Assets/logo_signup.svg";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from '../../shared';

const Signup = (props) => {


  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials);
  }


  const checkConstraints = () => {

    const { name, password, cpassword } = credentials;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;

    if (cpassword != password) {
      props.createNotification('warning', 'Invalid credentials');
      return false;
    }

    if (name.length < 5) {
      props.createNotification('warning', 'Your name length must be at least 5');
      return false;
    }

    if (name.length > 30) {
      props.createNotification('warning', "Your name length can't be greater than 30");
      return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      props.createNotification('warning', 'Name should contain only alphabets and spaces');
      return false;
    }

    if (name.trim().length === 0) {

      props.createNotification('warning', 'Name cannot contain only spaces');
      return false;
    }
    
    if (password.length < 8) {
      props.createNotification('warning', 'Password must have at least 8 characters');
      return false;
    }

    if (password.length > 30) {
      props.createNotification('warning', "Password length can't be greater than 30");
      return false;
    }

    if (!passwordRegex.test(password)) {
      props.createNotification('warning', 'Password must have at least one capital-small letter, special character, number');
      return false;
    }

    return true;

  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (!checkConstraints())
      return;
    // console.log(name, email, password);
    props.setProgress(20);
    const response = await fetch(`${baseUrl}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });

    props.setProgress(70);
    // console.log(response.status);
    if (response.status === 201) {

      const signupdata = await response.json();
      localStorage.setItem('token', signupdata.token);
      console.log(signupdata);
      props.createNotification('success', 'Account created successfully')
      navigate('/home');
    } else if (response.status === 400) {
      props.createNotification('warning', 'Invalid User')
    } else {
      props.createNotification('warning', `Error: ${response.status} - ${response.statusText}`)
    }
    props.setProgress(100);
  }

  return (
    <>
      <div className={styles.mainCont}>
        <div className={styles.logoCont}>
          <img src={logo} alt="logo" className={styles.logo} />
          <img src={tour_set} alt="tourset" className={styles.tourset} />
        </div>
        <div className={styles.signupCont}>
          <form method="post" className={styles.signupForm} onSubmit={handleSubmit}>
            <div className={styles.header}>
              <div className={styles.text}>Create Account</div>
            </div>
            <div className={styles.inputs}>
              <div className={styles.input}>
                <label htmlFor="name" className="form-label"></label>
                <input type="text" placeholder="Full Name" id="name" name="name" onChange={onChange} required />
              </div>
              <div className={styles.input}>
                <label htmlFor="email" className="form-label"></label>
                <input type="email" placeholder="Email Address" id="email1" name="email" onChange={onChange} required />
              </div>
              <div className={styles.input}>
                <label htmlFor="password" className="form-label"></label>
                <input type="password" placeholder="Password" id="password" name="password" onChange={onChange} required />
              </div>
              <div className={styles.input}>
                <label htmlFor="cpassword" className="form-label"></label>
                <input type="password" placeholder="Repeat Password" id="cpassword" name="cpassword" onChange={onChange} required />
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
