import React, { useState } from 'react'
import styles from "./Signup.module.css";
import tour_set from "../Assets/tour-set-signup.png";
import logo from "../Assets/logo_signup.svg";
import { Link, useNavigate } from "react-router-dom";

const Signup = (props) => {


  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
    // console.log(credentials);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = credentials;
    console.log(name, email, password);

    const response = await fetch(`https://routier-production.up.railway.app/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password })
    });


    console.log(response);
    if (response.status === 201) {

      const json = await response.json();
      localStorage.setItem('token', json.authtoken);
      navigate('/home');
      props.showAlert("Account created successfully", "success");
      console.log("Account created successfully")

    } else if (response.status === 400) {
      
      props.showAlert(`Invalid User`, "danger");
      console.log("Invalid User");

    } else {
      props.showAlert(`Error: ${response.status} - ${response.statusText}`, "danger");
      console.log(`Error: ${response.status} - ${response.statusText}`);
    }
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
                <input type="text" placeholder="Full Name" id="name" name="name" onChange={onChange} />
              </div>
              <div className={styles.input}>
                <label htmlFor="email" className="form-label"></label>
                <input type="email" placeholder="Email Address" id="email" name="email" onChange={onChange} />
              </div>
              <div className={styles.input}>
                <label htmlFor="password" className="form-label"></label>
                <input type="password" placeholder="Password" id="password" name="password" onChange={onChange} />
              </div>
              <div className={styles.input}>
                <label htmlFor="cpassword" className="form-label"></label>
                <input type="password" placeholder="Repeat Password" id="cpassword" name="cpassword" onChange={onChange} />
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
