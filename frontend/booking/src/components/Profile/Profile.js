import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { sharedInfoContext } from "../../App";
import Popup from "../popup/Popup";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { token, info, setInfo } = useContext(sharedInfoContext);
  const [updateInfo, setUpdateInfo] = useState({
    firstName: info.firstName,
    lastName: info.lastName,
    email: info.email,
    phoneNumber: info.phoneNumber,
  });
  const [hide, setHide] = useState(true);
  const [success, setSuccess] = useState(false)
const [message, setMessage] = useState("")
const navigate=useNavigate()
  
  const updateHandler = () => {
    if (Object.keys(updateInfo).length) {
      axios
        .post("http://localhost:5000/user/update", updateInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result);
          setMessage("updated successfully")
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
            navigate("/")
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const passUpdate=()=>{

    console.log(success);
    
    if(updateInfo.newPassword===updateInfo.conPassword){
      console.log("matched");
      setSuccess(false)
      axios
        .post("http://localhost:5000/user/update", updateInfo, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result);
          setMessage("updated successfully")
          setSuccess(true)
          setTimeout(() => {
            setSuccess(false)
            navigate("/")

          }, 2000);
        })
        .catch((err) => {
          console.log(err);
        });
      return
    }else{
      setMessage("New password and confirm password must match")
      setTimeout(() => {
        setSuccess(false)
      }, 2000);
      return  setSuccess(true)
    }
    
  }
  return (
    <div>
      <img src={info.image} height={"250px"} />
      <br></br>
      <br></br>
      <label>
        <span>first Name</span>
        <input
          defaultValue={info.firstName}
          onChange={(e) => {
            setUpdateInfo({ ...updateInfo, firstName: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>Last Name</span>
        <input
          defaultValue={info.lastName}
          onChange={(e) => {
            setUpdateInfo({ ...updateInfo, lastName: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>Email</span>
        <input
          defaultValue={info.email}
          onChange={(e) => {
            setUpdateInfo({ ...updateInfo, email: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>phone Number</span>
        <input
          defaultValue={info.phoneNumber}
          onChange={(e) => {
            setUpdateInfo({ ...updateInfo, phoneNumber: e.target.value });
          }}
        />
      </label>
      <br></br>
      <button onClick={updateHandler}>Save</button>
      <br></br>
      {hide ? (
        <a
          href="#"
          onClick={() => {
            setHide(false);
          }}
        >
          change password?
        </a>
      ) : (
        <>
          <label>
            <span>old password</span>
            <input
              onChange={(e) => {
                setUpdateInfo({ ...updateInfo, oldPassword: e.target.value });
              }}
            />
          </label>
          <br></br>
          <label>
            <span>New password</span>
            <input    onChange={(e) => {
                setUpdateInfo({ ...updateInfo, newPassword: e.target.value });
              }}
            />
          </label>
          <br></br>
          <label>
            <span>confirm password</span>
            <input onChange={(e) => {
                setUpdateInfo({ ...updateInfo, conPassword: e.target.value });
              }} />
          </label>
          <br></br>
          <button
            onClick={passUpdate}
          >
            ok
          </button>
        </>
      )}
      {success&&<Popup msg={message} />}
    </div>
  );
};

export default Profile;
