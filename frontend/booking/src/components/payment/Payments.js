import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import Popup from "../popup/Popup";
import { useNavigate } from "react-router-dom";

const Payments = () => {
  const { token ,showHotel,showFlight } = useContext(sharedInfoContext);
const [payInfo, setPayInfo] = useState({})
const [price, setPrice] = useState({})
const [successfully, setSuccessfully] = useState(false)
const navigate=useNavigate()
const [hotelPrice, setHotelPrice] = useState({})
  useEffect(() => {
    axios
      .get(`http://localhost:5000/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        console.log(result.data.secretInfo[0].hotelId.price);
        setPrice({...price,flightPrice:result.data.secretInfo[0].flightId?.price})
  setHotelPrice({...hotelPrice,hotel :result.data.secretInfo[0].hotelId.price})
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const payHandler=()=>{
    axios.post("http://localhost:5000/pay",payInfo,{
      headers: {
        Authorization:`Bearer ${token}`
      }
    })
    .then(result=>{
      console.log(result);
      setSuccessfully(true)
      setTimeout(() => {
        navigate("/")
      }, 3000);
    })
    .catch(err=>{
      console.log(err);
      
    })
  }

  console.log(price);

  console.log(hotelPrice);
  console.log(showFlight);
  console.log(showHotel);
  
  return <div>
    
    <h3>{showHotel&&<>required payment : {hotelPrice?.hotel}</>}</h3>
    <h3>{showFlight&&<>required payment : {price?.flightPrice}</>}</h3>
        <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          onChange={(e) => {
            setPayInfo({ ...payInfo, name: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>card Number</span>
        <input
          type="text"
          name="cardNumber"
          onChange={(e) => {
            setPayInfo({ ...payInfo, cardNumber: e.target.value });
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
            setPayInfo({ ...payInfo, expiry: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>CCV</span>
        <input
          type="text"
          name="CCV"
          onChange={(e) => {
            setPayInfo({ ...payInfo, CCV: e.target.value });
          }}
        />
      </label>
      <br></br>
      <button onClick={payHandler}>confirm</button>

      {successfully&& <Popup msg={"Payment successful!"} />}
  </div>;
};

export default Payments;
