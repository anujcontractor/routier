import PlaceContext from "./PlaceContext";
import { useState } from "react";

const PlaceState = (props) => {

    const host = "http://localhost:6000";

    const [place, setPlace] = useState([]);/*main states*/
    const [todo, setTodo] = useState([]);
    const [hotels, setHotels] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [siteinfo, setSiteinfo] = useState([]);

    /*get the place*/
    const getPlace = async () => {

        const response = await fetch(`${host}/place`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        setPlace(json);
        //response
        //placeid, Image array, place_name, place_description
    }

    /*get the to do sites*/
    const getToDo = async (placeid) => {

        const response = await fetch(`${host}/todo/${placeid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        setTodo(json);

        //response
        //{siteid, Image, site_name, site_description, site_rating} of all site(to do sites only)

    }


    /*get hotels sites*/
    const getHotels = async (placeid) => {

        const response = await fetch(`${host}/hotels/${placeid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        setHotels(json);

        //response
        //{siteid, Image, site_name, site_description, site_rating} of all site(hotels only)

    }

    /*get Restaurants sites*/
    const getRestaurants = async (placeid) => {

        const response = await fetch(`${host}/restaurants/${placeid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        setRestaurants(json);
        //response
        //{siteid, Image, site_name, site_description, site_rating} of all site(restaurants only)
    }


    /*get site info*/
    const getSiteInfo = async (siteid) => {

        const response = await fetch(`${host}/getsiteinfo/${siteid}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        });

        const json = await response.json();
        // console.log(json);
        setSiteinfo(json);
        //response
        //Image array, site_name, site_description , location, contact number and all reviews on this site

    }

    /*submit review on perticular site*/
    const giveRiew = async (review) => {
        const response = await fetch(`/givereview`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token'),

            },
            body: JSON.stringify({
                starrating: review.rating, visitDate: review.date,
                visitedWith: review.visitedWith, siteid: review.siteid, location: review.location,
                siteType: review.sitetype, reviewTitle: review.title, reviewDescription: review.description, photos: review.photos
            })//req parameters
        });

        //adding a new review in site stat
        const newReview = await response.json();
        const site = siteinfo.find(obj => obj.siteid === review.siteid);
        site.reviews.push(newReview);
        setSiteinfo(siteinfo.concat(site));
    }

    return (
        <PlaceContext.Provider value={{
            place, todo, hotels, restaurants, siteinfo,
            setPlace, setTodo, setHotels, setRestaurants, setSiteinfo
        }}>
            {props.children}
        </PlaceContext.Provider>
    )
}

export default PlaceState;