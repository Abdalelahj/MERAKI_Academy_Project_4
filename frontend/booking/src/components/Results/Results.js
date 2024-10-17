import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import "./results.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import TimeS from "./Slider";
import { CgTime } from "react-icons/cg";
const Results = () => {
  const { dataFound, showFlight, showHotel } = useContext(sharedInfoContext);
  const navigate = useNavigate();
  return (
    <div className="resultPage">
      <Container>
        <h1>Results</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        {dataFound.length && showHotel ? (
          <div className="parentHotel">
            {dataFound.map((item) => {
              return (
                <Paper elevation={5} className="paperInfo">
                  <img src={item.image} />

                  <div>
                    <p>{item.title}</p>
                    <p>{item.rating}</p>
                    <p>{item.numberOfReviews}</p>
                  </div>
                  <div>
                    <p>{item.price}</p>
                    <Link to={`/det/${item._id}`}>See more details</Link>
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
                          <p>2h:30min</p>
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
