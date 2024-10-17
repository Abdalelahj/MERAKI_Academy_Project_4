import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { sharedInfoContext } from "../../App";
const ContactUs = () => {
  const { token } = useContext(sharedInfoContext);
  const [info, setInfo] = useState({});

  const handleAdd = () => {
    axios
      .post("http://localhost:5000/flight", info, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(info);

  return (
    <div>
      ContactUs
      <br></br>
      destinationFrom
      <input
        onChange={(e) => {
          setInfo({ ...info, destinationFrom: e.target.value });
        }}
      />
      <br></br>
      destinationTo
      <input
        onChange={(e) => {
        
          
          setInfo({ ...info, destinationTo: e.target.value });
        }}
      />
      <br></br>
      dateLeaving
      <input
        type="date"
        onChange={(e) => {
          console.log(new Date(e.target.value));
          
          setInfo({ ...info, dateLeaving:e.target.value });
        }}
      />
      <br></br>
      dateReturning
      <input
        type="date"
        onChange={(e) => {
          setInfo({ ...info, dateReturning: e.target.value });
        }}
      />
      <br></br>
      <input type="file" 
         onChange={(e) => {
          setInfo({ ...info, logo: "https://assets.wego.com/image/upload/h_64,c_fit,f_auto,fl_lossy,q_auto:low/v20241017/flights/airlines_rectangular/RJ.png" });
        }} />
      <br></br>
      <button onClick={handleAdd}>submit</button>
    </div>
  );
};

export default ContactUs;
