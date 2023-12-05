import React, { useState } from 'react'
import "./Navbar.css";
import { Link } from "react-router-dom";

import logo from "../Assets/nav_logo.svg";
import review from "../Assets/edit_icon.svg";
import alert from "../Assets/alert.svg";
import trip from "../Assets/fav_icon.svg";
import profile from "../Assets/profile.svg";
import toggle from '../Assets/toggle_btn.svg'
import close from '../Assets/close.svg'
import review_toggle from "../Assets/main/reviews_main.svg";
import alert_toggle from "../Assets/main/alerts_main.svg";
import trip_toggle from "../Assets/main/trips_main.svg";

function Navbar() {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMenuClick = () => {
      setIsMenuOpen(true);
    };
  
    const handleCloseClick = () => {
      setIsMenuOpen(false);
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
                    <Link to='/profile' className='reviews'>
                        <img src={review} className='icons' />
                        Reviews
                    </Link>
                    {/* <Link className='alerts'>
                        <img src={alert} className='icons' />
                        Alerts
                    </Link> */}
                    <Link to='/profile' className='trips'>
                        <img src={trip} className='icons' />
                        Favorites
                    </Link>
                        
                    <Link to='/aboutus?info=aboutUs' className='trips'>
                        About us
                    </Link>
                    <Link to='/profile' className='profileCont'>
                        <img src={profile} className='profileIcon' />
                    </Link>
                </div>


                <div className='menuIcon'>
                    <span onClick={handleMenuClick} className="material-symbols-outlined">
                    {isMenuOpen ? null : <img src={toggle} alt="Toggle" />}
                    </span>
                </div>


                {isMenuOpen && (<div className='navlinksCont2' id="navlinksCont2">
                    <div className='closeIcon'>
                        <span
                            onClick={handleCloseClick}
                            className="material-symbols-outlined"
                        >
                            <img src={close} alt="" />
                        </span>
                    </div>
                    <Link to='/profile' className='profileCont'>
                        <img src={profile} className='profileIcon' />
                    </Link>
                    <Link to='/profile' className='reviews'>
                        <img src={review_toggle} className='icons' alt="reviews" />
                        Reviews
                    </Link>
                    {/* <Link className='alerts'>
                        <img src={alert_toggle} className='icons' alt="alerts" />
                        Alerts
                    </Link> */}
                    <Link to='/profile' className='trips'>
                        <img src={trip_toggle} className='icons' alt="trips" />
                        Favorites
                    </Link>
                </div>)}
            </nav>
        </>
    )
}

export default Navbar
