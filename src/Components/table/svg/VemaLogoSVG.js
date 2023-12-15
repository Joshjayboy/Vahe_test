import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function VemaLogoSVG() {
  return (
    <Typography
      variant="h6"
      noWrap
      component={Link}
      to="/en"
      sx={{ display: { xs: "none", sm: "block" } }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="150.204" height="32.728">
        <text
          x="10"
          y="30"
          fontFamily="Arial"
          fontSize="40"
          fill="#ea1f4d"
          fontWeight="900"
          fontStyle="italic"
          fillRule="evenodd"
        >
          Vema
        </text>
      </svg>
    </Typography>
  );
}
