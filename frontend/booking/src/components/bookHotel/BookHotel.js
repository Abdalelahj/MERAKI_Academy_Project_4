import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Popup from "../popup/Popup";
import { Input } from "antd";
import { Button, Result, Modal } from "antd";
import "./bookHotel.css";
const BookHotel = () => {
  const { token ,showHotel,
    showFlight } = useContext(sharedInfoContext);
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState({
    hotelId: id,
  });
  const [booked, setBooked] = useState(false);
  const navigate = useNavigate();
  const handleBooking = () => {
    if (token) {
      if (Object.keys(bookInfo).length > 1) {
        axios
          .post("http://localhost:5000/bookHotel", bookInfo, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((results) => {
            console.log(results.data);
            setBooked(true);

                navigate(`/pay/${id}`)

            // Modal.success({
            //   title: "Booked successfully",
            //   content: `Hotel book id-number: ${id}`,
            //   footer: (_, { OkBtn, CancelBtn }) => (
            //     <>
            //       <Button href="#">Back Home</Button>
            //       <CancelBtn />

            //       <button onClick={()=>{navigate(`/pay/${id}`)}}
            //       >Pay now</button>
            //     </>
            //   ),
            // });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        Modal.error({
          title: "Fill all fields",
          content: "All fields are required",
          footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <OkBtn />
            </>
          ),
        });
      }
    } else {
      Modal.confirm({
        title: "Login required",
        content: "You need to login first",
        footer: (_, { OkBtn, CancelBtn }) => (
          <>
            <CancelBtn />
            <Button href="/login">ok</Button>
          </>
        ),
      });
    }
  };


  console.log("h",showHotel);
  console.log("f",showFlight);
  
  
  return (
    <div className="parentHotelB">
      <div className="headerHot">
        <h1>Fill all fields with required information</h1>
        <p>
          * All data must be correct and passport expiry date must be valid for
          at least six months.
        </p>
      </div>

      <div className="reqInfo">
        <label>
          <span>First Name</span>
          <Input
            placeholder="Type your first name"
            className="inpB"
            onChange={(e) => {
              setBookInfo({ ...bookInfo, firstName: e.target.value });
            }}
          />
        </label>

        <label>
          <span>Last Name</span>
          <Input
            placeholder="Type your last name"
            className="inpB"
            onChange={(e) => {
              setBookInfo({ ...bookInfo, lastName: e.target.value });
            }}
          />
        </label>

        <label>
          <span>Email</span>
          <Input
            placeholder="Type your email"
            className="inpB"
            type="email"
            onChange={(e) => {
              setBookInfo({ ...bookInfo, email: e.target.value });
            }}
          />
        </label>

        <label>
          <span>Phone number</span>
          <Input
            placeholder="Type your phone number"
            className="inpB"
            type="Number"
            onChange={(e) => {
              setBookInfo({ ...bookInfo, phoneNumber: e.target.value });
            }}
          />
        </label>
        <label>
          <span>country</span>
          <Input
            placeholder="Type your country"
            className="inpB"
            onChange={(e) => {
              setBookInfo({ ...bookInfo, country: e.target.value });
            }}
          />
        </label>
        <label>
          <span>privateOrders</span>
          <Input
            placeholder="Type your private orders if you have any"
            className="inpB"
            onChange={(e) => {
              setBookInfo({ ...bookInfo, privateOrders: e.target.value });
            }}
          />
        </label>
        <br></br>
        <button className="submitH" onClick={handleBooking}>
          Book hotel
        </button>
      </div>

      {/* {booked && <Popup msg={"Hotel Booked successfully"} />} */}
    </div>
  );
};

export default BookHotel;
