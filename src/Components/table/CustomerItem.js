import React from "react";
import TextField from "@mui/material/TextField";

export default function CustomerItem(props) {
  const { firstname, setFirstname, lastname, setLastname } = props;

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <TextField
        id="filled-search"
        label="Name"
        type="text"
        value={firstname}
        onChange={(e) => {
          setFirstname(e.target.value);
        }}
      />
      <TextField
        id="filled-search"
        label="Last name"
        type="text"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
    </div>
  );
}
