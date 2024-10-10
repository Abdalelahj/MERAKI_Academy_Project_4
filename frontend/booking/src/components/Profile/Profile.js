import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { sharedInfoContext } from "../../App";
const Profile = () => {
  const { token } = useContext(sharedInfoContext);
  const [info, setInfo] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:5000/info`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setInfo(result.data.secretInfo[0].userId)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  console.log(info);
  
  return <div>Profile</div>;
};

export default Profile;
