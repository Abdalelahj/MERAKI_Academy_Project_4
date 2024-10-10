import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { Link, useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const { setToken, setLogged, logged } = useContext(sharedInfoContext);
  return (
    <div>
      <p>Navbar</p>

      <br></br>
      <Link to={"/"}>Home</Link>
      <br></br>
      <Link to={"/"}> سفرني</Link>
      {logged ? (
        <>
          <Link to="/profile">Profile</Link>
          <button
            onClick={() => {
              setToken(null);
              setLogged(false);
              localStorage.clear();
              navigate("/login");
            }}
          >
            log out
          </button>
        </>
      ) : (
        <>
          {" "}
          <Link to={"/login"}>Login</Link>
          <br></br>
          <Link to={"/register"}>sign up</Link>
          <br></br>
        </>
      )}
    </div>
  );
};

export default Navbar;
