import React, { useContext } from 'react'
import { Link, useParams } from "react-router-dom";
import PhotoAlbum from "react-photo-album";
import Review from './Review';
import Navbar from './Navbar';
import './SiteInfo.css'
import PlaceContext from '../../Context/PlaceContext';

import hotel_icon from "../Assets/hotel_icon.svg"
import todo_icon from "../Assets/todo_icon.svg"
import restaurant_icon from "../Assets/restaurant_icon.svg"
import stories_ion from "../Assets/stories_icon.svg"
import place_img from "../Assets/place.png"
import location from '../Assets/location.svg'
import call from '../Assets/call.svg'
import fav_icon from '../Assets/fav_icon.svg'
import edit_icon from '../Assets/edit_icon.svg'

function SiteInfo(props) {

  // const [reviews] = props;
  const context = useContext(PlaceContext);
  const { restaurants, hotels, todo, } = context;
  const { id } = useParams();

  console.log(restaurants);

  let site = restaurants.find((place) => place._id === id);

  if (!site) {
    site = hotels.find((place) => place._id === id);

  }

  if (!site) {
    site = todo.find((place) => place._id === id);

  }
  console.log(site);
  // const photos = [

  //   { src: {site.image[0]? site.image}, width: 800, height: 600 },
  //   { src: place_img, width: 1600, height: 900 },
  //   { src: place_img, width: 800, height: 600 },
  //   { src: place_img, width: 1600, height: 900 },
  //   { src: place_img, width: 800, height: 600 },
  //   { src: place_img, width: 1600, height: 900 },
  // ];
  const photos = site.image.map((imgLink) => ({
    src: imgLink,
    width: 500, // Set the width as needed
    height: 500, // Set the height as needed
  }));

  return (
    <>
      <Navbar />
      <div className="main">

        {/***** titlebar section ******/}
        <section className="titleBar">

          <div className="buttons">

            <Link to="/place">
              <div className="button">
                Place
                <img src={stories_ion} alt="icon" />
              </div>
            </Link>

            <Link to="/hotels">
              <div className="button">
                Hotels
                <img src={hotel_icon} alt="icon" />
              </div>
            </Link>

            <Link to="/todo">
              <div className="button">
                Things to do
                <img src={todo_icon} alt="icon" />
              </div>
            </Link>

            <Link to="/restaurants">
              <div className="button">
                Restaurants
                <img src={restaurant_icon} alt="icon" />
              </div>
            </Link>
          </div>


        </section>


        {/******** Images section ************/}
        <section className="imgs">

          <div className="siteHeader">
            <h2 className="titletext">{site.name}</h2>

            <div className='rbuttons'>
              <div className="button">
                <img src={edit_icon} alt="icon" />
                <Link to={`/givereview/${id}?placeName=${encodeURIComponent(site.name)}&placeImage=${encodeURIComponent(site.image[0])}`}>
                Review
                </Link>

              </div>

              <div className="button">
                <img src={fav_icon} alt="icon" />
                <Link to="/">Add to favorites</Link>

              </div>
            </div>
          </div>

          <div className="contact">
            <p>
              <img src={location} alt="" /><span>{site.address}</span>
            </p>
            <p>
              <img src={call} alt="" /><span>{site.phone}</span>
            </p>
          </div>

          <PhotoAlbum layout="rows" photos={photos} />
        </section>

        {/********* review section ********/}
        <section className='reviews'>
          <div className="reviewHeading"><h2>Reviews</h2><span>(124)</span></div>

          {/* {reviews.map(()=>{

        return <Review/>
    })} */}

          <Review />
          <Review />
          <Review />
          <Review />
        </section>

      </div>
    </>
  )
}

export default SiteInfo