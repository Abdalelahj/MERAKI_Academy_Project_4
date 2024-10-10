import React ,{ useState, useContext }from 'react'
import { sharedInfoContext } from "../../App";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
  const navigate=useNavigate()
  const { setToken, setLogged, logged } = useContext(sharedInfoContext);
  // console.log(logged);
  return (
    <div>
      <p>Navbar</p>  
      {logged&& 
       <button onClick={()=>{
      setToken(null);
       localStorage.clear("token")
       setLogged(false)
       localStorage.clear("logged")
      navigate("/login")

    }}>log out</button>
  }
  
      </div>

  )
}

export default Navbar