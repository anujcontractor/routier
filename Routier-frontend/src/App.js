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
// import Review from "./Components/SE-Review/Review";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
    </div>
  );
}

export default App;
