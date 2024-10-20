import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import "./results.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import TimeS from "./Slider";
import { CgTime } from "react-icons/cg";
import { Rate } from "antd";
const Results = () => {
  const { dataFound, showFlight, showHotel } = useContext(sharedInfoContext);
  const navigate = useNavigate();





  return (
    <div className="resultPage">
      <Container>
        {dataFound.length && showHotel ? (
          <div className="parentHotel">
            {dataFound.map((item) => {
              return (
                <Paper elevation={5} className="paperInfo">
                  <img src={item.image} />

                  <div className="ratingInfo">
                    <h3>{item.title}</h3>
                    <Rate disabled defaultValue={item.rating} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "3px",
                        justifyContent: "center",
                      }}
                    >
                      <p>
                        {(
                          Math.round(
                            ((item.rating * item.numberOfReviews) /
                              (item.numberOfReviews * 5)) *
                              10 *
                              10
                          ) / 10
                        ).toFixed(1)}
                      </p>
                      <p>({item.numberOfReviews} Reviews)</p>
                    </div>
                  </div>
                  <div className="pricing">
                    <div>
                      <p>{item.price}</p>
                      <span>For one night + taxes</span>
                    </div>
                    <Link className="myLink" to={`/det/${item._id}`}>
                      View deal
                    </Link>
                  </div>
                </Paper>
              );
            })}
          </div>
        ) : dataFound.length && showFlight ? (
          dataFound.map((item) => {
            return (
              <Grid size={12} sx={{ display: "flex", alignItems: "center" }}>
                <Paper key={item._id} elevation={5}>
                  <div className="parent">
                    <div className="logoWrapper">
                      <img src={item.logo} />
                    </div>
                    <div className="timLine">
                      <div>
                        <TimeS />
                      </div>
                      <div className="info">
                        <div>
                          {item.timeFrom}
                          <p>{item.destinationFrom}</p>
                        </div>
                        <div className="duration">
                          <p>2h</p>
                          <CgTime size={14} />
                        </div>
                        <div>
                          {item.timeTo}
                          <p>{item.destinationTo}</p>
                        </div>
                      </div>
                    </div>
                    <div className="price">
                      <p>{item.price}</p>
                      <Link className="myLink" to={`/det/${item._id}`}>
                        View deal
                      </Link>
                    </div>
                  </div>
                </Paper>
              </Grid>
            );
          })
        ) : (
          <p>No result found</p>
        )}
      </Container>
      <br></br>
    </div>
  );
};

export default Results;
