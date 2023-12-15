import React from "react";
import DoneIcon from "@mui/icons-material/Done";

export default function SuccessSVG(props) {
  const { onClick } = props;
  return (
    <DoneIcon
      color="success"
      onClick={onClick}
      sx={{ ml: 2, cursor: "pointer", padding: 0, margin: 0 }}
    />
  );
}
