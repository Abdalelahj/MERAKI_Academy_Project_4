import axios from "axios";
import React, { useState, useContext,useEffect } from "react";
import { sharedInfoContext } from "../../App";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const { setToken, setLogged, userInfo, setUserInfo ,isGoogle, setIsGoogle} =
    useContext(sharedInfoContext);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);
  const loginHandler = () => {
    if (Object.keys(userInfo).length) {
      axios
        .post("http://localhost:5000/user/login", userInfo)
        .then((result) => {
          console.log(result.data);
          setToken(result.data.token);
          localStorage.setItem("token", result.data.token);
          setMsg(result.data.success);
          navigate("/");
          setLogged(true);
          localStorage.setItem("logged", true);
        })
        .catch((err) => {
          console.log(err)
          setMsg(err.response.data.success);
          setTimeout(() => {
            setMsg("");
          }, 2000);
        });
    } else {
      setMsg("fields required are empty");
      setTimeout(() => {
        setMsg("");
      }, 2000);
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  console.log(userInfo);

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const theme = createTheme({
    palette: {
      blue: {
        main: "#494998",
        light: "#3b3b75",
        dark: "#0d0de3",
        contrastText: "#242105",
      },
    },
  });
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
  useEffect(() => {
    console.log(msg);
    if (isGoogle) {
      // console.log(loginHandler);
      loginHandler()
        if(msg===false){
            console.log("in");
            
          registerHandler();
        }
      setIsGoogle(false);
    //  setTimeout(() => {
    //   loginHandler()
    //  }, 1000);
    }
  }, [userInfo, isGoogle]);
console.log(msg);

  return (
    <div style={{ backgroundColor: "ButtonShadow", height: "90vh" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "8em",
          alignItems: "center",
          rowGap: "1em",
        }}
      >
        <FormControl sx={{ m: 1, width: "60ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">Email</InputLabel>
          <Input
            id="standard-adornment-email"
            type="text"
            onChange={(e) => {
              setUserInfo({ ...userInfo, email: e.target.value });
            }}
          />
        </FormControl>

        <FormControl sx={{ m: 1, width: "60ch" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            onChange={(e) => {
              setUserInfo({ ...userInfo, password: e.target.value });
            }}
          />
        </FormControl>
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={loginHandler}
            sx={{ bgcolor: "blue.dark" }}
          >
            Login
          </Button>
        </ThemeProvider>
        <GoogleLogin
            onSuccess={(credentialResponse) => {
              setIsGoogle(true);
              const decoded = jwtDecode(credentialResponse?.credential);
              setUserInfo({
                ...userInfo,
                email: decoded.email,
                firstName: decoded.given_name,
                image: decoded.picture,
                password: "google12345",
              });
            }}
            onError={() => {
              console.log("Login Failed");
            }}
            context="signup"
            useOneTap
          />
        {msg && <p>{msg}</p>}
      </Box>
    </div>
  );
};

export default Login;
