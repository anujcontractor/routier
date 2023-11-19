import "./App.css";
import Main from "./Components/Main/Main";
import Signup from "./Components/LoginSignup/Signup";
import Login from "./Components/LoginSignup/Login";
import Home from "./Components/Main/Home";
import Aboutus from "./Components/aboutus/Aboutus";
import Place from "./Components/PlaceSites/Place";
import SiteInfo from "./Components/PlaceSites/SiteInfo";
import Sites from "./Components/PlaceSites/Sites";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SearchComponent from "./Components/Main/SearchComponent";
import Profile from "./Components/Profile/Profile";
import React, { useState } from 'react'
import Alert from "./Components/Alert";
import PlaceState from './Components/Context/PlaceState'
// import Review from "./Components/SE-Review/Review";

function App() {

  
  const [alert, setAlert] = useState({});

  const showAlert = (msg, type) => {
    setAlert({
      message: msg,
      type: type
    });
   console.log(alert);
    setTimeout(() => {
      setAlert(null)
    }, 1500);

  }

  return (
    <div className="App">
      <PlaceState>
      <BrowserRouter>
      <Alert alert = {alert}/>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login  showAlert = {showAlert} />} />
          <Route path="/signup" element={<Signup showAlert = {showAlert}/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/place" element={<Place />} />
          <Route path="/todo" element={<Sites type="to do" />} />
          <Route path="/hotels" element={<Sites type="hotels" />} />
          <Route path="/restaurants" element={<Sites type="restaurants" />} />
          <Route path="/siteinfo" element={<SiteInfo />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/givereview" element={<Review />} /> */}
        </Routes>
      </BrowserRouter>
      </PlaceState>
    </div>
  );
}

export default App;
