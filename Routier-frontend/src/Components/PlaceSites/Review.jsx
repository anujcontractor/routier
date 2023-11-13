import React from 'react'
import { Rating } from 'react-simple-star-rating'
import './Review.css'
import user_photo from '../Assets/user_photo.png'

function Review() {
    return (
        <div className='review'>
            <div className="userPhoto">
               <img src={user_photo} alt="user_photo" />
            </div>

            <div className="reviewText">
                <p className='reviewRating'>
                    {/* set initial value */}
                    <Rating initialValue={3} size='20px' readonly />
                </p>
                <p className="reviewTitle">
                    [review_title]
                </p>
                <p className='reviewDescription'>
                    [review_description]
                    All the team, specially Murad, were very kind and profesional. I will repeat the experiencia for sure.
                    All the team, specially Murad, were very kind and profesional. I will repeat the experiencia for sure.
                </p>

                <p className='date'>Date of visit: [date]</p>
            </div>

        </div>
    )
}

export default Review
