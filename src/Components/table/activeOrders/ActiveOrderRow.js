import { Avatar, TableCell, TableRow } from "@mui/material";
import React from "react";

export default function ActiveOrderRow(props) {
  const { activeOrder, index } = props;

  return (
    <TableRow
      sx={{
        backgroundColor: () =>
          index % 2 === 0 ? `rgba(249,250,251,255)` : "white",
      }}
    >
      <TableCell>
        <div style={{ display: "flex", gap: 5 }}>
          <Avatar
            sx={{
              mr: 8,
            }}
            alt="Remy Sharp"
            src="https://res.cloudinary.com/pro-solve/image/upload/v1663362286/samples/people/smiling-man.jpg"
          />
          <p> KFC </p>
        </div>
      </TableCell>
      <TableCell>
        <div style={{ display: "flex", gap: 10, flexWrap: "nowrap" }}>
          <progress value="60" max="100">
            60%
          </progress>
          <p> 60% </p>
        </div>
      </TableCell>
      <TableCell>
        <h6> 2 Baskets, 1 Cheesburger </h6>
        <p> F. Tavadze str, #2, building 3 </p>
      </TableCell>
    </TableRow>
  );
}
