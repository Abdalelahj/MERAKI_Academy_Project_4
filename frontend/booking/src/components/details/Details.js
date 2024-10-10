import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { sharedInfoContext } from "../../App";
const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const { showHotel, showFlight } = useContext(sharedInfoContext);
  useEffect(() => {
    if (showHotel) {
      axios
        .get(`http://localhost:5000/hotel/${id}`)
        .then((result) => {
          setDetails(result.data.search);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (showFlight) {
      axios
        .get(`http://localhost:5000/flight/${id}`)
        .then((result) => {
          console.log(result.data);
          setDetails(result.data.flight);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log(showHotel);
  console.log(showFlight);
  console.log(details);

  return (
    <>
      <div>Details</div>

      {showHotel && (
        <>
          {details?.map((item, i) => {
            return (
              <div key={i}>
                <p>title: {item.title}</p>
                <p>dateFrom: {item.dateFrom}</p>
                <p>destination: {item.destination}</p>
                <p>distanceFromCenter: {item.distanceFromCenter}</p>
                <p>numberOfReviews: {item.numberOfReviews}</p>
                <p>numberOfRooms: {item.numberOfRooms}</p>
                <p>price: {item.price}</p>
                <p>rating: {item.rating}</p>
              </div>
            );
          })}

          <Link to={`/bookH/${id}`}>Book hotel</Link>
        </>
      )}

      {showFlight && (
        <>
          {details?.map((item, i) => {
            return (
              <div key={i}>
                <p>company: {item.company}</p>
                <p>dateLeaving: {item.dateLeaving}</p>
                <p>dateReturning: {item.dateReturning}</p>
                <p>destinationFrom: {item.destinationFrom}</p>
                <p>destinationTo: {item.destinationTo}</p>
                <p>price: {item.price}</p>
                <p>timeFrom: {item.timeFrom}</p>
                <p>timeTo: {item.timeTo}</p>
              </div>
            );
          })}

          <Link to={`/bookF/${id}`}>Book flight</Link>
        </>
      )}
    </>
  );
};

export default Details;
