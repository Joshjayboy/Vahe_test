import React, { useState } from "react";
import TableName from "../TableName";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { makeStyles } from "@material-ui/styles";
import { Avatar, Divider, FormControlLabel } from "@mui/material";
import CourierDetailsTable from "./CourierDetailsTable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import OrderHistory from "../Orders/OrderHistory";
import CircleSwitch from "../../../css/SwitchCSS";

const useStyles = makeStyles({
  header: {
    padding: "10px 40px",
    borderRadius: "15px",
    backgroundColor: "white",
    marginTop: "4px",
  },
  headerParent: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "nowrap",
    gap: 10,
  },
  leftSide: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
  },
  parentImg: {
    alignSelf: "center",
  },
  item: {
    margin: "auto 0",
  },
});

export default function CourierDetails(props) {
  const { selectedCourier, setIsShowDetails, changeCourierStatus } = props;
  const [isChecked, setisChecked] = useState(
    selectedCourier.courierStatus === "WORKING" ? true : false
  );

  const classes = useStyles();
  return (
    <div style={{ backgroundColor: "rgba(245,245,245,255)" }}>
      <div
        style={{
          backgroundColor: "rgba(245,245,245,255)",
          outline: "4px rgba(245,245,245,255) solid",
        }}
      >
        <button
          onClick={() => {
            setIsShowDetails(false);
          }}
          style={{
            width: "200px",
            marginTop: "20px",
            marginLeft: 3,
            fontFamily: "Inter",
            color: "green",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
            cursor: "pointer",
            marginBottom: "20px",
          }}
        >
          <ArrowBackIcon sx={{ mr: 1 }} /> Back to couriers
        </button>
      </div>
      <div className={classes.header}>
        <div className={classes.headerParent}>
          <div className={classes.leftSide}>
            <TableName> Courier Info </TableName>
            <p> ID: {selectedCourier.id} </p>
          </div>
          <KeyboardArrowUpIcon style={{ alignSelf: "center" }} />
        </div>
        <Divider />
        <div className={classes.headerParent}>
          <div className={classes.headerParent}>
            <div className={classes.parentImg}>
              <Avatar
                alt={selectedCourier.firstname}
                src="/static/images/avatar/3.jpg"
              />
            </div>

            <div className={classes.leftSide}>
              <h6>
                {selectedCourier.firstname} {selectedCourier.lastname}
              </h6>
              <p> {selectedCourier.email} </p>
            </div>
          </div>

          <div className={classes.headerParent} style={{ alignSelf: "center" }}>
            <FormControlLabel
              className={classes.item}
              checked={isChecked}
              onChange={(e) => {
                setisChecked(e.target.checked);
                changeCourierStatus();
              }}
              control={<CircleSwitch sx={{ m: 1 }} />}
            />
            <p className={classes.item}>
              Turn on Active Status of this courier for new deliveries.
            </p>
          </div>
        </div>
        <Divider />
        <CourierDetailsTable
          selectedCourier={selectedCourier}
          changeCourierStatus={changeCourierStatus}
          isChecked={isChecked}
          setisChecked={setisChecked}
        />
      </div>
      <OrderHistory courierId={selectedCourier.id} />
    </div>
  );
}
