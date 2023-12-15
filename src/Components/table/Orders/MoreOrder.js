import { TableCell, TableRow } from "@mui/material";
import React, { useEffect, useRef } from "react";
import PenSVG from "../svg/PenSVG";
import CustomizedSteppers from "../../steppers/Steppers";
import makeStyles from "@mui/styles/makeStyles";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({
  steper: {
    backgroundColor: `rgba(249,250,251,255)`,
    marginTop: "100px",
  },
  row: {
    backgroundColor: "white",
    "& > *": {
      border: "none",
    },
  },
  tableCell: {
    borderLeft: "35px rgba(249,250,251,255) solid",
    borderRadius: "15px",
  },
  rightSideParent: {
    position: "relative",
    backgroundColor: "white",
  },
  rightSide: {
    width: "50px",
    height: "100%",
    backgroundColor: "rgba(249,250,251,255)",
    position: "absolute",
    top: 0,
    right: "0px",
  },
  cost: {
    backgroundColor: `rgba(249,250,251,255)`,
    padding: "7px",
    borderRadius: "5px",
  },
});

export default function MoreOrder() {
  const classes = useStyles();
  const scrollContainerRef = useRef();
  const getSelectedOrder = useLocation();

  const scrollToElement = () => {
    if (getSelectedOrder.state && scrollContainerRef.current) {
      scrollContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  useEffect(() => {
    scrollToElement();
  }, []);

  return (
    <>
      <TableRow
        className={classes.steper}
        ref={getSelectedOrder.state ? scrollContainerRef : null}
      >
        <TableCell colSpan={3}>
          <CustomizedSteppers />
        </TableCell>
        <TableCell colSpan={4}> </TableCell>
      </TableRow>

      <TableRow
        className={classes.row}
        style={{ borderTop: "20px rgba(249,250,251,255) solid" }}
      >
        <TableCell className={classes.tableCell}> Customer Name </TableCell>
        <TableCell> Name Lastname </TableCell>
        <TableCell> </TableCell>
        <TableCell> </TableCell>

        <TableCell>
          <img
            style={{ width: "75px", height: "75px", objectFit: "cover" }}
            src="https://www.foodandwine.com/thmb/fAHWpQx2Pf7r-jjuubPGB0NRcJ8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/shaved-beet-and-carrot-salad-with-citrus-scallion-dressing-FT-RECIPE0422-00610b1862ae4aec920e662385fc6716.jpg"
          />
        </TableCell>

        <TableCell>
          <h6> Product Name </h6>
          <p> 1 </p>
        </TableCell>
        <TableCell className={classes.rightSideParent}>
          <span className={classes.cost}> 25$ </span>
          <div className={classes.rightSide}> </div>
        </TableCell>
      </TableRow>
      <TableRow className={classes.row}>
        <TableCell className={classes.tableCell}> Phone Number </TableCell>
        <TableCell colSpan={2}> + 374 99 111 111 </TableCell>
        <TableCell colSpan={3}> </TableCell>
        <TableCell className={classes.rightSideParent}>
          <div className={classes.rightSide}> </div>
        </TableCell>
      </TableRow>

      <TableRow className={classes.row}>
        <TableCell className={classes.tableCell}> Delivery address </TableCell>
        <TableCell colSpan={2}> P. Tavadze str 4, </TableCell>
        <TableCell colSpan={3}> </TableCell>
        <TableCell className={classes.rightSideParent}>
          <div className={classes.rightSide}> </div>
        </TableCell>
      </TableRow>

      <TableRow className={classes.row}>
        <TableCell className={classes.tableCell}>
          Delivery Time and Date
        </TableCell>
        <TableCell colSpan={2}> 10.10.2023 18:00 - 18:30 </TableCell>
        <TableCell colSpan={3}> </TableCell>
        <TableCell className={classes.rightSideParent}>
          <div className={classes.rightSide}> </div>
        </TableCell>
      </TableRow>
      <TableRow className={classes.row}>
        <TableCell className={classes.tableCell}> Payment Method </TableCell>
        <TableCell colSpan={2}> POS Terminal </TableCell>
        <TableCell colSpan={3}> </TableCell>
        <TableCell className={classes.rightSideParent}>
          <div className={classes.rightSide}> </div>
        </TableCell>
      </TableRow>

      <TableRow className={classes.row}>
        <TableCell className={classes.tableCell}> Delivery Cost </TableCell>
        <TableCell colSpan={2}> 10 $ </TableCell>
        <TableCell colSpan={3}> </TableCell>
        <TableCell className={classes.rightSideParent}>
          <div className={classes.rightSide}> </div>
        </TableCell>
      </TableRow>

      <TableRow className={classes.row}>
        <TableCell className={classes.tableCell}> Order Amount </TableCell>
        <TableCell colSpan={2}> 110 $ </TableCell>
        <TableCell colSpan={3}> </TableCell>

        <TableCell className={classes.rightSideParent}>
          <div className={classes.rightSide}> </div>{" "}
        </TableCell>
      </TableRow>
      {/* buttons */}
      <TableRow
        className={classes.row}
        style={{
          borderLeft: "35px rgba(249,250,251,255) solid",
          borderBottom: "20px rgba(249,250,251,255) solid",
        }}
      >
        <TableCell sx={{ display: "flex", justifyContent: "flex-end" }}>
          <button
            variant="outlined"
            color="inherit"
            style={{
              width: "100px",
              height: "30px",
              cursor: "pointer",
              backgroundColor: "white",
              border: "1px #ccc solid",
              borderRadius: "5px",
              paddingRight: "15px",
            }}
          >
            <PenSVG
              onClick={() => {
                return;
              }}
            />
            Edit
          </button>
        </TableCell>

        <TableCell sx={{ p: 0 }}>
          <button
            variant="contained"
            color="success"
            style={{
              width: "170px",
              height: "30px",
              cursor: "pointer",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Assign to Courier
          </button>
        </TableCell>
        <TableCell colSpan={4}> </TableCell>
        <TableCell className={classes.rightSideParent}>
          <div className={classes.rightSide}> </div>
        </TableCell>
      </TableRow>
    </>
  );
}
