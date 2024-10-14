import React, { createContext, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Home from "./components/Home/Home";
import NF404 from "./components/404/404";
import Hotels from "./components/hotels/Hotels";
import Flights from "./components/flights/Flights";
import Payments from "./components/payment/Payments";
import Profile from "./components/Profile/Profile";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import "./App.css";
import Results from "./components/Results/Results";
import Details from "./components/details/Details";
import BookHotel from "./components/bookHotel/BookHotel";
import BookFlight from "./components/bookFlight/BookFlight";
import { GoogleLogin } from '@react-oauth/google';

export const sharedInfoContext = createContext();
const App = () => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [logged, setLogged] = useState(localStorage.getItem("logged"));
  const [dataFound, setDataFound] = useState([]);
  const [showHotel, setShowHotel] = useState(false);
  const [showFlight, setShowFlight] = useState(true);
  const [info, setInfo] = useState([]);
  const [userInfo, setUserInfo] = useState();
  const [isGoogle, setIsGoogle] = useState(false);
  return (
    <sharedInfoContext.Provider
      value={{
        setToken,
        token,
        logged,
        setLogged,
        dataFound,
        setDataFound,
        showFlight,
        setShowFlight,
        showHotel,
        setShowHotel,
        info,
        setInfo,
        userInfo, setUserInfo,
        isGoogle, setIsGoogle
      }}
    >
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/pay/:id" element={<Payments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/results" element={<Results />} />
          <Route path="/det/:id" element={<Details />} />
          <Route path="/bookH/:id" element={<BookHotel />} />
          <Route path="/bookF/:id" element={<BookFlight />} />
          <Route path="*" element={<NF404 />} />
        </Routes>
      
        
      </div>
    </sharedInfoContext.Provider>
  );
};

export default App;
