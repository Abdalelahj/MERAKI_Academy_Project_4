import axios from "axios";
import React, { useContext, useState } from "react";
import { sharedInfoContext } from "../../App";
import { useParams, useNavigate } from "react-router-dom";
import Popup from "../popup/Popup";
import { Input } from "antd";
import "./bookFlight.css";
import { Radio, Space } from "antd";
import { Button, Result,Modal } from "antd";

const BookFlight = () => {
  

  const { token } = useContext(sharedInfoContext);
  const { id } = useParams();
  const [bookInfo, setBookInfo] = useState({ gender: "Male", flightId: id });
  const [booked, setBooked] = useState(false);
  const navigate = useNavigate();
  const handleBooking = () => {
    if (token) {
      if(Object.keys(bookInfo).length>2){

      
      axios
        .post("http://localhost:5000/book", bookInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((results) => {
          console.log(results.data);

          navigate(`/pay/${id}`)
          // Modal.success({
          //   title: 'Booked successfully',
          //   content: `Flight number: ${id}`,
          //   footer: (_, { OkBtn, CancelBtn }) => (
          //     <>
          //       <Button href="/" >Back Home</Button>
          //       <CancelBtn />
       
          //       <Button   href={`/pay/${id}`}>Pay now</Button>
          //     </>
          //   ),
          // });
          // setBooked(true);
        })
        .catch((err) => {
          console.log(err);
        });
      }else{
        Modal.error({
          title: 'Fill all fields',
          content: 'All fields are required',
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
          title: 'Login required',
          content: 'You need to login first',
          footer: (_, { OkBtn, CancelBtn }) => (
            <>
              <CancelBtn />
              <Button   href="/login">ok</Button>
            </>
          ),
        });
   
    }
  };
  // console.log(bookInfo);
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setBookInfo({ ...bookInfo, gender: e.target.value });
    setValue(e.target.value);
  };
  
  
  return (
    <div className="parentInputat">
      <div className="titleFlight">
        <h2>Book flights with Saferni</h2>
        <p>Make sure to fill all fields</p>
      </div>

      <div className="svIn">
        <div className="svIn_1">
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
        </div>

        <div className="svIn_2">
          <label>
            <span>Birth date</span>
            <Input
              placeholder="select your birth date"
              className="inpB"
              type="date"
              onChange={(e) => {
                setBookInfo({ ...bookInfo, birthDate: e.target.value });
              }}
            />
          </label>
          <label>
            <span>Nationality</span>
            <Input
              placeholder="Type your nationality"
              className="inpB"
              onChange={(e) => {
                setBookInfo({ ...bookInfo, nationality: e.target.value });
              }}
            />
          </label>

          <label>
            <span>Passport number</span>
            <Input
              placeholder="Type your passport number"
              className="inpB"
              onChange={(e) => {
                setBookInfo({ ...bookInfo, passportNumber: e.target.value });
              }}
            />
          </label>
          <label>
            <span>Expiry date</span>
            <Input
              type="date"
              placeholder="select your passport expiry date"
              className="inpB"
              onChange={(e) => {
                setBookInfo({ ...bookInfo, expiry: e.target.value });
              }}
            />
          </label>
          <label className="gender">
            <span>Gender</span>

            <Radio.Group
              onChange={onChange}
              value={value}
              defaultValue={"Male"}
            >
              <Space direction="vertical">
                <Radio value={"Male"}>Male</Radio>
                <Radio value={"Female"}>Female</Radio>
              </Space>
            </Radio.Group>
          </label>
        </div>

        <button className="submitB" onClick={handleBooking}>
          Book Now
        </button>

        { booked&&
          <Result
            status="success"
            title="Successfully Booked Your Flight!"
            subTitle={`Flight number: ${id}`}
            extra={[
              <Button key="home" href="/">
                Home
              </Button>,
              <Button type="primary" key="buy" href={`/pay/${id}`}
              >
                Pay now
              </Button>,
            ]}
            className="extrapop"
          />}
   
      </div>
    </div>
  );
};

export default BookFlight;
