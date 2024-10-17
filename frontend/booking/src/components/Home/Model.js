import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import cities from "./airports.json";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

const option = cities.filter((capital, i) => {
  return capital.name != null && i > 2300 && i <= 4000;
});

const InputAuto = ({setSearch,search}) => {
  return (
    <Autocomplete
      size="small"
      id="country-select-demo"
      sx={{
        width: 400,
        height: "2.5em",
        border: "none",
        borderRadius: "5px",
      }}
      options={option}
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderOption={(props, option) => {
        const { key, ...optionProps } = props;

        return (
          <Box
            key={key}
            component="li"
            sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
            {...optionProps}
          >
            {option.name}
          </Box>
        );
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Choose destination to a nearest airport"
          slotProps={{
            htmlInput: {
              ...params.inputProps,
              autoComplete: "new-password",
            },
          }}
        />
      )}
      onChange={(e)=>{
        setSearch({ ...search, destinationTo: e.target.innerText });
      
      }}
      onKeyDown={(e)=>{
        setSearch({ ...search, destinationTo: e.target.value });
      }}
      onSelect={(e)=>{
        setSearch({ ...search, destinationTo: e.target.value });
        }}
      
    />
  );
};

export default InputAuto;
