import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
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
import email from '../Assets/email.svg'

function SiteInfo(props) {

  // const [reviews] = props;
  const context = useContext(PlaceContext);
  const { place, site,  setSite, getHotelById, getRestaurantById, getTodoById, addfavourites } = context;
  const { placeid, siteid } = useParams();
  let navigate = useNavigate();
  // console.log(siteid);
  

  let sitetype;
    if (props.type === 'todos') {
        sitetype = 'thingToDo';
    } else if (props.type === 'restaurants') {
        sitetype = 'restaurant';
    } else if (props.type === 'hotels') {
        sitetype = 'stay';
    }

  useEffect(() => {
     
    setSite([]);
    if (localStorage.getItem('token')) {
      // console.log("auth-token");
    } else {
      // console.log("login-required");
      props.createNotification('warning','Login required')
      navigate('/');
    }

    if (props.type === 'restaurants') {
      getRestaurantById(siteid);
    } else if (props.type === 'hotels') {
      getHotelById(siteid);
    } else if (props.type === 'todos') {
      getTodoById(siteid);
    }

  }, [placeid, siteid, props.type]);

  useEffect(() => {
    
  }, [site]);

  const handleFav = () => {

    addfavourites(siteid, sitetype);
}

  const photos = site?.image?.map((imgLink) => ({
    src: imgLink,
    width: 500, // Set the width as needed
    height: 500, // Set the height as needed
  }));
  console.log(site);

  return (
    <>
      <Navbar />
      <div className="main">

        {/***** titlebar section ******/}
        <section className="titleBar">

          <div className="buttons">

            {placeid !== undefined ? (
              <Link to={`/place/${placeid}`}>
                <div className="button">
                  {place.name}
                  <img src={stories_ion} alt="icon" />
                </div>
              </Link>
            ) : null}

            <Link to={placeid !== undefined ? `/place/${placeid}/hotels` : '/hotels'}>
              <div className="button">
                Hotels
                <img src={hotel_icon} alt="icon" />
              </div>
            </Link>

            <Link to={placeid !== undefined ? `/place/${placeid}/todos` : '/todos'}>
              <div className="button">
                Things to do
                <img src={todo_icon} alt="icon" />
              </div>
            </Link>

            <Link to={placeid !== undefined ? `/place/${placeid}/restaurants` : '/restaurants'}>
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
            <h2 className="titletext">{site?.name}</h2>

            <div className='rbuttons'>
              <div className="button">
                <img src={edit_icon} alt="icon" />
                <Link to={`/givereview/${siteid}?placeName=${encodeURIComponent(site?.name)}&placeImage=${encodeURIComponent(site?.image?.[0])}&type=${props.type}`}>
                Review
                </Link>
              </div>

              <div className="button" onClick={handleFav}>
                <img src={fav_icon} alt="icon" />
                <Link>Add to favorites</Link>

              </div>
            </div>
          </div>

          <div className="contact">

            {site?.time && (<p>{site.time}</p>)}
            <p>
              <img src={location} alt="" /><span>{site?.address? site.address: 'Not available'}</span>
            </p>
            <p>
              <img src={call} alt="" /><span>{site?.phone? site.phone: 'Not available'}</span>
            </p>

            <p><img src={email} alt="" id='email'/><span>{site?.email? site.email: 'Not available'}</span></p>
            
          </div>

          <PhotoAlbum layout="rows" photos={photos} />
          <p>{site?.description}</p>
        </section>

        {/********* review section ********/}
        <section className='reviews'>
          <div className="reviewHeading"><h2>Reviews</h2><span>(0)</span></div>

          {/* {reviews.map(()=>{

        return <Review/>
    })} */}
{/* 
          <Review />
          <Review />
          <Review />
          <Review /> */}
          <div>No reviews yet</div>
        </section>

      </div>
    </>
  )
}

export default SiteInfo