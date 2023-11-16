import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom";
import PhotoAlbum from "react-photo-album";
import PlaceContext from '../Context/PlaceContext';

import './Place.css';
import Slider from './Slider.jsx';
import hotel_icon from "../Assets/hotel_icon.svg"
import todo_icon from "../Assets/todo_icon.svg"
import restaurant_icon from "../Assets/restaurant_icon.svg"
import stories_ion from "../Assets/stories_icon.svg"
import place_img from "../Assets/place.png"
import Navbar from './Navbar.jsx';


function Place(props) { 
  
  // const context = useContext(PlaceContext);
  // const { todo, hotels, restaurants } = context;
  // const [sites, setSites] = useState([]);

  const fetchData = async () => {
    let url = "";
    let data = await fetch(url);//Will return the promise
    let parseddata = await data.json();
    console.log(data);
  };

  const photos = [

    { src: place_img, width: 800, height: 600 },
    { src: place_img, width: 1600, height: 900 },
    { src: place_img, width: 800, height: 600 },
    { src: place_img, width: 1600, height: 900 },
    { src: place_img, width: 800, height: 600 },
    { src: place_img, width: 1600, height: 900 },
  ];

  
  
  

  return (
    <>
    <Navbar/>
    <div className="main">
 
      {/***** titlebar section ******/}
      <section className="titleBar">
        <div className="heading">
          <p className="titletext">Explore <span className="placename">[place_name]</span></p>
        </div>


        <div className="buttons">

          <Link to="/place">
            <div className="button">
              place_name
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

        <div className="images">
          <PhotoAlbum layout="rows" photos={photos} />
        </div>

      </section>


      {/******** about section ************/}
      <section className="about">
        <h2 className="titletext">About [place_name]</h2>
        <p>[place_description] Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sint assumenda architecto culpa mollitia quibusdam optio magni, soluta perferendis ratione hic veniam libero labore cum pariatur accusamus eos, itaque ut. Maiores reiciendis quo praesentium facilis. Iusto voluptate aperiam consectetur commodi praesentium voluptatem, sapiente voluptatibus earum. Quisquam aspernatur tempora labore consequatur ut.</p>
      </section>


      {/********* Places section **********/}
      <section className="placesCont">
        <h2 className="titletext">Essential [place_name]</h2>



        <div className="slider">
          <div className="sliderHeader">
            <p>Do</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, cupiditate?</p>
          </div>
          <div className="sliderData">
            <Slider sites={props} />
          </div>

        </div>

        <div className="slider">
          <div className="sliderHeader">
            <p>Stay</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, cupiditate?</p>
          </div>
          <div className="sliderData">
            <Slider sites={props} />
          </div>

        </div>

        <div className="slider">
          <div className="sliderHeader">
            <p>Eat</p>
            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam, cupiditate?</p>
          </div>
          <div className="sliderData">
            <Slider sites={props} />
          </div>

        </div>
      </section>

    </div>
    </>
  )
}

export default Place
