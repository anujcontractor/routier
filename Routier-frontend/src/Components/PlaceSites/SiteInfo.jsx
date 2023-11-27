import React, { useContext, useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from "react-router-dom";
import PhotoAlbum from "react-photo-album";
import Review from './Review';
import Navbar from './Navbar';
import './SiteInfo.css'
import PlaceContext from '../../Context/PlaceContext';
import { Rating } from 'react-simple-star-rating'

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
import website from '../Assets/website.svg'
import FooterSmall from '../Main/FooterSmall';

function SiteInfo(props) {

  // const [reviews] = props;
  const context = useContext(PlaceContext);
  const { place, site, setSite, getHotelById, getRestaurantById, getTodoById, addFavourites, getFavourites, favourites, deleteFavourites } = context;
  const { placeid, siteid } = useParams();
  let navigate = useNavigate();
  // console.log(siteid);


  let sitetype;
  if (props.type === 'todos') {
    sitetype = 'todo';
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
      props.createNotification('warning', 'Login required')
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

  const addFav = () => {

    addFavourites(siteid, sitetype)

  }

  const removeFav = () => {

    deleteFavourites(siteid, sitetype)

  }

  const photos = site?.image?.map((imgLink) => ({
    src: imgLink,
    width: 200, // Set the width as needed
    height: 200, // Set the height as needed
  }));
  console.log(photos)


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
            <h2 className="titletext" id='veg'>{site?.name} </h2>

            <div className='rbuttons'>
              <div className="button">
                <img src={edit_icon} alt="icon" />
                <Link to={`/givereview/${siteid}?placeName=${encodeURIComponent(site?.name)}&placeImage=${encodeURIComponent(site?.image?.[0])}&type=${props.type}`}>
                  Review
                </Link>
              </div>

              <div className="button" onClick={addFav}>
                <img src={fav_icon} alt="icon" />
                <Link>add to Fav</Link>

              </div>

              {/* <div className="button" onClick={removeFav}>
                <img src={fav_icon} alt="icon" />
                <Link>remove from Fav</Link>

              </div> */}
            </div>
          </div>

          <div className="contact">

            {props.type === 'restaurants' &&
              (<p>{site.veg === true ? <>&bull;Veg</> : null}&nbsp;&nbsp;&nbsp; {site.nonveg === true ? <>&bull;Nonveg</> : null}</p>)}
            <Rating initialValue={site?.rating} size='30px' readonly />


            {site?.time && (<p>{site.time}</p>)}
            <p>
              <img src={location} alt="" /><span>{site?.address ? site.address : 'Not available'}</span>
            </p>
            <p>
              <img src={call} alt="" /><span>{site?.phone ? site.phone : 'Not available'}</span>
            </p>

            <p className='d_info'>
              <img src={email} alt="" id='email' /><span>{site?.email ? site.email : 'Not available'}</span>
            </p>

            {site.website && (<p className='d_info'><img src={website} alt="" id='email' /><span>{site.website}</span></p>)}

          </div>

          <div className="images"><PhotoAlbum layout="rows" photos={photos} /></div>

          <div id='description'>{site?.description}</div>
        </section>

        {/********* review section ********/}
        <section className='reviews'>
          <div className="reviewHeading"><h2>Reviews</h2><span>({site?.reviews?.length})</span></div>
          {site?.reviews?.length !== 0 ? (
            site?.reviews?.map((review, index) => (
              <Review key={index} title={review.title} description={review.reviewText} rating={review.starRating} date={review.visitDate} />
            ))
          ) : (
            <div>No reviews yet</div>
          )}

          {/* {site?.reviews?.map((review, index) => {

            return <Review title={review.title} description={review.reviewText} rating={review.starRating} date={review.visitDate} />
          })} */}
          {/* 
          <Review />
          <Review />
          <Review />
          <Review /> */}
          {/* <div>No reviews yet</div> */}
        </section>

      </div>
      <FooterSmall/>
    </>
  )
}

export default SiteInfo