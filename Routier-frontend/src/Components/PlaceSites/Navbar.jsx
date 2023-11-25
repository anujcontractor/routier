import React, { useState } from 'react'
import "./Navbar.css";
import { Link } from "react-router-dom";

import logo from "../Assets/nav_logo.svg";
import review from "../Assets/edit_icon.svg";
import alert from "../Assets/alert.svg";
import trip from "../Assets/fav_icon.svg";
import profile from "../Assets/profile.svg";
import toggle from '../Assets/toggle_btn.svg'

import review_toggle from "../Assets/main/reviews_main.svg";
import alert_toggle from "../Assets/main/alerts_main.svg";
import trip_toggle from "../Assets/main/trips_main.svg";

function Navbar() {

    const handleMenuClick = () => {
        document.getElementById("navlinksCont2").style.display = "flex";
    };
    const handleCloseClick = () => {
        document.getElementById("navlinksCont2").style.display = "none";

    };

    return (
        <>
            <nav className='navbar'>
                <div className='logoCont'>
                    <Link to='/'>
                        <img src={logo} className='logo' alt="logo" />
                    </Link>
                </div>
                <div className='navlinksCont'>
                    <Link className='reviews'>
                        <img src={review} className='icons' />
                        Reviews
                    </Link>
                    <Link className='alerts'>
                        <img src={alert} className='icons' />
                        Alerts
                    </Link>
                    <Link className='trips'>
                        <img src={trip} className='icons' />
                        Trips
                    </Link>
                    <Link to='/profile' className='profileCont'>
                        <img src={profile} className='profileIcon' />
                    </Link>
                </div>


                <div className='menuIcon'>
                    <span onClick={handleMenuClick} className="material-symbols-outlined">
                        <img src={toggle} alt="" />
                    </span>
                </div>


                <div className='navlinksCont2' id="navlinksCont2">
                    <div className='closeIcon'>
                        <span
                            onClick={handleCloseClick}
                            className="material-symbols-outlined"
                        >
                            close
                        </span>
                    </div>
                    <Link className='profileCont'>
                        <img src={profile} className='profileIcon' />
                    </Link>
                    <Link className='reviews'>
                        <img src={review_toggle} className='icons' alt="reviews" />
                        Reviews
                    </Link>
                    <Link className='alerts'>
                        <img src={alert_toggle} className='icons' alt="alerts" />
                        Alerts
                    </Link>
                    <Link className='trips'>
                        <img src={trip_toggle} className='icons' alt="trips" />
                        Trips
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
