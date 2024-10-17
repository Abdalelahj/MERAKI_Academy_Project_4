import React from "react";
import { AutoComplete } from "antd";
import cities from "./airports.json";
import "./home.css";

const filtered = cities.filter((capital, i) => {
  return capital.name != null && i > 2300 && i <= 4000;
});
const options = filtered.map((item, i) => {
  return { value: item.name };
});

const InputL = ({ setSearch, search }) => (
  <AutoComplete
  size="large"
    variant="filled"  
    className="inp"
    options={options}
    placeholder="Choose destination to nearest airport"
    filterOption={(inputValue, option) =>
      option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
    }
    style={{
      width: 400,
    }}
    onChange={(e) => {
      setSearch({ ...search, destinationTo: e });
    }}
    
  />
);
export default InputL;
