import React, { useState, useContext } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from "react-router-dom";
import PlaceContext from '../../Context/PlaceContext';
import './Card.css'
import like_icon from '../Assets/like_icon.svg'
import like_icon_red from '../Assets/like_icon_red.svg'

function Card(props) {

    // console.log(props.type)
    const { siteid, name, description, img, rating, type, placeid } = props;
    const context = useContext(PlaceContext);
    const { addfavourites } = context;
    const [ratingValue, setRatingValue] = useState(0)
    const [favorited, setFavorited] = useState(false);

    const handleRating = (rate) => {
        setRatingValue(rate)
    }

    const handleReset = () => {
        // Set the initial value
        // setRating(0)
    }
    let sitetype;
    if (type === 'todos') {
        sitetype = 'thingToDo';
    } else if (type === 'restaurants') {
        sitetype = 'restaurant';
    } else if (type === 'hotels') {
        sitetype = 'stay';
    }

    const handleFav = () => {

        addfavourites(siteid, sitetype);
    }

    return (
        <div className="card">
            <div className="cardImage">
                <span className="likeIcon" onClick={handleFav}>
                    <img src={like_icon} alt="" />
                    <img src={like_icon_red} alt="" />
                </span>
                <Link to={placeid ? `/place/${placeid}/${props.type}/siteinfo/${siteid}` : `/${props.type}/siteinfo/${siteid}`}><img src={img} alt="image" /></Link>

            </div>

            <div className="cardData">
                <h3 className="name">{name}</h3>
                <p className='starrating'>{/* set initial value */}
                    <Rating initialValue={rating} size='20px' readonly />
                </p>
                <p className="description">{description.slice(0, 70)}...</p>
            </div>
        </div>
    )
}

export default Card
