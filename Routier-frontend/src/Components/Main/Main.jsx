// Style sheet
import styles from "./Main.module.css";
import "../../App.css";

// Images
import logo from "../Assets/main/logo_main.svg";
import bg from "../Assets/main/bg_main.png";
import search from "../Assets/main/search_main.svg";
import review from "../Assets/main/reviews_main.svg";
import alert from "../Assets/main/alerts_main.svg";
import trip from "../Assets/main/trips_main.svg";
import hotel from "../Assets/main/hotels_main.svg";
import thing from "../Assets/main/things_main.svg";
import restaurant from "../Assets/main/restaurants_main.svg";
import story from "../Assets/main/stories_main.svg";
import service1 from "../Assets/main/service1_main.png";
import service2 from "../Assets/main/service2_main.png";
import service3 from "../Assets/main/service3_main.png";
import close from '../Assets/close.svg'
import toggle from '../Assets/toggle_btn.svg'
import menu_white from '../Assets/menu_white.svg'

// Dependencies
import { Link, useNavigate } from 'react-router-dom';
import React, { useContext, useEffect, useState } from 'react'
import Footer from "./Footer";


const Main = (props) => {

  let navigate = useNavigate();


  useEffect(() => {

    if (localStorage.getItem('token'))
      navigate('/home')
  }, [navigate]);



  const handleSubmit = (e) => {

    e.preventDefault();
    props.createNotification('warning', 'Login required')


  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };

  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };


  return (

    <>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      {/* Navbar */}
      <nav className={styles.navbar}>
        <div className={styles.logoCont}>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <div className={styles.navlinksCont}>
          <Link to='profile' className={styles.reviews} onClick={() => props.createNotification('warning', 'Login required')}>
            <img src={review} className={styles.icons} />
            Reviews
          </Link>
          {/* <Link className={styles.alerts} onClick={() => props.createNotification('warning', 'Login required')}>
            <img src={alert} className={styles.icons} />
            Alerts
          </Link> */}
          <Link to='/profile' className={styles.trips} onClick={() => props.createNotification('warning', 'Login required')}>
            <img src={trip} className={styles.icons} />
            Favorites
          </Link>
          <Link to="/login" className={styles.signin}>
            Login
          </Link>

        </div>

        <div className={styles.menuIcon}>
          <span onClick={handleMenuClick} className="material-symbols-outlined">
             {isMenuOpen ? null : <img src={menu_white} alt="Toggle" />}
          </span>
        </div>

        {isMenuOpen && (  <div className={styles.navlinksCont2} id="navlinksCont2">
          <div className={styles.closeIcon}>
            <span
              onClick={handleCloseClick}
              className="material-symbols-outlined"
            >
               <img src={close} alt="" />
            </span>
          </div>
          <Link to='/profile' className={styles.reviews} onClick={() => props.createNotification('warning', 'Login required')}>
            <img src={review} className={styles.icons} alt="reviews" />
            Reviews
          </Link>
          {/* <Link className={styles.alerts} onClick={() => props.createNotification('warning', 'Login required')}>
            <img src={alert} className={styles.icons} alt="alerts" />
            Alerts
          </Link> */}
          <Link to='/profile' className={styles.trips} onClick={() => props.createNotification('warning', 'Login required')}>
            <img src={trip} className={styles.icons} alt="trips" />
            Favorites
          </Link>
          <Link to="/login" className={styles.signin} >
            Login
          </Link>
        </div>)}
      </nav>
      <div className={styles.bgCont}>
        <img src={bg} className={styles.bgImg} alt="background" />
        <div className={styles.text}>
          <p className={styles.text1}>Helping Others</p>
          <p className={styles.text2}>LIVE & TRAVEL</p>
          <p className={styles.text3}>Most trusted travel advise</p>
        </div>
      </div>
      {/* Search Box */}
      <div className={styles.searchCont}>
        <div className={styles.searchTitle}>Where to?</div>
        <form className={styles.searchBar}>
          <img src={search} className={styles.searchIcon} alt="search-icon" />
          <input type="text" placeholder="Search Places to go..." />
          <button type="submit" onClick={handleSubmit}>Search</button>
        </form>
        <div className={styles.searchBtns}>
          <button className={styles.searchBtn} onClick={() => props.createNotification('warning', 'Login required')}>
            Hotels
            <img src={hotel} className={styles.icons2} alt="hotels" />
          </button>
          <button className={styles.searchBtn} onClick={() => props.createNotification('warning', 'Login required')}>
            Things to do
            <img src={thing} className={styles.icons2} alt="things" />
          </button>
          <button className={styles.searchBtn} onClick={() => props.createNotification('warning', 'Login required')}>
            Restaurants
            <img src={restaurant} className={styles.icons2} alt="restaurants" />
          </button>
        </div>
      </div>
      {/* Services */}
      <div className={styles.servicesCont}>
        <p className={styles.text4}>
          TRAVEL WORLD, LIKE NEVER BEFORE WITH ROUTIER
        </p>
        <p className={styles.text5}>What we do?</p>
        <div className={styles.services}>
          <img src={service1} className={styles.service} />
          <img src={service2} className={styles.service} />
          <img src={service3} className={styles.service} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Main;
