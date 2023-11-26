import "./App.css";
import Main from "./Components/Main/Main";
import Signup from "./Components/LoginSignup/Signup";
import Login from "./Components/LoginSignup/Login";
import Home from "./Components/Main/Home";
import Aboutus from "./Components/aboutus/Aboutus";
import Place from "./Components/PlaceSites/Place";
import SiteInfo from "./Components/PlaceSites/SiteInfo";
import Sites from "./Components/PlaceSites/Sites";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import SearchComponent from "./Components/Main/SearchComponent";
import Profile from "./Components/Profile/Profile";
import React, { useState, useEffect } from 'react'
import PlaceState from "./Context/PlaceState";
import Review from "./Components/ReviewPage/Review";
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LoadingBar from 'react-top-loading-bar'
import ScrollToTop from './Components/ScrollToTop';


function App() {

  const createNotification = (type, msg) => {
    switch (type) {
      case 'info':
        NotificationManager.info(msg, 'testing', 3000);
        break;
      case 'success':
        NotificationManager.success(msg, '', 3000);
        break;
      case 'warning':
        NotificationManager.warning(msg, '', 3000);
        break;
      case 'error':
        NotificationManager.error(msg, 'Click me!', 5000, () => {
          alert('callback');
        });
        break;
      default:
        break;
    }
  };

  const [progress, setProgress] = useState(0);

  return (
    <div className="App">

      <LoadingBar
        color='#046B82'
        height={3}
        progress={progress}
      />

      <BrowserRouter>
        <ScrollToTop />
        <PlaceState createNotification={createNotification} setProgress={setProgress}>

          <Routes>
            <Route path="/" element={<Main createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/login" element={<Login createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/signup" element={<Signup createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/home" element={<Home createNotification={createNotification} setProgress={setProgress} />} />
            {/* <Route path="/search" element={<SearchComponent />} /> */}
            <Route path="/place/:placeid" element={<Place createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/todos" element={<Sites type="todos" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/hotels" element={<Sites type="hotels" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/restaurants" element={<Sites type="restaurants" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/place/:placeid/hotels" element={<Sites type="hotels" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/place/:placeid/todos" element={<Sites type="todos" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/place/:placeid/restaurants" element={<Sites type="restaurants" createNotification={createNotification} setProgress={setProgress} />} />


            <Route path="/hotels/siteinfo/:siteid" element={<SiteInfo type="hotels" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/todos/siteinfo/:siteid" element={<SiteInfo type="todos" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/restaurants/siteinfo/:siteid" element={<SiteInfo type="restaurants" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/place/:placeid/todos/siteinfo/:siteid" element={<SiteInfo type="todos" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/place/:placeid/hotels/siteinfo/:siteid" element={<SiteInfo type="hotels" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/place/:placeid/restaurants/siteinfo/:siteid" element={<SiteInfo type="restaurants" createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/aboutus" element={<Aboutus createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/profile" element={<Profile createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/givereview/:id" element={<Review createNotification={createNotification} setProgress={setProgress} />} />

          </Routes>
          <NotificationContainer />

        </PlaceState>

      </BrowserRouter>
    </div>
  );
}

export default App;
