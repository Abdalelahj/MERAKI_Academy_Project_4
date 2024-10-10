import React, { useState } from "react";
import axios from "axios";
import Select from "react-select";

const Register = () => {
  const [userInfo, setUserInfo] = useState({ gender: "Male" });

  const MyOptions = [
    { value: "Male", label: "Male" },
    { value: "female", label: "Female" },
  ];
  
  const registerHandler = () => {
    axios
      .post("http://localhost:5000/user/register", userInfo)
      .then((result) => {
        console.log(result.data.msg);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <label>
        <span>first Name</span>
        <input
          type="text"
          name="firstName"
          onChange={(e) => {
            setUserInfo({ ...userInfo, firstName: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>last Name</span>
        <input
          type="text"
          name="lastName"
          onChange={(e) => {
            setUserInfo({ ...userInfo, lastName: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>User Name</span>
        <input
          type="text"
          name="userName"
          onChange={(e) => {
            setUserInfo({ ...userInfo, userName: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>Email</span>
        <input
          type="email"
          name="email"
          onChange={(e) => {
            setUserInfo({ ...userInfo, email: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>Password</span>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>age</span>
        <input
          type="Number"
          name="age"
          onChange={(e) => {
            setUserInfo({ ...userInfo, age: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>country</span>
        <input
          type="text"
          name="country"
          onChange={(e) => {
            setUserInfo({ ...userInfo, country: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>phoneNumber</span>
        <input
          type="text"
          name="phoneNumber"
          onChange={(e) => {
            setUserInfo({ ...userInfo, phoneNumber: e.target.value });
          }}
        />
      </label>
      <br></br>
      <label>
        <span>gender</span>
        <Select
          onChange={(e) => {
            setUserInfo({ ...userInfo, gender: e.label });
          }}
          value={MyOptions.value}
          options={MyOptions}
          defaultValue={MyOptions[0]}
          required
        />
      </label>
      <br></br>
      <button onClick={registerHandler}>Submit</button>
    </div>
  );
};

export default Register;

/* 
 firstName :{type : String , required:true},
    lastName :{type:String,required:true},
    userName :{type:String,required:true},
    email:{type:String,required:true ,unique: true},
    password: {type:String,required:true},
    age :{type:Number,required:true},
    country:{type:String},
    gender :{type:String},
    phoneNumber :{type:String},
*/
