import { Avatar, TableCell, TableRow } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  row: {
    backgroundColor: (index) =>
      index % 2 === 0 ? `rgba(249,250,251,255)` : "white",
    cursor: "pointer",
    "& > *": {
      border: "none",
    },
  },
  cell: {
    display: "flex",
    flexWrap: "nowrap",
    gap: 5,
    "& > *": {
      margin: "auto 0",
      alignSelf: "stretch",
    },
  },
  status: {
    backgroundColor: `rgba(229,247,238,255)`,
    border: `rgba(166,234,195,255)`,
    color: `rgba(17,124,80,255)`,
    padding: "7px",
    borderRadius: "15px",
  },
});

export default function OrderHistoryItem(props) {
  const { index, orderItem, isNoNavigate } = props;
  const classes = useStyles(index);
  const dateObject = new Date(orderItem.createdAt);
  const day = dateObject.getDay();
  const month = dateObject.toLocaleDateString("en-us", { month: "short" });
  const year = dateObject.getFullYear();
  const navigate = useNavigate();

  const color = {
    text:
      orderItem.orderStatus === "READY_FOR_DELIVERY"
        ? `rgba(17,124,80,255)`
        : orderItem.orderStatus === "CANCELED"
        ? `rgba(179,36,25,255)`
        : `rgba(23,90,208,255)`,
    backgroundColor:
      orderItem.orderStatus === "READY_FOR_DELIVERY"
        ? `rgba(229,247,238,255)`
        : orderItem.orderStatus === "CANCELED"
        ? `rgba(254,243,242,255)`
        : `rgba(233,243,251,255)`,
    border:
      orderItem.orderStatus === "READY_FOR_DELIVERY"
        ? `rgba(166,234,195,255)`
        : orderItem.orderStatus === "CANCELED"
        ? `rgba(254,205,202,255)`
        : `rgba(63,119,216,255)`,
  };

  return (
    <TableRow
      className={classes.row}
      style={{ cursor: isNoNavigate ? "auto" : "pointer" }}
      onClick={() => !!isNoNavigate || navigate("orders", { state: orderItem })}
    >
      <TableCell>
        <div className={classes.cell}>
          <Avatar alt="KFC" src="/static/images/avatar/3.jpg" />
          <p> KFC </p>
        </div>
      </TableCell>
      <TableCell> {`${day} ${month} ${year}`} </TableCell>
      <TableCell>
        <span
          className={classes.status}
          style={{
            backgroundColor: color.backgroundColor,
            text: color.text,
            border: `2px ${color.border} solid`,
          }}
        >
          {orderItem.orderStatus}
        </span>
      </TableCell>
      <TableCell>
        <div className={classes.cell}>
          <Avatar
            alt={orderItem.customer.firstname}
            src="/static/images/avatar/3.jpg"
          />
          <p> {orderItem.customer.firstname} </p>
        </div>
      </TableCell>
      <TableCell>
        <h6> 2 Large Cappucino </h6>
        <p> Jikia str #67 </p>
      </TableCell>
    </TableRow>
  );
}
