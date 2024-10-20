import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import Popup from "../popup/Popup";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { Input } from "antd";
import { Button, Result, Modal } from "antd";

const Payments = () => {
  const { token, showHotel, showFlight } = useContext(sharedInfoContext);
  const [payInfo, setPayInfo] = useState({});
  const [price, setPrice] = useState({});
  const [successfully, setSuccessfully] = useState(false);
  const navigate = useNavigate();
  const [hotelPrice, setHotelPrice] = useState({});
  useEffect(() => {
    axios
      .get(`http://localhost:5000/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {    
        setPrice({
          ...price,
          flightPrice: result.data.secretInfo[0].flightId?.price,
        });
        setHotelPrice({
          ...hotelPrice,
          hotel: result.data.secretInfo[0].hotelId.price,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [payInfo]);

  const payHandler = () => {
    if(Object.keys(payInfo).length>3){
      axios
      .post("http://localhost:5000/pay", payInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setSuccessfully(true);

        Modal.success({
            title: "Payment successful",
            content: `Total ${showFlight &&price.flightPrice ||showHotel && hotelPrice.hotel } `,
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <Button href="/">Ok</Button>
                <CancelBtn />
              </>
            ),
          });
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
   
  };

  // console.log(price);

  // console.log(hotelPrice);
  // console.log(showFlight);
  // console.log(showHotel);
  console.log(payInfo);
  

  return (
    <div className="parentPay">
      <div>
        <h3>{showHotel && <>Required payment : {hotelPrice?.hotel}</>}</h3>
        <h3>{showFlight && <>Required payment : {price?.flightPrice}</>}</h3>
      </div>
      <div className="payInp">
        <label>
          <span>Name</span>
          <Input
            placeholder="Type your name"
            className="inpB"
            onChange={(e) => {
              setPayInfo({ ...payInfo, name: e.target.value });
            }}
          />
        </label>
        <br></br>
        <label>
          <span>Card number</span>
          <Input
           type="Number"
            placeholder="Enter your card number"
            className="inpB"
            onChange={(e) => {
              setPayInfo({ ...payInfo, cardNumber: e.target.value });
            }}
          />
        </label>
        <br></br>
        <label>
          <span>Expiry</span>
          <Input
            type="date"
            placeholder="Enter your card expiry date"
            className="inpB"
            onChange={(e) => {
              setPayInfo({ ...payInfo, expiry: e.target.value });
            }}
          />
        </label>
        <br></br>
        <label>
          <span>CCV</span>
          <Input
            type="Number"
            placeholder="Enter your CCV"
            className="inpB"
            onChange={(e) => {
              setPayInfo({ ...payInfo, CCV: e.target.value });
            }}
          />
        </label>
      </div>

      <br></br>
      <button className="submit_pay" onClick={payHandler}>
        Confirm
      </button>

      {/* {successfully && <Popup msg={"Payment successful!"} />} */}
    </div>
  );
};

export default Payments;
