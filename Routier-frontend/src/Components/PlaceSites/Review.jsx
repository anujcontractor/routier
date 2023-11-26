import React from 'react'
import { Rating } from 'react-simple-star-rating'
import './Review.css'
import user_photo from '../Assets/user_photo.png'

function Review(props) {

    const { title, description, rating, date } = props;

    return (
        <div className='review'>
            <div className="userPhoto">
               <img src={user_photo} alt="user_photo" />
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

                <p className='date'>Date of visit: {date.slice(0,10)}</p>
            </div>

        </div>
    )
}

export default Review
