import React, { useState, useContext, useEffect } from "react";
import { sharedInfoContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";
import "./home.css";
import { Flex, Input, InputNumber } from "antd";
import InputL from "./FlightInp";
import HotelInp from "./HotelInp";
import Frequent from "./Questions";
import { Divider } from "antd";
import Explore from "./Explore";
import Poster from "./Poster";
import InputAuto from "./Model";
const Home = () => {
  const { setDataFound, showHotel, setShowHotel, showFlight, setShowFlight } =
    useContext(sharedInfoContext);

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
      setDataFound(findFlights);
      navigate(`/results `);
    }
  };

console.log(showFlight);

  return (
    <div className="home">
      <div className="boton">
        <button
          onClick={() => {

            setShowHotel(false);
            setShowFlight(true);
            // localStorage.setItem("showF",true)
            // localStorage.setItem("showH","")
          }}
          className={showFlight ? "active" : "notActive"}
          id="btn"
        >
          Flights
        </button>

        <button
          onClick={() => {
            setShowFlight(false);
            setShowHotel(true);
            // localStorage.setItem("showH",true)
            // localStorage.setItem("showF","")
          }}
          className={showHotel ? "active" : "notActive"}
          id="btn"
        >
          Hotels
        </button>
      </div>
      <div>
        {showHotel && (
          <>
            <div className="parentInpH">
              <div
                style={{ display: "flex", gap: "1em", alignItems: "center" }}
                className="innerDiv"
              >
                <span>Destination</span>
                <HotelInp setSearch={setSearch} search={search} />
              </div>

              <div
                style={{ display: "flex", gap: "0.9em" }}
                className="innerDiv"
              >
                <div
                  style={{ display: "flex", gap: "1em", alignItems: "center" }}
                >
                  <span>Date from</span>
                  <input
                    id="HdInp"
                    type="date"
                    onChange={(e) => {
                      setSearch({ ...search, dateFrom: e.target.value });
                    }}
                  />
                </div>

                <div
                  style={{ display: "flex", gap: "1em", alignItems: "center" }}
                >
                  <span>Guest/s</span>
                  <InputNumber
                    size="large"
                    className="RnmInp"
                    min={1}
                    max={10}
                    defaultValue={1}
                    onChange={(e) => {
                      setSearch({ ...search, numberOfRooms: e });
                    }}
                  />
                </div>
              </div>
              <button className="submit" onClick={hotelSearch}>
                Search
              </button>
              {clicked && <Popup msg={"fill the search field "} />}
            </div>
          </>
        )}

        {showFlight && (
          <>
            <Flex
              vertical
              gap={50}
              style={{ alignItems: "flex-end", marginInlineEnd: "100px" }}
              className="parentInp"
            >
              <div
                style={{ display: "flex", gap: "1em", alignItems: "center" }}
                className="innerDiv"
              >
                <span>Destination from</span>
                <Input
                  size="large"
                  className="inp_1"
                  placeholder="Outlined"
                  style={{
                    width: 400,
                  }}
                  onChange={(e) => {
                    setSearch({ ...search, destinationFrom: e.target.value });
                  }}
                />
              </div>

              <div
                style={{ display: "flex", gap: "1em", alignItems: "center" }}
                className="innerDiv"
              >
                <span>Destination to</span>
                <InputL setSearch={setSearch} search={search} />
              </div>
              <div
                style={{ display: "flex", gap: "1em", alignItems: "center" }}
                className="innerDiv"
              >
                <span>Date from</span>
                <input
                  type="date"
                  className="dateInp"
                  onChange={(e) => {
                    setSearch({ ...search, dateLeaving: e.target.value });
                  }}
                />
              </div>
              <button onClick={flightSearch} className="submit">
                Search
              </button>
            </Flex>
            {clicked && <Popup msg={"fill the search field "} />}
          </>
        )}
      </div>
      <Divider
        style={{
          borderColor: "#4c49495b",
        }}
      ></Divider>

      <div className="contentParent">
        <div>
          <Poster />
        </div>

        <div className="logoP">
          <div id="text">
            <h4>Popular Airlines in Jordan</h4>
            <p> Book Cheap Flights on Your Favorite Airlines</p>
          </div>
          <div className="logos">
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/RJ.png"
              alt="الملكية الأردنية"
            />
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/PC.png"
              alt="طيران بيجاسوس التركي Pegasus"
            ></img>
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/TK.png"
              alt="الخطوط التركية"
            />
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/FZ.png"
              alt="فلاي دبي"
            ></img>
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/MS.png"
              alt="مصر للطيران"
            ></img>
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/R5.png"
              alt="الأردنية للطيران"
            ></img>
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/EK.png"
              alt="طيران الامارات"
            ></img>
            <img
              src="https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/G9.png"
              alt="العربية للطيران"
            ></img>
          </div>
        </div>

        <div className="popPlaces">
          <div id="text">
            <h4>Explore Jordan</h4>
            <p> These popular destinations have a lot to offer</p>
          </div>
          <Explore />
        </div>
        <div className="frqMom">
          <span style={{ alignSelf: "self-start", marginLeft: "7em" }}>
            Frequent questions
          </span>
          <div className="frq">

          <Frequent />
          </div>
        </div>
        <div style={{marginTop:"4em"}}>

        <InputAuto/>
        </div>
      </div>
    </div>
  );
};

export default Home;
