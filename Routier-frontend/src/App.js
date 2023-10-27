import "./App.css";
import Login from "./Components/LoginSignup/Login";
import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";


function App() {

  return (

    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
