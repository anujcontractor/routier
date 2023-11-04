import "./App.css";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


import Signup from "./Components/LoginSignup/Signup";
import Login from "./Components/LoginSignup/Login";
import Place from "./Components/PlaceSites/Place"
import SiteInfo from "./Components/PlaceSites/SiteInfo";
import Sites from "./Components/PlaceSites/Sites";

function App() {


  const [currPage, setCurrPage] = useState("signup");
  return (
    
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/place" element={<Place />} />
            <Route path="/todo" element={<Sites type = 'to do' />} />
            <Route path="/hotels" element={<Sites type = 'hotels'/>} />
            <Route path="/restaurants" element={<Sites type = 'restaurants'/>} />
            <Route path="/siteinfo" element={<SiteInfo />} />
          </Routes>
        </BrowserRouter>
      </div>
   
  );
}

export default App;
