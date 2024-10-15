import React, { useState, useContext, useEffect } from "react";
import { sharedInfoContext } from "../../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Results from "../Results/Results";
import Popup from "../popup/Popup";
import "./home.css";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import BasicModal from "./Model";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
const Home = () => {
  const {
    setToken,
    setLogged,
    logged,
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

  console.log(flights);

  return (
    <div>
      <h1>Home</h1>
      <Button
        onClick={() => {
          setShowHotel(false);
          setShowFlight(true);
        }}
        className={showFlight ? "active" : "notActive"}
      >
        Flights
      </Button>

      <Button
        onClick={() => {
          setShowFlight(false);
          setShowHotel(true);
        }}
        className={showHotel ? "active" : "notActive"}
      >
        Hotels
      </Button>

      {showHotel && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Stack
              spacing={2}
              sx={{ width: 300 }}
              onChange={(e) => {
                setSearch({ ...search, destination: e.target.value });
                <BasicModal />;
              }}
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                options={capitals.map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Search input"
                    slotProps={{
                      input: {
                        ...params.InputProps,
                        type: "search",
                      },
                    }}
                  />
                )}
              />
            </Stack>
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
            {clicked && <Popup msg={"fill the search field "} />}
          </Box>
        </>
      )}
      {showFlight && (
        <>
          <br></br>
          <label>
            <span>destination from</span>
            <OutlinedInput
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DateField"]}>
              <DatePicker
                onChange={(e) => {
                  console.log(new Date(e));

                  setSearch({ ...search, dateLeaving:new Date(e) });
                }}
              />
              date Leaving
            </DemoContainer>
            {/* <DatePicker label={'"month" and "day"'} views={['month', 'day']} /> */}
          </LocalizationProvider>
          {/* 
          <label>
            <span>date Leaving</span>
            <input
              type="text"
             
            />
          </label> */}
          <br></br>
          <button onClick={flightSearch}>Search</button>
          {clicked && <Popup msg={"fill the search field "} />}
        </>
      )}

      <Box></Box>
    </div>
  );
};

export default Home;

const capitals = [
  {
    title: "Amman",
    airport: "Queen Alya Int.airport",
  },
  {
    title: "Cairo",
    airport: "Cairo Int.airport",
  },
  {
    title: "Beirut",
    airport: "Beirut Int.airport",
  },
  {
    title: "Mecca",
    airport: "Mecca Int.airport",
  },
];
