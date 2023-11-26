import Dropdown from './Dropdown';
import './Dropdown.css';
import { Textinput1, Textinput2, Textinput3 } from './textinput';
import {Rating} from "react-simple-star-rating";
import IMG from "../Assets/reviewplaceholder.jpg";
import IMG2 from "../Assets/addphotoicon.png";
import  "./Review.css";
import { useState , useEffect } from 'react';
import {useParams , Link , useLocation , useNavigate} from 'react-router-dom';
import styles from '../Profile/Profile.module.css';
import logo from "../Assets/profile/logo_profile.svg";
import profileHome from "../Assets/home/profile_home.svg";
import { baseUrl } from '../../shared';

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
  const navigate = useNavigate();
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [photosuploaded, setphotosuploaded] = useState(false);
  const [upploaderror , setuploaderror] = useState("try again later.");

  /* object containing all review data */
  const [reviewData, setReviewData] = useState({
    placeType: "place",
    location: id,
    starRating: 0,
    visitDate: '',
    visitedWith: [],
    title: '',
    reviewText: '',
    photos: [],
  });

  useEffect(() => {
    console.log("Updated reviewData:", reviewData);
  }, [reviewData]);

  /* for uploading data*/
  const handleSubmit = async () => {
    try {

      /* checking if stars are given or not */
      if (reviewData.starRating === 0) {
        setuploaderror("please, give rating to place.");
        setSubmissionStatus('error');
        return;
      }
  
      // Check if date is selected
      if (!reviewData.visitDate) {
        setuploaderror("kindly, provide the date you visited this place.");
        setSubmissionStatus('error');
        return;
      }
  
      // Check if review title is provided
      if (!reviewData.title.trim()) {
        setuploaderror("kindly, enter title to this review.");
        setSubmissionStatus('error');
        return;
      }

      //check if visited with is empty
      if (!reviewData.title.trim()) {
        setuploaderror("kindly, enter visited with to this review.");
        setSubmissionStatus('error');
        return;
      }     

      const mapLocationType = (type) => {
        switch (type) {
          case 'hotels':
            return 'stay';
          case 'todos':
            return 'todo';
          case 'restaurants':
            return 'restaurant'; 

          default:
            return 'place'; // Default value
        } 
      };

      const mappedPlaceType = mapLocationType(locationtype);
      setReviewData((prevData) => ({
        ...prevData,
        placeType: mappedPlaceType,
      }));

      console.log(reviewData);
      console.log(`Bearer ${localStorage.getItem(`token`)}`);

      const response = await fetch( `${baseUrl}/reviews/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const responseData = await response.json();
      console.log('Review submitted successfully:', responseData);
      setSubmissionStatus('success');
    } catch (error) {
      console.error('Error submitting review:', error.message);
      setSubmissionStatus('error');
      setuploaderror("kindly, try again later");
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
      photos: [
        ...prevData.photos,
        ...Array.from(selectedPhotos).map((photo) => URL.createObjectURL(photo)),
      ],
    }));
    setphotosuploaded(reviewData.photos.length + selectedPhotos.length > 0);
  };

  const handleDeletePhoto = (index) => {
    setReviewData((prevData) => {
      const newPhotos = [...prevData.photos];
      newPhotos.splice(index, 1);
  
      // Check if the updated photos array is empty
      setphotosuploaded(reviewData.photos.length - 1 > 0);
  
      return {
        ...prevData,
        photos: newPhotos,
      };
    });
  };

  /* for navbar */
  const handleMenuClick = () => {
    document.getElementById("navlinksCont2").style.display = "flex";
  };
  const handleCloseClick = () => {
    document.getElementById("navlinksCont2").style.display = "none";
  };

  /* for handling submit response */
  useEffect(() => {
    if (submissionStatus === 'success' || submissionStatus === 'error') {
    }
  }, [submissionStatus]);

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
       
      <div className='mainblock'>
          
          <div className='formbox'> 
          <div className='texts'>How would you rate this place?
            <div className='ratingblock' >          
                  <Rating
                    className='rating'
                    SVGstyle={ { 'display':'inline' } }
                    onClick={handleRating}/>
                    
                  <div className='rating_text'>
                    {ratingText} 
                  </div>          
            </div>
          </div>

          <div className="texts" >When did you go?
                <input
                  type="date"
                  id="datePicker"
                  className='dropdown'
                  onChange={handleDateChange}
                ></input>
          </div>

            <div className="texts">Whom did you go with?
              <div>
                  <Textinput1  onVisitedWithChange={handleVisitedWithChange} />
              </div>
            </div>

          
            <div  className='reviewblockediting'>Title a Review
            <div >
                <Textinput2 onTitleChange={handleTitleChange}  />
            </div></div>

            <div className='texts'>Write a review
            <div>
                <Textinput3 onReviewTextChange={handleReviewTextChange}  />    
            </div>
            </div>

            <div className='texts'>Add some photos
            <label className='photoupload'>
              <div className='photouploadstyle'>
                <input
                  id="image"
                  type="file"
                  name="image"
                  style={{ display: 'none' }}
                  width={874}
                  height={192}
                  multiple
                  onChange={handlePhotosChange}
                />

                {!photosuploaded ? (
                  <>
                    <img src={IMG2} alt='' className='imageclass' />
                    <p> Click to add photos </p>
                  </>
                ) : (
                  <div className="uploadedphotos">
                  {reviewData.photos.map((photo, index) => (
                    <div key={index} className='uploaded-photo-container'>
                      <img src={photo} alt={`Uploaded Photo ${index}`} className='uploaded-photo' />
                      <button onClick={() => handleDeletePhoto(index)} className='delete-photo-button'>
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
                )}
              </div>
            </label>



            <div className='button_container '>
              <button className='submitbutton' onClick={handleSubmit}>
                  <span className='buttontext'> Submit Review </span>
              </button>
              <div>
                {submissionStatus === 'success' && 
                (
                  <div>
                    <p>Review submitted successfully.</p>
                    <Link className='gohomebutton' to="/">Go Home</Link>
                  </div>
                  )}
                {submissionStatus === 'error' && (
                  <div>
                    <p>Error Submitting.</p>
                    <p>{upploaderror}</p>
                    <Link className='gohomebutton' to="/">Go Home</Link>
                  </div>
                  )}
              </div>
      </div>

            </div> 
            </div>

            <div className='image_block'>
            <div>
              <img src={placeImage} alt='' className='image1'/>
            </div>

            <div className='location_display '>
              <h1 >{placeName}</h1>
              <h2 >Location</h2>
            </div>
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
