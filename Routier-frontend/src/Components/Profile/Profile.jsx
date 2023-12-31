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

        if (res.status == 404) {
          console.log("user not found");
        } else {
          console.log("Internal server error");
        }
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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(true);
  };
  const handleCloseClick = () => {
    setIsMenuOpen(false);
  };

  const removeFromFav = async (itemId, itemType, user) => {
    const userFavs2 = userFavs.filter((Fav) => {
      return Fav.itemDetails._id != itemId;
    });
    setUserFavs(userFavs2);

    props.setProgress(30);
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

    if (req.ok) {
      props.createNotification("success", `Favorite removed successfully`);
    } else if (req.status == 404) {
      props.createNotification(
        "warning",
        `Site not found in favourites. Status: ${req.status}`
      );
    } else {
      props.createNotification(
        "warning",
        `Internal server error. Status: ${req.status}`
      );
    }

    props.setProgress(100);
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

  const reviewCont = document.getElementById("reviewCont");
  const favCont = document.getElementById("favCont");
  const tripsCont = document.getElementById("tripsCont");
  const reviewBtn = document.getElementById("reviews");
  const favBtn = document.getElementById("fav");
  const tripsBtn = document.getElementById("trips");

  const handleToggle = (isReview, isFav, isTrip) => {
    reviewCont && (reviewCont.style.display = isReview ? "flex" : "none");
    favCont && (favCont.style.display = isFav ? "flex" : "none");
    tripsCont && (tripsCont.style.display = isTrip ? "flex" : "none");
    reviewBtn &&
      (reviewBtn.style.backgroundColor = isReview ? "#046b82" : "#fff");
    favBtn && (favBtn.style.backgroundColor = isFav ? "#046b82" : "#fff");
    tripsBtn && (tripsBtn.style.backgroundColor = isTrip ? "#046b82" : "#fff");
    reviewBtn && (reviewBtn.style.color = isReview ? "#fff" : "#046b82");
    favBtn && (favBtn.style.color = isFav ? "#fff" : "#046b82");
    tripsBtn && (tripsBtn.style.color = isTrip ? "#fff" : "#046b82");
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
          <Link to="/aboutus?info=aboutUs" className={styles.trips}>
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

        {isMenuOpen && (
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
        )}
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
            onClick={() => handleToggle(false, false, true)}
          >
            Trips
          </button>
          <button
            className={styles.options}
            id="reviews"
            onClick={() => handleToggle(true, false, false)}
          >
            Reviews
          </button>
          <button
            className={styles.options}
            id="fav"
            onClick={() => handleToggle(false, true, false)}
          >
            Favourites
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
          <div
            className={`${styles.expCont} ${
              userReviews[0] == null ? styles.emptyMsg : null
            }`}
          >
            {userReviews.length == 0 ? (
              <p className={styles.profileTitle}>No Trips yet...</p>
            ) : (
              userReviews.map((Review) => {
                return (
                  <Link
                    to={`/${mapLocationType(Review.placeType)}/siteinfo/${
                      Review.location
                    }`}
                    className={styles.expBox}
                  >
                    <p className={styles.expTitle}>{Review.placeName}</p>
                    <div>
                      <DisplayRating rate={Review.starRating} />
                    </div>
                  </Link>
                );
              })
            )}
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
          <div
            className={`${styles.expCont} ${
              userReviews[0] == null ? styles.emptyMsg : null
            }`}
          >
            {userReviews.length == 0 ? (
              <p className={`${styles.profileTitle} ${styles.emptyMsg}`}>
                No Reviews yet...
              </p>
            ) : (
              userReviews.map((Review) => {
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
              })
            )}
          </div>
        </div>
        {/* Favourites */}
        <div className={`${styles.profileCont} ${styles.favCont}`} id="favCont">
          <div className={styles.tripsTitle}>
            <p className={styles.profileTitle}>Favourites</p>
          </div>
          <div
            className={`${styles.expCont} ${
              userFavs[0] == null ? styles.emptyMsg : null
            }`}
          >
            {userFavs.length == 0 ? (
              <p className={styles.profileTitle}>No Favourites yet...</p>
            ) : (
              userFavs.map((Fav) => {
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
                          to={`/${mapLocationType(Fav.itemtype)}/siteinfo/${
                            Fav.itemDetails._id
                          }`}
                          className={styles.favTitle}
                        >
                          {Fav.itemDetails.name}
                        </Link>
                        <button
                          className={styles.removeFav}
                          onClick={() =>
                            removeFromFav(
                              Fav.itemDetails._id,
                              Fav.itemtype,
                              user
                            )
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
              })
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
