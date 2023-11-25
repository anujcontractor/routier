import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import Card from './Card'
import './Slider.css'

function Slider(props) {

  // console.log(props.placeid);

  const [ratingValue, setRatingValue] = useState(0)

  const handleRating = (rate) => {
    setRatingValue(rate)
  }

  const handleReset = () => {
    // Set the initial value
    // setRating(0)
  }


  return (

    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={5}
      slidesPerView={3}
      breakpoints={{
        100: {
          slidesPerView: 1,
        },


        900: {
          slidesPerView: 2,
        },

        1300: {
          slidesPerView: 3,
        },
      }}
      navigation={{ clickable: true }}
      onSwiper={(swiper) => console.log(null)}
      onSlideChange={() => console.log(null)}
    >


      {/* iterate and display all site */}
      {/* pass its title, description, rating.. as props */}
      
      {props.sites?.map((site, index) => (

        <SwiperSlide key={site.name}>
          <Card siteid={site._id} type={props.type} name={site.name} description={site.description} img={site.image[0]} rating={site.rating} placeid={props.placeid}/>
        </SwiperSlide>

      ))}


      {/* if custom buttons needed  */}
   
            {/* <div class="swiper-button-next">
               <i class="ri-arrow-right-s-line"></i>
            </div>
            
            <div class="swiper-button-prev">
               <i class="ri-arrow-left-s-line"></i>
            </div> */}


    </Swiper>


  )
}

export default Slider
