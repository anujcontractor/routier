import React from 'react'
import { Rating } from 'react-simple-star-rating'
import './Review.css'
import user_photo from '../Assets/user_photo.png'
import profile from '../Assets/aboutus/profile.png';

function Review(props) {

    const { title, description, rating, date, username, reviewLen } = props;

    return (
        <div className='review'>
            <div className="userPhoto">
               <img src={profile} alt="user_photo" />
               <p>{username}</p>
               <p>Provided reviews {reviewLen}</p>
               <p></p>
            </div>

            <div className="reviewText">
                <p className='reviewRating'>
                    {/* set initial value */}
                    <Rating initialValue={rating} size='20px' readonly />
                </p>
                <p className="reviewTitle">
                    {title}
                </p>
                <p className='reviewDescription'>
                    {description}
                </p>

                <p className='date'><b>Date of visit:</b> {date.slice(0,10)}</p>
            </div>

        </div>
    )
}

export default Review
