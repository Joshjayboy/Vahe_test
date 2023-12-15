import React from "react";
import { TextField } from "@material-ui/core";
import SearchIcon from "@mui/icons-material/Search";

export default function Search(props) {
  const { search, setSearch } = props;

  return (
    <TextField
      label={
        <>
          <SearchIcon /> Search
        </>
      }
      variant="outlined"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      style={{ width: "400px", margin: "15px 15px" }}
    />
  );
}
