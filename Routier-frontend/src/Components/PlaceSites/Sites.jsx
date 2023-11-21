import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Sites.css'
import Card from './Card'
import hotel_icon from "../Assets/hotel_icon.svg"
import todo_icon from "../Assets/todo_icon.svg"
import restaurant_icon from "../Assets/restaurant_icon.svg"
import stories_ion from "../Assets/stories_icon.svg"
import place_img from "../Assets/place.png"
import Navbar from './Navbar';
import PlaceContext from '../../Context/PlaceContext';

function Sites(props) {

    const context = useContext(PlaceContext);
    const { restaurants, getRestaurants, hotels, getHotels, todo, getTodo } = context;
    const [sites, setSites] = useState([]);
    let navigate = useNavigate();
    useEffect(() => {

        if (localStorage.getItem('token'))
            console.log("auth-token")
        else {
            console.log("login-required")
            navigate('/');
        }

        
        if (props.type === 'restaurants') {
            getRestaurants();
        } else if (props.type === 'hotels') {
            getHotels();
        } else if (props.type === 'todo') {
            getTodo();
        }
        

    }, [props.type]);

    useEffect(() => {
        if (props.type === 'restaurants') {
            console.log(restaurants);
            setSites(restaurants);
        } else if (props.type === 'hotels') {
            console.log(hotels);
            setSites(hotels);
        } else if (props.type === 'todo') {
            console.log(todo);
            setSites(todo);
        }
    }, [restaurants, hotels, todo]);

    const { type } = props;
    return (

        <>
            <Navbar />
            <div className="main">

                {/***** titlebar section ******/}
                <section className="titleBar">
                    <div className="heading">
                        <p className="titletext">Explore <span className="placename">Popular {type} in [place_name]</span></p>
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



                </section>
                {/******** sites section ************/}
                <section className="sites">
                    {sites.map((site, index) => (

                        <Card id={site._id} name={site.name} description={site.description} img={site.image[0]} rating={site.rating} />
                    ))}
                </section>
            </div>
        </>
    )
}

export default Sites
