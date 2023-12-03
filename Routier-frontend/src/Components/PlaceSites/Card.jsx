import React, { useState, useContext } from 'react'
import { Rating } from 'react-simple-star-rating'
import { Link } from "react-router-dom";
import PlaceContext from '../../Context/PlaceContext';
import './Card.css'
import like_icon from '../Assets/like_icon.svg'
import like_icon_red from '../Assets/like_icon_red.svg'

function Card(props) {

    const { siteid, name, description, img, rating, type, placeid, fav } = props;
    const context = useContext(PlaceContext);
    const { addFavourites, deleteFavourites, getFavourites, favourites } = context;
    const [ratingValue, setRatingValue] = useState(0)
    // const [favorited, setFavorited] = useState(fav);

    let sitetype;
    if (type === 'todos') {
        sitetype = 'todo';
    } else if (type === 'restaurants') {
        sitetype = 'restaurant';
    } else if (type === 'hotels') {
        sitetype = 'stay';
    }

    const handleFav = () => {

        addFavourites(siteid, sitetype);
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
                    <Rating initialValue={rating} size='20px' readonly allowFraction />
                    <p id='r1'>{rating}</p>
                </p>
                <p className="description">{description.slice(0, 65)}...</p>
            </div>
        </div>
    )
}

export default Card
