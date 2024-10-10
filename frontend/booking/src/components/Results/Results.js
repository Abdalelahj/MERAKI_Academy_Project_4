import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { useNavigate,Link } from "react-router-dom";
import "./results.css";
const Results = () => {
  const { dataFound, showFlight, showHotel } = useContext(sharedInfoContext);
  const navigate = useNavigate();

  const handleClick=(e)=>{
    console.log(e);
    
  }
  return (
    <div>
      <h1>Results</h1>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Home
      </button>

      {dataFound.length && showHotel ? (
        dataFound.map((item) => {
            console.log(item);
            
          return (
            <div  key={item._id} className="parent" onClick={(e)=>{handleClick(e)}}>
              <p>{item.destination}</p>
              <p>{item.dateFrom}</p>
              <img src={item.image} />
              <p>{item.price}</p>
              <p>{item.rating}</p>
              <p>{item.title}</p>
              <Link to={`/det/${item._id}`}>see more details</Link>
            </div>
          );
        })
      ) : dataFound.length && showFlight ? (
        dataFound.map((item) => {
          return (
            <div key={item._id} className="parent">
              <p>{item.destinationFrom}</p>
              <p>{item.destinationTo}</p>
              <p>{item.dateLeaving}</p>
              <p>{item.dateReturning}</p>
              <Link to={`/det/${item._id}`}>see more details</Link>
            </div>
          );
        })
      ) : (
        <p>No result found</p>
      )}
    </div>
  );
};

export default Results;
