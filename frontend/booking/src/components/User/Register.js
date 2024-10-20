import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import Input from "@mui/material/Input";
import TextField from "@mui/material/TextField";
import { Typography } from "@mui/material";
import { countries } from "./countries";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import "./register.css";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { sharedInfoContext } from "../../App";

const Register = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo,isGoogle, setIsGoogle } = useContext(sharedInfoContext);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [value, setValue] = useState("male");
  

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
  // console.log(userInfo);
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });

  useEffect(() => {
    console.log(isGoogle);

    if (isGoogle) {      
      registerHandler();
      setIsGoogle(false);
    }
  }, [userInfo, isGoogle]);

  return (
    <div>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 0.5fr",
          // alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            m: 5,
            gap: "0.8em",
          }}
          id="iamBig"
        >
          <Box
            sx={{
              display: "flex",
              alignItems: " flex-end",
              gap: "0.8em",
              alignContent: "center",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              First Name
            </Typography>
            <TextField
              fullWidth
              size="small"
              required
              id="outlined-required"
              label="Required"
              placeholder="Type your first Name..."
              sx={{ width: "60ch" }}
              onChange={(e) => {
                setUserInfo({ ...userInfo, firstName: e.target.value });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8em",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              Last Name
            </Typography>
            <TextField
              size="small"
              required
              id="outlined-required5"
              label="Required"
              placeholder="Type your last Name..."
              sx={{ width: "60ch" }}
              onChange={(e) => {
                setUserInfo({ ...userInfo, lastName: e.target.value });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8em",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              User Name
            </Typography>
            <TextField
              size="small"
              required
              id="outlined-required1"
              label="Required"
              placeholder="Type your user name Name..."
              sx={{ width: "60ch" }}
              onChange={(e) => {
                setUserInfo({ ...userInfo, userName: e.target.value });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8em",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              Email
            </Typography>
            <TextField
              size="small"
              required
              id="outlined-required2"
              label="Required"
              placeholder="Type your email..."
              sx={{ width: "60ch" }}
              onChange={(e) => {
                setUserInfo({ ...userInfo, email: e.target.value });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8em",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              Password
            </Typography>
            <TextField
              size="small"
              required
              type="password"
              id="outlined-required3"
              label="Required"
              placeholder="Type your password..."
              sx={{ width: "60ch" }}
              onChange={(e) => {
                setUserInfo({ ...userInfo, password: e.target.value });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8em",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              Age
            </Typography>
            <TextField
              type="Number"
              size="small"
              required
              id="outlined-required"
              label="Required"
              placeholder="Type your user age..."
              sx={{ width: "60ch" }}
              onChange={(e) => {
                setUserInfo({ ...userInfo, age: e.target.value });
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8em",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              Phone Number
            </Typography>
            <TextField
              size="small"
              required
              type="Number"
              id="outlined-required"
              label="Required"
              placeholder="Type your phone number..."
              sx={{ width: "60ch" }}
              onChange={(e) => {
                setUserInfo({ ...userInfo, phoneNumber: e.target.value });
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "0.8em",
            }}
          >
            <Typography variant="h6" component={"h2"}>
              Country
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "5em",
              }}
            >
              <Autocomplete
                size="small"
                id="country-select-demo"
                sx={{ width: 300 }}
                options={countries}
                autoHighlight
                getOptionLabel={(option) => option.label}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box
                      key={key}
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...optionProps}
                    >
                      <img
                        loading="lazy"
                        width="20"
                        srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                        src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                        alt=""
                      />
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Choose a country"
                    slotProps={{
                      htmlInput: {
                        ...params.inputProps,
                        autoComplete: "new-password",
                      },
                    }}
                  />
                )}
              />
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">
                  Gender
                </FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                  onChange={(e) => {
                    setValue(e.target.value);
                    setUserInfo({ ...userInfo, gender: e.target.value });
                  }}
                >
                  <FormControlLabel
                    value="female"
                    control={<Radio />}
                    label="Female"
                  />
                  <FormControlLabel
                    value="male"
                    control={<Radio />}
                    label="Male"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Box>
          <Box sx={{ alignSelf: "center", marginLeft: "20em" }}>
            <Button
              size="large"
              variant="contained"
              onClick={registerHandler}
              sx={{ bgcolor: "blue.dark" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignContent: "center",
            alignItems: "center",
            gap: "1em",
            justifyContent:"space-around"
          }}
        >
          {" "}
          <div style={{display:"flex",flexDirection:"column",
          gap:"1em"
          }}>
            <span style={{fontSize:"12px" ,color:"gray"}}>*optional</span>
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload image
            <VisuallyHiddenInput
              type="file"
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              multiple
            />
          </Button>
          <Button onClick={uploadImage}>done</Button>
          </div>
         


          <div style={{display:"flex",
            flexDirection:"column",
            gap:"1em"
          }}>
            <p>Or sign up by</p>
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

          </div>
         
        </Box>
       
      </Box>
      {/* {isGoogle && <GooglRegistration />} */}
    </div>
  );
};

export default Register;
