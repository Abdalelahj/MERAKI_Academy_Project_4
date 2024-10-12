import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [userInfo, setUserInfo] = useState({ gender: "Male" });

  const navigate = useNavigate();

  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "project_4");
    data.append("cloud_name", "dniaphcwx");
    fetch("https://api.cloudinary.com/v1_1/dniaphcwx/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setUrl(data.url);
        setUserInfo({ ...userInfo, image: data.url });
      })
      .catch((err) => console.log(err));
  };
  const registerHandler = () => {
    axios
      .post("http://localhost:5000/user/register", userInfo)
      .then((result) => {
        console.log(result.data.msg);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(userInfo);
  
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
        <select
          onChange={(e) => {
            setUserInfo({ ...userInfo, gender: e.target.value });
          }}
          required
        >
          <option>Male</option>
          <option>Female</option>
        </select>
      </label>
      <br></br>
      <input
        type="file"
        onChange={(e) => {
          setImage(e.target.files[0]);
        }}
      />
      <br></br>
      <button onClick={uploadImage}>Upload</button>
      <br></br>
      <button onClick={registerHandler}>Submit</button>
      <img src={url}/>
    </div>
  );
};

export default Register;
