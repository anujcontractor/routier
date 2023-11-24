import Dropdown from './Dropdown';
import './Dropdown.css';
import { Textinput1, Textinput2, Textinput3 } from './textinput';
import {Rating} from "react-simple-star-rating";
import IMG from "../Assets/reviewplaceholder.jpg";
import IMG2 from "../Assets/addphotoicon.png";
import  "./Review.css";
import { useState } from 'react';
import {useParams , Link , useLocation} from 'react-router-dom';
import styles from '../Profile/Profile.module.css';
import logo from "../Assets/profile/logo_profile.svg";
import profileHome from "../Assets/home/profile_home.svg";

const colors = {
  Starcolor: "#f29d38",
  grey: "#a9a9a9"
};




function Review(props) {

  const { id } = useParams();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const locationtype = params.get("type");

  const placeName = params.get('placeName');
  const placeImage = params.get('placeImage');
  /* object containing all review data */
  const [reviewData, setReviewData] = useState({
    placeType: locationtype,
    location: id,
    starRating: 0,
    visitDate: '',
    visitedWith: [],
    title: '',
    reviewText: '',
    photos: [],
  });

  /* for uploading data*/
  const handleSubmit = async () => {
    try {
      console.log(reviewData);

      const response = await fetch( "https://routier-production.up.railway.app/reviews/submit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem(`token`),
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Review submitted successfully:', responseData);
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };


  /*for handling rating section*/
  const [ratingText, setRatingText] = useState('');

  const handleRating = (rate) => {
    setReviewData((prevData) => ({
      ...prevData,
      starRating: rate,
    }));

    setRatingText(getRatingText(rate));
  }

  const getRatingText = (rating) => {
    switch (rating) {
      case 1:
        return 'Poor';
      case 2:
        return 'Fair';
      case 3:
        return 'Average';
      case 4:
        return 'Good';
      case 5:
        return 'Excellent';
      default:
        return '';
    }
  };

  /* for handling date change */
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    const selectedDate = event.target.value;
    setSelectedDate(selectedDate);
    setReviewData((prevData) => ({
      ...prevData,
      visitDate: selectedDate,
    }));
  };

  /* for handling visited with */ 
  const [visitedWith, setVisitedWith] = useState([]);

  const handleVisitedWithChange = (value) => {
    setVisitedWith(value);

    setReviewData((prevData) => ({
      ...prevData,
      visitedWith: value,
    }));
  };


  /* for handling review title */
  const handleTitleChange = (value) => {

    setReviewData((prevData) => ({
      ...prevData,
      title: value,
    }));

    console.log( value);
  };

  /* for handling review text */
  const [reviewText, setReviewText] = useState('');
  const handleReviewTextChange = (value) => {
    setReviewText(value);

    setReviewData((prevData) => ({
      ...prevData,
      reviewText: value,
    }));
  };

  /* for handling photo upload section */
  const handlePhotosChange = (event) => {
    const selectedPhotos = event.target.files;
    setReviewData((prevData) => ({
      ...prevData,
      photos: Array.from(selectedPhotos).map((photo) => URL.createObjectURL(photo)),
    }));

    console.log(reviewData.photos);
  };


  /* for navbar */
  const handleMenuClick = () => {
    document.getElementById("navlinksCont2").style.display = "flex";
  };
  const handleCloseClick = () => {
    document.getElementById("navlinksCont2").style.display = "none";
  };

  return (
    <div>

      {/* Navbar */}
      <nav className="reviewheader">
        <div className={styles.logoCont}>
          <img src={logo} className={styles.logo} alt="logo" />
        </div>
        <div className={styles.navlinksCont}>
          <Link to="/home" className={styles.alerts}>
            Home
          </Link>
          <Link to="/aboutus" className={styles.trips}>
            About Us
          </Link>
          <Link to="/profile" className={styles.profileIconCont}>
            <img src={profileHome} className={styles.profileIcon} />
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
            <img src={profileHome} className={styles.profileIcon} />
          </Link>
          <Link to="/home" className={styles.alerts}>
            Home
          </Link>
          <Link to="/aboutus" className={styles.trips}>
            About Us
          </Link>
        </div>
      </nav>

      <div className='maintitle'>
        Tell us, how's your visit?
      </div>
       
      <div className='texts'>How would you rate this place?
        <div >          
              <Rating
                className='rating'
                SVGstyle={ { 'display':'inline' } }
                onClick={handleRating}/>
                
              <div className='rating_text'>
                {ratingText} 
              </div>          
        </div>
      </div>

      <div>
        <img src={placeImage} alt='' className='image1 '/>
      </div>


      <div className="texts" >When did you go?
            <input
              type="date"
              id="datePicker"
              className='dropdown'
              onChange={handleDateChange}
            ></input>
      </div>

        <div className='texts'>Whom did you go with?
              
          <div>
              <Textinput1  onVisitedWithChange={handleVisitedWithChange} />
          </div>
          </div>

        <div className='location_display '>
          <h1 >{placeName}</h1>
          <h2 >Location</h2>
        </div>

        <div className='texts'>Title a Review
        <div >
            <Textinput2 onTitleChange={handleTitleChange}  />
        </div></div>

        <div className='texts'>Write a review
        <div>
            <Textinput3 onReviewTextChange={handleReviewTextChange}  />    
        </div>
        </div>

        <div className='texts'>Add some photos
        <label className='photoupload ' >
          <div className='photouploadstyle'>
            <img src={IMG2} alt='' className='imageclass' /> 
            <p> Click to add photos </p>
            <input 
              id="image" 
              type="file" 
              name="image"  
              style={{display: 'none'}} 
              width={874} 
              height={192}
              multiple
              onChange={handlePhotosChange}
              />
          </div>
        </label> 

        <div className='button_container '>
          <button className='submitbutton' onClick={handleSubmit}>
            <span className='buttontext'> Submit Review </span> 
          </button>
        </div>
        </div> 

    </div>
    
        

  );
}


const styles1 ={

  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",  
  },

  stars: {
    display: "flex",
    flexDirection: "row",

  }


}

export default Review;
