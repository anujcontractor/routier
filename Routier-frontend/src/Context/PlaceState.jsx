import PlaceContext from "./PlaceContext";
import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from "../shared";


const PlaceState = (props) => {

  let navigate = useNavigate();
  const [user, setUser] = useState({});
  const [todos, setTodos] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [siteinfo, setSiteinfo] = useState([]);
  const [place, setPlace] = useState([]);
  const [site, setSite] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const [prefferedTodo, setPrefferedTodo] = useState([]);
  const [prefferedStay, setPrefferedStay] = useState([]);
  const [prefferedRestaurant, setPrefferedRestaurant] = useState([]);

  const fetchData = async () => {

    props.setProgress(30);
    try {
      const response = await fetch(`${baseUrl}/api/placeinfo`);
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
      const response = await fetch(`${baseUrl}/api/placeinfo/${placeid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('token')
        }
      });
      
      if (response.status===404) {
        // console.error(`Error fetching place: ${response.status}`);
        props.createNotification('warning', `Place not found`);
        navigate('/');
      }
      if (!response.ok) {
        // console.error(`Error fetching place: ${response.status}`);
        props.createNotification('warning', `Internal server error: ${response.status}`);
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
      const response = await fetch(`${baseUrl}/api/todo`, {
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
      const response = await fetch(`${baseUrl}/api/stay`, {
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

      const response = await fetch(`${baseUrl}/api/restaurants/`, {
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


      const response = await fetch(`${baseUrl}/api/restaurants/${siteid}`, {
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

      const response = await fetch(`${baseUrl}/api/todo/${siteid}`, {
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

      const response = await fetch(`${baseUrl}/api/stay/${siteid}`, {
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



  const getUserProfile = async () => {

    // props.setProgress(30);

    try {

      const authToken = localStorage.getItem('token');
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${baseUrl}/api/users/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },
      });

      if (!response.ok) {
        // props.createNotification('warning', `Failed to fetch Profile. Status: ${response.status}`);
        // navigate('/');
      }

      const data = await response.json();
      setPrefferedTodo(data.user.preferredTodoTags);
      setPrefferedRestaurant(data.user.prefferedRestaurant);
      setPrefferedStay(data.user.preferredStayTags);
      setUser(data.user);

      console.log(prefferedStay);
      console.log(prefferedRestaurant);
      console.log(prefferedTodo)

      // setPreferedtags(["Cultural",
      //   "Nature",
      //   "Art",
      //   "Peace",
      //   "Family",
      //   "Temples",
      // "veg"])
      console.log(data);
      // if (data.response)
      // setSite(data.response);
      // else {
      //   props.createNotification('warning', `Failed to fetch hotel`);
      //   navigate('/');
      // }

    } finally {
      // props.setProgress(100);
    }

  }

  const addFavourites = async (siteid, type) => {

    props.setProgress(30);

    try {
      const response = await fetch(`${baseUrl}/api/favourites/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },

        body: JSON.stringify({ itemId: siteid, itemType: type }),
      });

      // console.log(response);
      if (response.ok) {
        props.createNotification('success', `Favorite added successfully`);
      } else if (response.status == 404) {
        props.createNotification('warning', `Site not found. Status: ${response.status}`);
      } else if (response.status == 400) {
        props.createNotification('warning', `Already in favorites`);
      } else {
        props.createNotification('warning', `Internal server error. Status: ${response.status}`);
      }
      // console.log(response)
      // const data = await response.json();
      // console.log(data);

    } finally {
      props.setProgress(100);
    }

  }


  const deleteFavourites = async (siteid, type) => {

    props.setProgress(30);

    try {
      const response = await fetch(`${baseUrl}/api/favourites/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },

        body: JSON.stringify({ itemId: siteid, itemType: type }),
      });

      // console.log(response);
      if (response.ok) {
        props.createNotification('success', `Favorite removed successfully`);
      } else if (response.status == 404) {
        props.createNotification('warning', `Site not found in favorites. Status: ${response.status}`);
      } else {
        props.createNotification('warning', `Internal server error. Status: ${response.status}`);
      }
      // console.log(response)
      // const data = await response.json();
      // console.log(data);

    } finally {
      props.setProgress(100);
    }

  }


  const getFavourites = async () => {

    // props.setProgress(30);

    try {
      const response = await fetch(`${baseUrl}/api/favourites`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem(`token`)}`,
        },

        // body: JSON.stringify({ itemId: siteid, itemType: type }),
      });

      // console.log(response);
      if (response.ok) {
        // props.createNotification('success', `Favorite removed successfully`);
      } else if (response.status == 404) {
        console.log('user not found');
      } else {
        console.log('Internal server error');
      }
      const data = await response.json();

      if (data.favoriteDetails)
        setFavourites(data.favoriteDetails);

    } finally {
      // props.setProgress(100);
    }

  }
 

  return (
    <PlaceContext.Provider value={{ restaurants, hotels, todos, getRestaurants, getHotels, getTodos, fetchData, allData, searchResults, searchTerm, setAllData, setSearchResults, setSearchTerm, getPlaceById, place, site, setSite, getHotelById, getRestaurantById, getTodoById, addFavourites, deleteFavourites, getFavourites, favourites, getUserProfile, prefferedRestaurant, prefferedStay, prefferedTodo, user }}>
      {props.children}
    </PlaceContext.Provider>
  )
}

export default PlaceState;