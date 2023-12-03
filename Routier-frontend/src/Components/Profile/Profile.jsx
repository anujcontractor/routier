// Style sheet
import styles from "./Profile.module.css";

// Images
import avatar from "../Assets/profile/avatar_profile.png";
import logo from "../Assets/profile/logo_profile.svg";
import profileHome from "../Assets/home/profile_home.svg";
import { baseUrl } from "../../shared";

// Dependencies
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import DisplayRating from "./DisplayRating";

const Profile = (props) => {
  let navigate = useNavigate();
  const [user, setUser] = useState();
  const [userReviews, setUserReviews] = useState([]);
  const [userFavs, setUserFavs] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      // console.log("auth-token");
      const fetchUserProfile = async () => {
        const res = await fetch(`${baseUrl}/api/users/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUser(data.user);
        setUserReviews(data.user.reviews);
      };
      fetchUserProfile();
      const fetchFavs = async () => {
        const res = await fetch(`${baseUrl}/api/favourites`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const data = await res.json();
        setUserFavs(data.favoriteDetails);
      };
      fetchFavs();
    } else {
      // console.log("login-required");
      props.createNotification("warning", "Login required");
      navigate("/");
    }
  }, [navigate]);

  const handleMenuClick = () => {
    document.getElementById("navlinksCont2").style.display = "flex";
  };
  const handleCloseClick = () => {
    document.getElementById("navlinksCont2").style.display = "none";
  };

  const removeFromFav = async (itemId, itemType, user) => {
    const userFavs2 = userFavs.filter((Fav) => {
      return Fav.itemDetails._id != itemId;
    });
    setUserFavs(userFavs2);
    const req = await fetch(`${baseUrl}/api/favourites/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      user: user,
      body: JSON.stringify({
        itemId: itemId,
        itemType: itemType,
      }),
    });
  };
  const mapLocationType = (type) => {
    switch (type) {
      case "stay":
        return "hotels";
      case "todo":
        return "todos";
      case "restaurant":
        return "restaurants";
      default:
        return "place"; // Default value
    }
  };
  const getTrips = () => {
    document.getElementById("reviewCont").style.display = "none";
    document.getElementById("favCont").style.display = "none";
    document.getElementById("tripsCont").style.display = "flex";
    document.getElementById("reviews").style.backgroundColor = "#fff";
    document.getElementById("fav").style.backgroundColor = "#fff";
    document.getElementById("trips").style.backgroundColor = "#d9d9d9";
  };
  const getReviews = () => {
    document.getElementById("reviewCont").style.display = "flex";
    document.getElementById("favCont").style.display = "none";
    document.getElementById("tripsCont").style.display = "none";
    document.getElementById("reviews").style.backgroundColor = "#d9d9d9";
    document.getElementById("fav").style.backgroundColor = "#fff";
    document.getElementById("trips").style.backgroundColor = "#fff";
  };
  const getFav = () => {
    document.getElementById("reviewCont").style.display = "none";
    document.getElementById("favCont").style.display = "flex";
    document.getElementById("tripsCont").style.display = "none";
    document.getElementById("reviews").style.backgroundColor = "#fff";
    document.getElementById("fav").style.backgroundColor = "#d9d9d9";
    document.getElementById("trips").style.backgroundColor = "#fff";
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
        <Link to="/home">
          <div className={styles.logoCont}>
            <img src={logo} className={styles.logo} alt="logo" />
          </div>
        </Link>
        <div className={styles.navlinksCont}>
          <Link to="/home" className={styles.alerts}>
            Home
          </Link>
          <Link to="/aboutus" className={styles.trips}>
            About Us
          </Link>
          <Link to="/profile" className={styles.profileIconCont}>
            <img
              src={profileHome}
              className={styles.profileIcon}
              alt="profile-icon"
            />
          </Link>
        </div>
        <div className={styles.menuIcon}>
          <span onClick={handleMenuClick} className="material-symbols-outlined">
            menu
          </span>
        </div>

        <div className={styles.navlinksCont2} id="navlinksCont2">
          <div className={styles.closeIcon}>
            <span
              onClick={handleCloseClick}
              className="material-symbols-outlined"
            >
              close
            </span>
          </div>
          <Link to="/profile" className={styles.profileIconCont}>
            <img
              src={profileHome}
              className={styles.profileIcon}
              alt="profile-icon"
            />
          </Link>
          <Link to="/home" className={styles.alerts}>
            Home
          </Link>
          <Link to="/aboutus" className={styles.trips}>
            About Us
          </Link>
        </div>
      </nav>
      <main className={styles.mainCont}>
        {/* Personal info */}
        <div className={styles.personalCont}>
          <img src={avatar} className={styles.avatar} alt="avatar" />
          <p className={styles.nametxt}>{user ? user.name : "name"}</p>
          <p className={styles.emailtxt}>
            {user ? user.email : "abc@gmail.com"}
          </p>
          <button
            className={`${styles.options} ${styles.tripsOption}`}
            id="trips"
            onClick={getTrips}
          >
            Trips
          </button>
          <button className={styles.options} id="reviews" onClick={getReviews}>
            Reviews
          </button>
          <button className={styles.options} id="fav" onClick={getFav}>
            Favorites
          </button>
        </div>
        {/* Trips */}
        <div
          className={`${styles.profileCont} ${styles.tripsCont}`}
          id="tripsCont"
        >
          <div className={styles.tripsTitle}>
            <p className={styles.profileTitle}>Places</p>
            <p className={styles.profileTitle}>Experience</p>
          </div>
          <div className={styles.expCont} id="expCont">
            {userReviews.map((Review) => {
              return (
                <Link
                  to={`/${mapLocationType(Review.placeType)}/siteinfo/${
                    Review.location
                  }`}
                  className={styles.expBox}
                >
                  <p className={styles.expTitle}>{Review.title}</p>
                  <div>
                    <DisplayRating rate={Review.starRating} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
        {/* Reviews */}
        <div
          className={`${styles.profileCont} ${styles.reviewCont}`}
          id="reviewCont"
        >
          <div className={styles.tripsTitle}>
            <p className={styles.profileTitle}>Reviews</p>
          </div>
          <div className={styles.expCont}>
            {userReviews.map((Review) => {
              return (
                <div className={styles.favBox}>
                  <Link
                    to={`/${mapLocationType(Review.placeType)}/siteinfo/${
                      Review.location
                    }`}
                    className={`${styles.favcontent} ${styles.reviewcontent}`}
                  >
                    <div className={styles.reviewHead}>
                      <div className={styles.favRating}>
                        <DisplayRating rate={Review.starRating} />
                      </div>
                      <p className={styles.reviewDate}>
                        Reviewed on: {Review.visitDate.split("T")[0]}
                      </p>
                    </div>
                    <p className={styles.reviewTitle}>{Review.title}</p>
                    <p className={styles.reviewDesc}>{Review.reviewText}</p>
                  </Link>
                  <div className={styles.imgBox}>
                    <img
                      src={Review.photos[0]}
                      className={styles.favImg}
                      alt="review-image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Favorites */}
        <div className={`${styles.profileCont} ${styles.favCont}`} id="favCont">
          <div className={styles.tripsTitle}>
            <p className={styles.profileTitle}>Favorites</p>
          </div>
          <div className={styles.expCont}>
            {userFavs.map((Fav) => {
              return (
                <div className={styles.favBox}>
                  <div className={styles.imgBox}>
                    <img
                      src={Fav.itemDetails.image[0]}
                      className={styles.favImg}
                      alt="favorite-image"
                    />
                  </div>
                  <div className={styles.favcontent}>
                    <div className={styles.favHead}>
                      <Link
                        to={`/${mapLocationType(
                          Fav.itemDetails.itemtype
                        )}/siteinfo/${Fav.itemDetails._id}`}
                        className={styles.favTitle}
                      >
                        {Fav.itemDetails.name}
                      </Link>
                      <button
                        className={styles.removeFav}
                        onClick={() =>
                          removeFromFav(Fav.itemDetails._id, Fav.itemtype, user)
                        }
                      >
                        Remove from Favorite
                      </button>
                    </div>
                    <div className={styles.favRating}>
                      <DisplayRating rate={Fav.itemDetails.rating} />
                    </div>
                    <p className={styles.favDesc}>
                      {Fav.itemDetails.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
