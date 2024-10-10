import axios from "axios";
import React, { useState, useContext } from "react";
import { sharedInfoContext } from "../../App";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [userInfo, setUserInfo] = useState({});
  const { setToken, setLogged ,logged} = useContext(sharedInfoContext);
  const [msg, setMsg] = useState("");
  const navigate=useNavigate()

  const loginHandler = () => {
    if (Object.keys(userInfo).length !== 0) {
      axios
        .post("http://localhost:5000/user/login", userInfo)
        .then((result) => {
          console.log(result.data);
          setToken(result.data.token);
          localStorage.setItem("token", result.data.token);
          setMsg(result.data.msg);
          navigate("/")
          setLogged(true);
          localStorage.setItem("logged", logged);

        })
        .catch((err) => {
          console.log(err.response.data.msg);
          setMsg(err.response.data.msg);
        });
    } else {
      setMsg("fill the fields");
    }
  };

  return (
    <div>
      <label>
        <span>email</span>
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
        <span>password</span>
        <input
          type="password"
          name="password"
          onChange={(e) => {
            setUserInfo({ ...userInfo, password: e.target.value });
          }}
        />
      </label>
      <br></br>
      <button onClick={loginHandler}>submit</button>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Login;
