import PlaceContext from "./PlaceContext";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';


const PlaceState = (props) => {

  let navigate = useNavigate();

  const host = "https://routier-production.up.railway.app";

  const [todos, setTodos] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [siteinfo, setSiteinfo] = useState([]);
  const [place, setPlace] = useState([]);
  const [site, setSite] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const fetchData = async () => {

    props.setProgress(30);
    try {
      const response = await fetch('https://routier-production.up.railway.app/api/placeinfo');
      if (!response.ok) {
        // console.error(`Error fetching place: ${response.status}`);
        props.createNotification('warning', `Failed to fetch place: ${response.status}`);
        navigate('/');
      }
      // console.log(response)
      const data = await response.json();
      // console.log(data);
      setAllData(data.response);

    } catch (error) {
      //   console.error("Error fetching data:", error);
      props.createNotification('warning', error)
      // console.log(data);
    } finally {
      props.setProgress(100);
    }

  };

  const getPlaceById = async (placeid) => {

    props.setProgress(30);
    try {
      const response = await fetch(`https://routier-production.up.railway.app/api/placeinfo/${placeid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        // console.error(`Error fetching place: ${response.status}`);
        props.createNotification('warning', `Error fetching place: ${response.status}`);
        navigate('/');
      }

      const data = await response.json();
      // console.log(data);
      setPlace(data.response);
      // console.log(place);
    } finally {
      props.setProgress(100);
    }
  };

  /*get the to do sites*/
  const getTodos = async (placeid) => {

    props.setProgress(30);


    try {
      const response = await fetch(`${host}/api/todo`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        // console.error(`Error fetching place: ${response.status}`);
        props.createNotification('warning', `Failed to fetch todos: ${response.status}`);
        navigate('/');
      }
      const json = await response.json();
      // console.log(json);
      setTodos(json.response);
    } finally {
      props.setProgress(100);
    }

  }


  /*get hotels sites*/
  const getHotels = async (placeid) => {

    props.setProgress(30);



    try {
      const response = await fetch(`${host}/api/stay`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        // console.error(`Error fetching place: ${response.status}`);
        props.createNotification('warning', `Failed to fetch hotels: ${response.status}`);
        navigate('/');
      }
      const json = await response.json();
      // console.log(json);
      setHotels(json.response);
      props.setProgress(100);
    } finally {
      props.setProgress(100);
    }
  }

  /*get Restaurants sites*/
  const getRestaurants = async () => {

    props.setProgress(30);



    try {

      const response = await fetch(`${host}/api/restaurants/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        },
      });

      if (!response.ok) {
        // console.error(`Error fetching place: ${response.status}`);
        props.createNotification('warning', `Failed to fetch restaurants: ${response.status}`);
        navigate('/');
      }

      const json = await response.json();
      // console.log(json);
      setRestaurants(json.response);
      props.setProgress(100);
    } finally {
      props.setProgress(100);
    }
  }
  const getSiteById = async (siteid) => {

    props.setProgress(30);
    const authToken = localStorage.getItem('token');

    if (!authToken) {
      throw new Error('Authentication token not found');
    }

    // Assuming these functions return promises, use await to wait for their completion
    props.setProgress(100);
    getHotelById(siteid);
    getRestaurantById(siteid);
    getTodoById(siteid);
    props.setProgress(100);

  };




  const getRestaurantById = async (siteid) => {

    props.setProgress(30);
    try {
      const authToken = localStorage.getItem('token');

      if (!authToken)
        throw new Error('Authentication token not found');


      const response = await fetch(`https://routier-production.up.railway.app/api/restaurants/${siteid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (!response.ok) {
        props.createNotification('warning', `Failed to fetch restaurant. Status: ${response.status}`);
        navigate('/');
      }

      const data = await response.json();
      if (data.response)
        setSite(data.response);
      else {
        props.createNotification('warning', `Failed to fetch restaurant`);
        navigate('/');
      }

    } finally {
      props.setProgress(100);
    }


  };

  const getTodoById = async (siteid) => {

    props.setProgress(30);


    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`https://routier-production.up.railway.app/api/todo/${siteid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (!response.ok) {
        props.createNotification('warning', `Failed to fetch todo. Status: ${response.status}`);
        navigate('/home');
        return;
      }

      const data = await response.json();


      if (data.response)
        setSite(data.response);
      else {
        // props.createNotification('warning', `Failed to fetch todo`);
        // navigate('/');
      }

    } finally {
      props.setProgress(100);
    }

  }

  const getHotelById = async (siteid) => {

    props.setProgress(30);

    try {
      const authToken = localStorage.getItem('token');

      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`https://routier-production.up.railway.app/api/stay/${siteid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": authToken,
        },
      });

      if (!response.ok) {
        props.createNotification('warning', `Failed to fetch hotel. Status: ${response.status}`);
        navigate('/');
      }

      const data = await response.json();

      if (data.response)
        setSite(data.response);
      else {
        props.createNotification('warning', `Failed to fetch hotel`);
        navigate('/');
      }

    } finally {
      props.setProgress(100);
    }

  }

  const addfavourites = async (siteid, type) => {
    
    props.setProgress(30);

     try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://routier-production.up.railway.app/api/favourites/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token
        },

        body: JSON.stringify({ itemId: siteid, itemType: type }),
      });
       
      if (!response.ok) {
        props.createNotification('warning', `Failed to add. Status: ${response.status}`);
      }
      // console.log(response)
      const data = await response.json();
      // console.log(data);

    } finally {
      props.setProgress(100);
    }

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
    <PlaceContext.Provider value={{ restaurants, hotels, todos, getRestaurants, getHotels, getTodos, fetchData, allData, searchResults, searchTerm, setAllData, setSearchResults, setSearchTerm, getPlaceById, place, site, setSite, getHotelById, getRestaurantById, getTodoById, addfavourites }}>
      {props.children}
    </PlaceContext.Provider>
  )
}

export default PlaceState;