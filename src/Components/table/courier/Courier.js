import React from "react";
import { Avatar, TableCell, TableRow } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  courierStatus: {
    padding: "7px",
    backgroundColor: (color) => color.backgroundColor,
    color: (color) => color.text,
    border: (color) => `1px ${color.border} solid`,
    borderRadius: "15px",
  },
  buttons: {
    display: "flex",
    flexWrap: "nowrap",
  },
});

export default function Courier(props) {
  const { courier, index, handleShowDetails } = props;

  const color = {
    text:
      courier.courierStatus === "WORKING"
        ? `rgba(17,124,80,255)`
        : courier.courierStatus === "Active"
        ? `rgba(17,124,80,255)`
        : `rgba(51,64,84,255)`,
    backgroundColor:
      courier.courierStatus === "WORKING"
        ? `rgba(229,247,238,255)`
        : courier.courierStatus === "Active"
        ? `rgba(229,247,238,255)`
        : `rgba(249,250,251,255)`,
    border:
      courier.courierStatus === "WORKING"
        ? `rgba(166,234,195,255)`
        : courier.courierStatus === "Active"
        ? `rgba(166,234,195,255)`
        : `rgba(213,216,220,255)`,
  };
  const classes = useStyles(color);

  return (
    <TableRow
      onClick={() => handleShowDetails(courier)}
      sx={{
        backgroundColor: index % 2 === 0 ? `rgba(249,250,251,255)` : "white",
        cursor: "pointer",
      }}
    >
      <TableCell> {courier.id} </TableCell>
      <TableCell>
        <div style={{ display: "flex", flexWrap: "nowrap" }}>
          <Avatar alt={courier.firstname} src="/static/images/avatar/3.jpg" />
          <p style={{ margin: "auto 0", paddingLeft: "5px" }}>
            {courier.firstname}
          </p>
        </div>
      </TableCell>
      <TableCell> {courier.lastname} </TableCell>
      <TableCell> {courier.email} </TableCell>
      <TableCell> {courier.phoneNumber} </TableCell>
      <TableCell>
        <span className={classes.courierStatus}> {courier.courierStatus} </span>
      </TableCell>
      <TableCell>
        <div className={classes.buttons}>
          <InfoIcon className={classes.button} />
          <DeleteIcon color="error" className={classes.button} />
        </div>
      </TableCell>
    </TableRow>
  );
}
