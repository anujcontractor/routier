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
import PlaceState from "./Context/PlaceState";
import Review from "./Components/ReviewPage/Review";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import LoadingBar from 'react-top-loading-bar'

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
      <PlaceState createNotification={createNotification} setProgress={setProgress}>
      <LoadingBar
            color='#046B82'
            height={3}
            progress= {progress}
          />
        <BrowserRouter>
          <Alert alert={alert} />
          <Routes>
            <Route path="/" element={<Main createNotification={createNotification} setProgress={setProgress}/>} />
            <Route path="/login" element={<Login createNotification={createNotification} setProgress={setProgress} />} />
            <Route path="/signup" element={<Signup createNotification={createNotification} setProgress={setProgress}/>} />
            <Route path="/home" element={<Home createNotification={createNotification} setProgress={setProgress}/>} />
            {/* <Route path="/search" element={<SearchComponent />} /> */}
            <Route path="/place" element={<Place />} />
            <Route path="/todo" element={<Sites type="todo" />} />
            <Route path="/hotels" element={<Sites type="hotels" />} />
            <Route path="/restaurants" element={<Sites type="restaurants" />} />
            <Route path="/siteinfo/:id" element={<SiteInfo />} />
            <Route path="/aboutus" element={<Aboutus />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/givereview/:id" element={<Review />} />
          </Routes>
        </BrowserRouter>
        <NotificationContainer />
      </PlaceState>
    </div>
  );
}

export default App;
