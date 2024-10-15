import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { sharedInfoContext } from "../../App";
const ContactUs = () => {
  const { token } = useContext(sharedInfoContext);
  const [info, setInfo] = useState({});

  
  const handleAdd=()=>{


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
      }
  
 
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
        onChange={(e) => {
          setInfo({ ...info, dateLeaving: new Date(e.target.value)});
        }}
      />
      <br></br>
      dateReturning
      <input
        onChange={(e) => {
          setInfo({ ...info, dateReturning: new Date(e.target.value) });
        }}
      />
      <br></br>
      <button onClick={handleAdd}>submit</button>
    </div>
  );
};

export default ContactUs;

