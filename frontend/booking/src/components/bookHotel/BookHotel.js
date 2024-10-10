import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { useParams,useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../popup/Popup";

const BookHotel = () => {
  const { token } = useContext(sharedInfoContext);
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState({
    hotelId: id,
  });
  const [booked, setBooked] = useState(false);
const navigate=useNavigate()
const handleBooking=()=>{
    axios
    .post("http://localhost:5000/bookHotel", bookInfo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((results) => {
      console.log(results.data);
      setBooked(true)
      setTimeout(() => {
        navigate(`/pay/${id}`)
      }, 2000);
    })
    .catch((err) => {
      console.log(err);
    });
}
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
        <span>country</span>
        <input
          type="text"
          name="country"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, country: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>privateOrders</span>
        <input
          type="text"
          name="privateOrders"
          onChange={(e) => {
            setBookInfo({ ...bookInfo, privateOrders: e.target.value });
          }}
        />
      </label>
      <br></br>
      <button onClick={handleBooking}>book hotel</button>
      {booked &&<Popup  msg={"Hotel Booked successfully"} />}
    </div>
  );
};

export default BookHotel;
