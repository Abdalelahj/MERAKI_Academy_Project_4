import axios from "axios";
import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import Popup from "../popup/Popup";
import { useNavigate } from "react-router-dom";
import { Input } from "antd";
import { Button, Result,Modal } from "antd";
import "./style.css"
const Profile = () => {
  const { token, info } = useContext
  (sharedInfoContext);
const navigate=useNavigate()

const [updateInfo, setUpdateInfo] = useState({
  firstName: info.firstName,
  lastName: info.lastName,
  email: info.email,
  phoneNumber: info.phoneNumber,
});

const [passUpdateN, setPassUpdateN] = useState({})


const [hide, setHide] = useState(true);
const [success, setSuccess] = useState(false)
const [message, setMessage] = useState("")

if(token){
  // console.log(token);

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
    if(Object.keys(passUpdateN).length>0){
    if(updateInfo.newPassword===updateInfo.conPassword){
      console.log("matched");
      setSuccess(false)
      axios
        .post("http://localhost:5000/user/update", passUpdateN, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((result) => {
          console.log(result);
          setMessage("updated successfully")
          setSuccess(true)
         Modal.success({
            title: 'Password updated successfully',
            content: ``,
            footer: (_, { OkBtn, CancelBtn }) => (
              <>
                <Button href="/" >Back Home</Button>
                <Button href="/login" >Stay</Button>
                
       
                
              </>
            ),
          });
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
  }else{
    Modal.error({
      title: 'Fill all fields',
      content: 'All fields are required',
      footer: (_, { OkBtn, CancelBtn }) => (
        <>
          <CancelBtn />
          <OkBtn />
        </>
      ),
    });
  }
    
  }

  console.log(passUpdateN);
  
  return (
    <div>
      <div className="imageCont">
      <img src={info.image} height={"250px"} />

      </div>
      <br></br>
      <br></br>
      <div className="proInp">
      <label>
        <span>first Name</span>
        <Input
             defaultValue={info.firstName}
              className="inpB"
              onChange={(e) => {
                setUpdateInfo({ ...updateInfo, firstName: e.target.value });
              }}
            />
      </label>
    
      <label>
        <span>Last Name</span>
        <Input
                 defaultValue={info.lastName}
              className="inpB"
              onChange={(e) => {
                setUpdateInfo({ ...updateInfo, lastName: e.target.value });
              }}
            />
       
      </label>
    
      <label>
        <span>Email</span>
        <Input
                 defaultValue={info.email}
              className="inpB"
              onChange={(e) => {
                setUpdateInfo({ ...updateInfo, email: e.target.value });
              }}
            />
       
     
      </label>
    
      <label>
        <span>phone Number</span>
        <Input
                 defaultValue={info.phoneNumber}
              className="inpB"
              onChange={(e) => {
                setUpdateInfo({ ...updateInfo, phoneNumber: e.target.value });
              }}
            />
       
     
      </label>
      </div>
   
     
      <Button onClick={updateHandler}>Save</Button>
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
        <div className="passUpd">
          <label>
            <span>old password</span>
            <Input
            type="password"
              className="inpB"
              onChange={(e) => {
                setPassUpdateN({ ...passUpdateN, oldPassword: e.target.value });
              }}
            />
          
          </label>
       
          <label>
            <span>New password</span>
            <Input
             type="password"
              className="inpB"
              onChange={(e) => {
                setPassUpdateN({ ...passUpdateN, newPassword: e.target.value });
              }}
            />
          </label>
       
          <label>
            <span>confirm password</span>
            <Input
             type="password"
              className="inpB"
              onChange={(e) => {
                setPassUpdateN({ ...passUpdateN, conPassword: e.target.value });
              }}
            />
           
          </label>
   
          <button
            onClick={passUpdate}
            className="submit_C"
          >
            ok
          </button>
          </div>
        </>
      )}
      {/* {success&&<Popup msg={message} />} */}
    </div>
  );
  }
};

export default Profile;
