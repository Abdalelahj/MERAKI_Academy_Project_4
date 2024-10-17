import React from "react";
import { AutoComplete } from "antd";
import "./home.css";


const options = [
    {
      value: "Amman Jordan",
    
    },
    {
      value: "Cairo Egypt",
    },
    {
      value: "Beirut Lebanon",
    },
    {
      value: "Mecca Saudi Arabia",
    },
  ];
  

const HotelInp = ({ setSearch, search }) => (
  <AutoComplete
  size="large"
    variant="filled"  
    className="HoInp"
    options={options}
    placeholder="Choose destination to nearest airport"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    style={{
      width: 400,
    }}
    onChange={(e) => {
        
        setSearch({ ...search, destination: e});
      }}
  />
);
export default HotelInp;
