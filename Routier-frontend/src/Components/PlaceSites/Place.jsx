import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import PhotoAlbum from "react-photo-album";
import PlaceContext from '../../Context/PlaceContext.jsx';
import FooterSmall from '../Main/FooterSmall.jsx';
import './Place.css';
import Slider from './Slider.jsx';
import hotel_icon from "../Assets/hotel_icon.svg"
import todo_icon from "../Assets/todo_icon.svg"
import restaurant_icon from "../Assets/restaurant_icon.svg"
import stories_ion from "../Assets/stories_icon.svg"
import place_img from "../Assets/place.png"
import Navbar from './Navbar.jsx';


function Place(props) {

  const context = useContext(PlaceContext);
  const { getPlaceById, place, prefferedRestaurant, prefferedStay, prefferedTodo } = context;
  const [sortedhotels, setSortedhotels] = useState([]);
  const [sortedrestaurants, setSortedrestaurants] = useState([]);
  const [sortedtodos, setSortedtodos] = useState([]);
  const { placeid } = useParams();
  let navigate = useNavigate();

  useEffect(() => {

    if (localStorage.getItem('token')) {
      // console.log("auth-token");
    } else {
      // console.log("login-required");
      props.createNotification('warning', 'Login required')
      navigate('/');
    }

    if (placeid)
      getPlaceById(placeid);

  }, [placeid, navigate]);

  useEffect(() => {


  }, [place]);


  const compareByMatchingTags = (a, b, preferedtags) => {

    const matchingTagsA = a.tags.filter(tag => preferedtags?.includes(tag));
    const matchingTagsB = b.tags.filter(tag => preferedtags?.includes(tag));
    const tagsComparison = matchingTagsB.length - matchingTagsA.length;

    //If the matching tags are the same, compare by rating
    if (tagsComparison === 0) {
      const ratingComparison = b.rating - a.rating;
      return ratingComparison;

    }
    return matchingTagsB.length - matchingTagsA.length;
  };


  const compareByVeg = (a, b) => {

    let preferenceA = 0, preferenceB = 0;


    if (prefferedRestaurant?.includes('veg')) {
      preferenceA = a.veg;
      preferenceB = b.veg;
    } else if (prefferedRestaurant?.includes('nonveg')) {
      preferenceA = a.nonveg;
      preferenceB = b.nonveg;
    }
  
    if (preferenceA === preferenceB) {
      const ratingComparison = b.rating - a.rating;
      return ratingComparison;

    }

    return preferenceB - preferenceA;
  };


  useEffect(() => {

    if (place?.stays?.length !== 0 && place?.restaurants?.length !== 0 && place?.todos?.length !== 0) {
      const sortedhotelsCopy = place?.stays ? [...place.stays] : [];
      const sortedrestaurantsCopy = place?.restaurants ? [...place.restaurants] : [];
      const sortedtodosCopy = place?.todos ? [...place.todos] : [];


      console.log(sortedhotelsCopy);
      sortedhotelsCopy.sort((a, b) => compareByMatchingTags(a, b, prefferedStay));
      sortedtodosCopy.sort((a, b) => compareByMatchingTags(a, b, prefferedTodo));
      sortedrestaurantsCopy.sort(compareByVeg);

      setSortedhotels(sortedhotelsCopy);
      setSortedtodos(sortedtodosCopy);
      setSortedrestaurants(sortedrestaurantsCopy);
    }

  }, [place, prefferedRestaurant, prefferedStay, prefferedTodo]);

  const photos = place?.images?.map((imgLink) => ({
    src: imgLink,
    width: 800, // Set the width as needed
    height: 800, // Set the height as needed
  }));
  return (
    <>
      <Navbar />
      <div className="main">

        {/***** titlebar section ******/}
        <section className="titleBar">
          <div className="heading">
            <p className="titletext">Explore <span className="placename">{place?.name}</span></p>
          </div>


          <div className="buttons">

            <Link to={`/place/${placeid}`}>
              <div className="button">
                {place?.name}
                <img src={stories_ion} alt="icon" />
              </div>
            </Link>

            <Link to={placeid ? `/place/${placeid}/hotels` : '/hotels'}>
              <div className="button">
                Hotels
                <img src={hotel_icon} alt="icon" />
              </div>
            </Link>

            <Link to={placeid ? `/place/${placeid}/todos` : '/todos'}>
              <div className="button">
                Things to do
                <img src={todo_icon} alt="icon" />
              </div>
            </Link>

            <Link to={placeid ? `/place/${placeid}/restaurants` : '/restaurants'}>
              <div className="button">
                Restaurants
                <img src={restaurant_icon} alt="icon" />
              </div>
            </Link>



          </div>

          <div className="images">
            <PhotoAlbum layout="rows" photos={photos} />
          </div>

        </section>


        {/******** about section ************/}
        <section className="about">
          <h2 className="titletext">About {place?.name}</h2>
          <p>{place?.description}</p>
        </section>


        {/********* Places section **********/}
        <section className="placesCont">
          <h2 className="titletext">Essential {place?.name}</h2>



          <div className="slider">
            <div className="sliderHeader">
              <p>Do</p>
              <p>Places to see, ways to wander, and signature experiences that define Dubai.</p>
            </div>
            <div className="sliderData">
              <Slider sites={sortedtodos} placeid={placeid} type={'todos'} />
            </div>

          </div>

          <div className="slider">
            <div className="sliderHeader">
              <p>Stay</p>
              <p>A mix of the charming, lavish, and modern.</p>
            </div>
            <div className="sliderData">
              <Slider sites={sortedhotels} placeid={placeid} type={'hotels'} />
            </div>

          </div>

          <div className="slider">
            <div className="sliderHeader">
              <p>Eat</p>
              <p>Quintessential Dubai restaurants, bars, and beyond.</p>
            </div>
            <div className="sliderData">
              <Slider sites={sortedrestaurants} placeid={placeid} type={'restaurants'} />
            </div>

          </div>
        </section>

      </div>
      <FooterSmall />


    </>
  )
}

export default Place