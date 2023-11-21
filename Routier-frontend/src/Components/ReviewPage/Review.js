import Dropdown from './Dropdown';
import './Dropdown.css';
import { Textinput1, Textinput2, Textinput3 } from './textinput';
import {Rating} from "react-simple-star-rating";
import IMG from "../Assets/reviewplaceholder.jpg";
import IMG2 from "../Assets/addphotoicon.png";
import  "./Review.css";
import { useState } from 'react';

const colors = {
  Starcolor: "#f29d38",
  grey: "#a9a9a9"
};




function Review(props) {

  const id = '65587ece7a0f4855933365ab';
  const [place , setPlace] = useState();

  const getdetails = async () => {

    const response = await fetch(`https://routier-production.up.railway.app/api/placeinfo/:${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2NTU5ZDE4NzljN2Q5MjdhZDhiYjBmMGMiLCJpYXQiOjE3MDA0MTk2NjMsImV4cCI6MTcwMzAxMTY2M30.sMJH7suISpBrXEmyQOgQq8JKLOu23NRFsbNPa0aJBm0"
        },
    });

    const json = await response.json();
    // console.log(json);
    setPlace(json);
    //response
    //placeid, Image array, place_name, place_description
}

  /* object containing all review data */
  const [reviewData, setReviewData] = useState({
    placeType:"opa restraunt" ,
    location: 'dubai',
    starRating: 0,
    visitDate: '',
    visitedWith: [],
    title: '',
    reviewText: '',
    photos: [],
  });

  /* for uploading data*/
  const handleSubmit = async () => {

    console.log("this is token " + localStorage.getItem('token'));
    try {
      const response = await fetch( "https://routier-production.up.railway.app/reviews/submit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "auth-token" : localStorage.getItem(`token`),
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

  return (
    <div>

      <div className='maintitle'>
        Tell us, how's your visit?
      </div>
       
        <div style={styles1.texts} className='title2'>How would you rate this place?</div>
        <div >          
              <Rating
                className='rating'
                SVGstyle={ { 'display':'inline' } }
                onClick={handleRating}/>
                
              <div className='rating_text'>
                {ratingText} 
              </div>          
        </div>


        <div>
          <img src={IMG} alt='' className='image1 '/>
        </div>


        <div style={styles1.texts} className='title3'>When did you go?</div>
        <div className='main_dropdown '>
          <div className='dropdown'>
            <div>
            <input
              type="date"
              id="datePicker"
              onClick={handleDateChange}
            />
          </div>
          </div>
        </div>

        <div style={styles1.texts} className='title4'>Whom did you go with?</div>
              
          <div className='main_text1  '>
              <Textinput1  onVisitedWithChange={handleVisitedWithChange} />
          </div>

        <div className='location_display '>
          <h1 >Opa Restaurant</h1>
          <h2 >Location</h2>
        </div>

        <div style={styles1.texts} className='title5 '>Title a Review</div>
        <div className='main_text2 ]' >
            <Textinput2 onTitleChange={handleTitleChange}  />
        </div>

        <div style={styles1.texts} className='title6 '>Write a review</div>
        <div className='main_text3 '>
            <Textinput3 onReviewTextChange={handleReviewTextChange}  />    
        </div>


        <div style={styles1.texts} className='title7  '>Add some photos</div>
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
    
        

  );
}


const styles1 ={

  texts: {
    display: "flex",
    flexDirection: "column",
    color: "#74B6C2",
    fontSize: "2rem",
    lineHeight: "2.28rem",
    paddingRight: "7.75rem",
    paddingLeft: "8rem",
    fontFamliy: "Poppins",
    fontWeight: "600",
  },



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
