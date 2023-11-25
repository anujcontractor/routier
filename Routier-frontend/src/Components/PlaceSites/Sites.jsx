import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom';
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

    const { placeid } = useParams();
    const context = useContext(PlaceContext);
    const { restaurants, getRestaurants, hotels, getHotels, todos, getTodos, getPlaceById, place } = context;
    let navigate = useNavigate();

    // console.log(placeid);
    const [sites, setSites] = useState([]);
    useEffect(() => {

        if (localStorage.getItem('token')) {
            // console.log("auth-token");
        } else {
            props.createNotification('warning','Login required')
            navigate('/');
        }

        if (placeid === undefined) {


            if (props.type === 'restaurants') {
                // console.log("Hi");
                getRestaurants();
            } else if (props.type === 'hotels') {
                getHotels();
            } else if (props.type === 'todos') {
                getTodos();
            }
        } else {
            getPlaceById(placeid);
        }
    }, [placeid, props.type]);

    useEffect(() => {
        if (placeid === undefined) {
            if (props.type === 'restaurants') {
                // console.log(restaurants);
                setSites(restaurants);
            } else if (props.type === 'hotels') {
                // console.log(hotels);
                setSites(hotels);
            } else if (props.type === 'todos') {
                // console.log(todos);
                setSites(todos);
            }
        } else {
            // console.log(place);
            setSites(place.restaurants);
            if (props.type === 'restaurants') {
                setSites(place.restaurants);
            } else if (props.type === 'hotels') {
                setSites(place.stays);
            } else if (props.type === 'todos') {
                setSites(place.todos);
            }
        }
    }, [restaurants, hotels, todos, place]);





    const { type } = props;
    return (

        <>
            <Navbar />
            <div className="main">

                {/***** titlebar section ******/}
                <section className="titleBar">
                    <div className="heading">
                        <p className="titletext">Explore <span className="placename">Popular {type} {placeid ? `in ${place?.name}` : null}</span>

                        </p>
                    </div>


                    <div className="buttons">

                        {placeid !== undefined ? (
                            <Link to={`/place/${placeid}`}>
                                <div className="button">
                                    {place.name}
                                    <img src={stories_ion} alt="icon" />
                                </div>
                            </Link>
                        ) : null}


                        <Link to={placeid !== undefined ? `/place/${placeid}/hotels` : '/hotels'}>
                            <div className="button">
                                Hotels
                                <img src={hotel_icon} alt="icon" />
                            </div>
                        </Link>

                        <Link to={placeid !== undefined ? `/place/${placeid}/todos` : '/todos'}>
                            <div className="button">
                                Things to do
                                <img src={todo_icon} alt="icon" />
                            </div>
                        </Link>

                        <Link to={placeid !== undefined ? `/place/${placeid}/restaurants` : '/restaurants'}>
                            <div className="button">
                                Restaurants
                                <img src={restaurant_icon} alt="icon" />
                            </div>
                        </Link>


                    </div>



                </section>
                {/******** sites section ************/}
                <section className="sites">
                    {sites?.map((site, index) => (
                        <Card siteid={site._id} type={props.type} name={site.name} description={site.description} img={site.image[0]} rating={site.rating} placeid={placeid} />
                    ))}
                </section>
            </div>
        </>
    )
}

export default Sites
