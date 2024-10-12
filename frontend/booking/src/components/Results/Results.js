import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { useNavigate, Link } from "react-router-dom";
import "./results.css";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";

const Results = () => {
  const { dataFound, showFlight, showHotel } = useContext(sharedInfoContext);
  const navigate = useNavigate();
  return (
    <div>
      <Container>
        <h1>Results</h1>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Home
        </button>
        <Grid container spacing={3}>
          {dataFound.length && showHotel ? (
            dataFound.map((item) => {
              return (
                <Grid size={4} key={item._id} >
                  <Paper className="parent" elevation={5}>
                    <p>{item.destination}</p>
                    <p>{item.dateFrom}</p>
                    <img src={item.image} />
                    <p>{item.price}</p>
                    <p>{item.rating}</p>
                    <p>{item.title}</p>
                    <Link to={`/det/${item._id}`}>see more details</Link>
                  </Paper>
                </Grid>
              );
            })
          ) : dataFound.length && showFlight ? (
            dataFound.map((item) => {
              return (
                <Grid size={12}>
                <Paper key={item._id} className="parent" elevation={5}>
                  <p>{item.destinationFrom}</p>
                  <p>{item.destinationTo}</p>
                  <p>{item.dateLeaving}</p>
                  <p>{item.dateReturning}</p>
                  <Link to={`/det/${item._id}`}>see more details</Link>
                </Paper>
                </Grid>
              );
            })
          ) : (
            <p>No result found</p>
          )}
        </Grid>
      </Container>
    </div>
  );
};

export default Results;
