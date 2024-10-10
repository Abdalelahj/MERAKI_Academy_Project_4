import React, { useState, useContext, useEffect } from "react";
import { sharedInfoContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Results from "../Results/Results";
import Popup from "../popup/Popup";
import "./home.css"
const Home = () => {
  const {
    setToken,
    setLogged,
    logged,
    dataFound,
    setDataFound,
    showHotel,
    setShowHotel,
    showFlight,
    setShowFlight,
  } = useContext(sharedInfoContext);
  const [hotels, setHotels] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [search, setSearch] = useState({});

  const [flights, setFlights] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/hotel")
      .then((result) => {
        setHotels(result.data.search);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/flight")
      .then((result) => {
        console.log(result.data.flight);

        setFlights(result.data.flight);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const hotelSearch = () => {
    setClicked(true);
    if (Object.keys(search).length) {
      const findHotels = hotels.filter((item) => {
        return (
          item.destination === search.destination &&
          item.dateFrom === search.dateFrom &&
          item.numberOfRooms === search.numberOfRooms
        );
      });
      setDataFound(findHotels);
      navigate(`/results `);
    }
  };


  const flightSearch = () => {
    setClicked(true);
    if (Object.keys(search).length) {
      const findFlights = flights.filter((item, i) => {
        return (
          item.destinationFrom === search.destinationFrom &&
          item.destinationTo === search.destinationTo &&
          item.dateLeaving === search.dateLeaving
        );
      });
      console.log(findFlights);

      setDataFound(findFlights);
      navigate(`/results `);
    }
  };
  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={() => {
          setShowHotel(false);
          setShowFlight(true);
        }}
        className={showFlight ? "active" : "notActive"}
      >
        Flights
      </button>
      <button
        onClick={() => {
          setShowFlight(false);
          setShowHotel(true);
        }}
        className={showHotel ? "active" : "notActive"}
      >
        Hotels
      </button>

      {showHotel && (
        <>
          <br></br>
          <label>
            <span>destination</span>
            <input
              type="text"
              onChange={(e) => {
                setSearch({ ...search, destination: e.target.value });
              }}
            />
          </label>
          <br></br>
          <label>
            <span>date From</span>
            <input
              type="text"
              onChange={(e) => {
                setSearch({ ...search, dateFrom: e.target.value });
              }}
            />
          </label>
          <br></br>
          <label>
            <span>numberOfRooms</span>
            <input
              type="Number"
              onChange={(e) => {
                setSearch({ ...search, numberOfRooms: e.target.value });
              }}
            />
          </label>
          <br></br>
          <button onClick={hotelSearch}>Search</button>
          {clicked && <Popup />}
        </>
      )}
      {showFlight && (
        <>
          <br></br>
          <label>
            <span>destination from</span>
            <input
              type="text"
              onChange={(e) => {
                setSearch({ ...search, destinationFrom: e.target.value });
              }}
            />
          </label>
          <br></br>
          <label>
            <span>destination to</span>
            <input
              type="text"
              onChange={(e) => {
                setSearch({ ...search, destinationTo: e.target.value });
              }}
            />
          </label>
          <br></br>
          <label>
            <span>date Leaving</span>
            <input
              type="text"
              onChange={(e) => {
                setSearch({ ...search, dateLeaving: e.target.value });
              }}
            />
          </label>
          <br></br>
          <button onClick={flightSearch}>Search</button>
          {clicked && <Popup />}
        </>
      )}
    </div>
  );
};

export default Home;
