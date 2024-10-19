import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { sharedInfoContext } from "../../App";
import "./Detail.css";
import { Rate } from "antd";
import QuiltedImageList from "./ImageCol";
import { CiForkAndKnife } from "react-icons/ci";
import { CiDumbbell } from "react-icons/ci";
import { BiBriefcase } from "react-icons/bi";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineWifi } from "react-icons/ai";
import { TbCalendarPin } from "react-icons/tb";
import { TbCalendarCheck } from "react-icons/tb";
import { BiMap } from "react-icons/bi";
import { BiBus } from "react-icons/bi";
import { BiWifi } from "react-icons/bi";
import { BiBriefcaseAlt } from "react-icons/bi";
import { FaCar } from "react-icons/fa";
import Paper from "@mui/material/Paper";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Slider } from "antd";
import { Card, Space } from "antd";
import { Container } from "@mui/material";
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

  console.log("h",showHotel);
  console.log("f",showFlight);
  console.log(details);

  return (
    <>
      {showHotel && (
        <>
          {details?.map((item, i) => {
            return (
              <div key={i} className="parentDetail">
                <div className="header">
                  <div className="title">
                    <h2>{item.title}</h2>
                    <div style={{ display: "flex", gap: "20px" }}>
                      <p>{item.price}</p>
                      <Link className="myLink" to={`/bookH/${id}`}>
                        Book hotel
                      </Link>
                    </div>
                  </div>

                  <p id="rateMe">
                    {" "}
                    <Rate disabled defaultValue={item.rating} />
                  </p>
                </div>
                <div className="imageWrapper">
                  <div className="image">
                    <img src={item.image} />
                    <QuiltedImageList />
                  </div>
                  <div
                    style={{ display: "flex", padding: "10px" }}
                    className="ratingWrapper"
                  >
                    <p id="ratingNum">
                      {(
                        Math.round(
                          ((item.rating * item.numberOfReviews) /
                            (item.numberOfReviews * 5)) *
                            10 *
                            10
                        ) / 10
                      ).toFixed(1)}
                    </p>
                    <p>{item.numberOfReviews} Reviews</p>
                  </div>
                </div>
                <div className="iconParent">
                  <div>
                    <CiForkAndKnife />
                    <p>Restaurant</p>
                  </div>
                  <div>
                    <CiDumbbell />
                    <p>Gym</p>
                  </div>
                  <div>
                    <BiBriefcase />
                    <p>Business center</p>
                  </div>
                  <div>
                    <svg fill="" viewBox="0 0 24 24" height={15}>
                      <g>
                        <path d="M9.725 5a2 2 0 100-4 2 2 0 000 4zM8.058 5.11a2 2 0 011.401 1.823l2.216 2.492 4.316 1.812a1 1 0 01-.774 1.844l-4.526-1.9a1 1 0 01-.36-.257L8.854 9.262 7.49 13.617a2 2 0 01-3.817-1.195l1.879-6A2 2 0 018.058 5.11zM21.085 17.57a2 2 0 11-4 0 2 2 0 014 0z"></path>
                        <path d="M16.18 19.024a2 2 0 00-1.73-3.005H3a2 2 0 100 4h11.268l2.903 2.49a1 1 0 00.65.241H22a1 1 0 100-2h-3.808l-2.013-1.726z"></path>
                        <path d="M1 22.02a1 1 0 011-1h11.45a1 1 0 110 2H2a1 1 0 01-1-1z"></path>
                      </g>
                    </svg>
                    <p>Spa</p>
                  </div>
                </div>
                <div className="parentDet">
                  <div className="det">
                    <h4>Details</h4>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Itaque autem nostrum quisquam consequatur, quasi adipisci
                      molestias quia. At earum minima nostrum incidunt excepturi
                      fugit, quibusdam, illum eligendi facilis perspiciatis
                      sunt.
                    </p>
                    <p className="contact">
                      <BiMap />
                      From center<span>{item.distanceFromCenter}</span>{" "}
                    </p>
                    <p className="contact">
                      {" "}
                      <BiPhoneCall /> Contact<span>966125262555</span>{" "}
                    </p>
                    <p className="contact">
                      <TbCalendarPin /> Check in time <span>04:00 PM</span>
                    </p>
                    <p className="contact">
                      <TbCalendarCheck /> Check out time <span>12:00 PM</span>
                    </p>
                  </div>
                  <div style={{ display: "grid", gap: "2em", padding: "2em" }}>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <AiOutlineWifi />
                      <p>Free WiFi</p>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <BiBus />
                      <p>Transportation</p>
                    </div>
                    <div style={{ display: "flex", gap: "5px" }}>
                      <BiWifi />
                      <p>Fast Wifi</p>
                    </div>

                    <div style={{ display: "flex", gap: "5px" }}>
                      <FaCar />
                      <p>Rent car</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}

      {showFlight && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {details?.map((item, i) => {
              return (
                <div key={i} className="parentFlight">
                  <Card className="parentCard" title="Trip summary">
                    <div className="collect">
                      <div id="headerF">
                        <p> {item.destinationFrom}</p>
                        <FaLongArrowAltRight style={{ fontSize: "30px" }} />
                        <p> {item.destinationTo}</p>
                        <span>Duration:2hr</span>
                      </div>
                      <div>
                        <Paper elevation={8} className="wrapperPaper_1">
                          <div id="timeLeave" className="timeLeave_1">
                            <div>
                              <p> {item.timeFrom}</p>
                              <span>{item.dateLeaving}</span>
                            </div>
                            <p>Duration:2h</p>
                            <div>
                              <p>{item.timeTo}</p>
                              <span>{item.dateLeaving}</span>
                            </div>
                          </div>

                          <div id="timeLeave">
                            <Slider
                              vertical
                              disabled
                              range
                              defaultValue={[0, 50, 100]}
                              style={{ height: 130 }}
                            />
                          </div>
                          <div id="timeLeave" className="timeLeave_2">
                            <p> {item.destinationFrom}</p>
                            <img src={item.logo} />
                            <p> {item.destinationTo}</p>
                          </div>
                        </Paper>
                      </div>
                    </div>
                  </Card>
                  <div className="pricePay">
                    <Card title="Total price" className="card">
                      <p>Price: {item.price}</p>
                      <span>plus taxes and services</span>
                    </Card>
                    <Link className="myLink" to={`/bookF/${id}`}>
                      Book flight
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default Details;
