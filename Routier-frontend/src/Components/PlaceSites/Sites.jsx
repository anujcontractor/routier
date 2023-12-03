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
import FooterSmall from '../Main/FooterSmall';

function Sites(props) {

    const { placeid } = useParams();
    const context = useContext(PlaceContext);
    const { restaurants, getRestaurants, hotels, getHotels, todos, getTodos, getPlaceById, place, getFavourites, favourites, prefferedRestaurant, prefferedStay, prefferedTodo } = context;
    let navigate = useNavigate();

    const [sites, setSites] = useState([]);
    const [sortedsites, setSortedsites] = useState([]);

    const compareByMatchingTags = (a, b, preferedtags) => {

        const matchingTagsA = a.tags.filter(tag => preferedtags?.includes(tag));
        const matchingTagsB = b.tags.filter(tag => preferedtags?.includes(tag));
        const tagsComparison = matchingTagsB.length - matchingTagsA.length;

        //If the matching tags are the same, compare by rating
        if (tagsComparison === 0) {
            const ratingComparison = b.rating - a.rating;
            return ratingComparison;

        }
        return matchingTagsB.length - matchingTagsA.length;
    };
    const compareByVeg = (a, b) => {

        let preferenceA = 0, preferenceB = 0;


        if (prefferedRestaurant?.includes('veg')) {
            preferenceA = a.veg;
            preferenceB = b.veg;
        } else if (prefferedRestaurant?.includes('nonveg')) {
            preferenceA = a.nonveg;
            preferenceB = b.nonveg;
        }
        if (preferenceA === preferenceB) {
            const ratingComparison = b.rating - a.rating;
            return ratingComparison;

        }

        return preferenceB - preferenceA;
    };

    useEffect(() => {

        if (localStorage.getItem('token')) {

        } else {
            props.createNotification('warning', 'Login required')
            navigate('/');
        }
        getFavourites();
        if (placeid === undefined) {


            if (props.type === 'restaurants') {

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

                setSites(restaurants);
            } else if (props.type === 'hotels') {

                setSites(hotels);
            } else if (props.type === 'todos') {

                setSites(todos);
            }
        } else {

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


    useEffect(() => {

        if (sites?.length !== 0) {
            const sortedSitesCopy = sites ? [...sites] : [];

            if (props.type === 'restaurants') {
                sortedSitesCopy.sort(compareByVeg);
            }

            else if (props.type === 'todos')
                sortedSitesCopy.sort((a, b) => compareByMatchingTags(a, b, prefferedTodo));
            else if (props.type === 'hotels')
                sortedSitesCopy.sort((a, b) => compareByMatchingTags(a, b, prefferedStay));
            setSortedsites(sortedSitesCopy);

        }

    }, [sites, prefferedRestaurant, prefferedStay, prefferedTodo]);


    const [isFavoritedMap, setIsFavoritedMap] = useState({});

    // useEffect(() => {
    //     if (sites) {
    //         const newIsFavoritedMap = {};
    //         sites.forEach(site => {
    //             const isFavorited = isSiteidExist(site._id);
    //             newIsFavoritedMap[site._id] = isFavorited;
    //         });
    //         setIsFavoritedMap(newIsFavoritedMap);
    //     }

    //     console.log(isFavoritedMap)
    // }, [sites]);

    const isSiteidExist = (site_id) => {

        for (let i = 0; i < favourites.length; i++) {
            if (favourites[i].favoriteId === site_id) {
                return true; // Siteid found in the array
            }
        }
        return false; // Siteid not found in the array
    }
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
                    {sortedsites?.map((site, index) => {

                        return (
                            <Card
                                key={index}
                                siteid={site._id}
                                type={props.type}
                                name={site.name}
                                description={site.description}
                                img={site.image[0]}
                                rating={site.rating}
                                placeid={placeid}
                                fav={isFavoritedMap[site._id]}
                            />
                        );
                    })}
                </section>

            </div>
            <FooterSmall />
        </>
    )
}

export default Sites
