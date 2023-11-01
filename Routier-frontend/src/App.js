import "./App.css";
import Login from "./Components/LoginSignup/Login";
import Signup from "./Components/LoginSignup/Signup";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (

    <GoogleOAuthProvider clientId="169559215961-i0o7klhc5rhvsm81nctt95v7drpnenjj.apps.googleusercontent.com">
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
    </GoogleOAuthProvider>
  );
}

export default App;
