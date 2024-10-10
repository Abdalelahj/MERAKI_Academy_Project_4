import axios from "axios";
import React, { useContext, useState } from "react";
import { sharedInfoContext } from "../../App";
import { useParams } from "react-router-dom";
const BookFlight = () => {
  const { token } = useContext(sharedInfoContext);
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState({gender:"Male" ,flightId:id });

  

  const handleBooking = () => {
    axios
      .post("http://localhost:5000/book", bookInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((results) => {
        console.log(results.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
console.log(bookInfo);

  return (
    <div>
      <label>
        <span>first Name</span>
        <input
          type="text"
          name="firstName"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, firstName: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>last Name</span>
        <input
          type="text"
          name="lastName"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, lastName: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>expiry</span>
        <input
          type="text"
          name="expiry"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, expiry: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, email: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>phoneNumber</span>
        <input
          type="Number"
          name="phoneNumber"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, phoneNumber: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>birth Date</span>
        <input
          type="text"
          name="birthDate"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, birthDate: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>nationality</span>
        <input
          type="text"
          name="nationality"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, nationality: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>passportNumber</span>
        <input
          type="text"
          name="passportNumber"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, passportNumber: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>gender</span>
        <select
          onChange={(e) => {
            setBookInfo({ ...bookInfo, gender: e.target.value });
          }}
        >
          <option>Male</option>
          <option>Female</option>
        </select>
      </label>
      <br></br>
      <button onClick={handleBooking}>book</button>
    </div>
  );
};

export default BookFlight;
