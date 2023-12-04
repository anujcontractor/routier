import React, { useEffect, useState } from 'react'
import { Rating } from 'react-simple-star-rating'
import './Review.css'
import user_photo from '../Assets/user_photo.png'
import profile from '../Assets/aboutus/profile.png';
import { baseUrl } from '../../shared';

function Review(props) {

    const { title, description, rating, date, userid } = props;
    const [user, setUser] = useState([]);

    console.log(userid)

    const getUser = async () => {

        try {
            const response = await fetch(`${baseUrl}/api/users/${userid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem(`token`)}`,
                },
            });

            // console.log(response);
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                console.log(data);
            } else if (response.status == 404) {
                console.log('user not found');
            } else {
                console.log('internal server error');
            }


        } finally {
        }

    }

    useEffect(() => {
        getUser();
    }, [userid]);

    return (
        <div className='review'>
            <div className="userPhoto">
                <img src={profile} alt="user_photo" />
                <p>{user?.name}</p>
                <p>Provided reviews: {user?.reviews?.length}</p>
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

                <p className='date'><b>Date of visit:</b> {date.slice(0, 10)}</p>
            </div>

        </div>
    )
}

export default Review
