import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from "react-router-dom";
import './Card.css'
import like_icon from '../Assets/like_icon.svg'
import like_icon_red from '../Assets/like_icon_red.svg'

function Card(props) {

    const [ratingValue, setRatingValue] = useState(0)

    const handleRating = (rate) => {
        setRatingValue(rate)
    }

    const handleReset = () => {
        // Set the initial value
        // setRating(0)
    }

    const addToFav = () => {
        //add to favorite list
    }


    const { id, name, description, img, rating } = props;

    return (
        <div className="card">
            <div className="cardImage">
                <span className="likeIcon" onClick={addToFav}>
                    <img src={like_icon} alt="" />
                    <img src={like_icon_red} alt="" />
                </span>
                <Link to={`/siteinfo/${id}`}><img src={img} alt="image" /></Link>

            </div>

            <div className="cardData">
                <h3 className="name">{name}</h3>
                <p className='rating'>{/* set initial value */}
                    <Rating initialValue={rating} size='20px' readonly />

                </p>
                <p className="description">{description.slice(0, 70)}...</p>
            </div>
        </div>
    )
}

export default Card
