import { Avatar, Box, Button, Divider, FormControlLabel } from "@mui/material";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { makeStyles } from "@mui/styles";
import CircleSwitch from "../../../css/SwitchCSS";
import TableName from "../../table/TableName";
import ActiveOrders from "../../table/activeOrders/ActiveOrders";
import Search from "../../table/Search";
import BarsFilterSVG from "../../table/svg/BarsFilterSVG";
import OrderHistorySecond from "../../table/activeOrders/OrderHistorySecond";
import DateSVG from "../../table/svg/DateSVG";
import UploadSVG from "../../table/svg/UploadSVG";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../Constants/AppConstants";

const useStyles = makeStyles({
  header: {
    marginTop: "30px",
    padding: "0 50px",
    position: "relative",
  },
  parent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftSide: {
    display: "flex",
  },
  rightSide: {
    display: "flex",
    alignItems: "center",
    gap: 15,
  },
  img: {
    width: "60px",
    height: "60px",
    objectFit: "cover",
  },
  itemParent: {
    backgroundColor: "white",
    padding: "15px",
    margin: "20px 0",
    borderRadius: "15px",
    border: `.3px solid #ccc`,
  },
  container: {
    backgroundColor: "white",
    border: ".3px solid #ccc",
    borderRadius: "15px",
  },
  button: {
    height: "40px",
    border: "1px #ccc solid",
    padding: "0px 10px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 7,
    cursor: "pointer",
    backgroundColor: "white",
  },
});

export default function CourierDashboard() {
  const classes = useStyles();
  const [courierItem, setCourierItem] = useState({});
  const [isChecked, setisChecked] = useState(
    courierItem.courierStatus === "WORKING" ? true : false
  );
  const [search, setSearch] = useState("");
  const courier = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const [errorMsg, setErrorMsg] = useState({});

  const fetchCourier = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/couriers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setCourierItem(response.data.find((item) => item.id === courier.id));
      setisChecked(
        response.data.find((item) => item.id === courier.id).courierStatus ===
          "WORKING"
          ? true
          : false
      );
    } catch (error) {
      setErrorMsg(error.message);
    }
  };

  const changeCourierStatus = () => {
    const status =
      courierItem.courierStatus === "WORKING" ? "INACTIVE" : "WORKING";
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("accessToken")}`
    );

    const formdata = new FormData();
    formdata.append("courierStatus", status);
    formdata.append("id", courier.id);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
    };

    fetch(
      `${BACKEND_BASE_URL}/couriers/${courier.id}/change-status`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setCourierItem(result);
      })
      .catch((error) => setErrorMsg(error.message));
  };

  useEffect(() => {
    fetchCourier();
  }, []);

  return (
    <Box>
      <Header firstname="" />
      <Box className={classes.header}>
        <Box className={classes.parent}>
          <div className={classes.leftSide}>
            <Avatar
              sx={{
                mr: 8,
              }}
              alt="Remy Sharp"
              src="https://res.cloudinary.com/pro-solve/image/upload/v1663362286/samples/people/smiling-man.jpg"
            />
            <div>
              <h3> Welcome back, {courier.firstname} </h3>
              <p> {courier.email} </p>
            </div>
          </div>

          <div
            className={classes.rightSide}
            style={{
              backgroundColor: "white",
              padding: "15px",
              borderRadius: "15px",
              border: `.3px solid #ccc`,
            }}
          >
            <FormControlLabel
              className={classes.item}
              onChange={(e) => {
                setisChecked(e.target.checked);
                changeCourierStatus();
              }}
              checked={isChecked}
              control={<CircleSwitch sx={{ m: 1 }} />}
            />
            <p>
              You are active now. You can turn this off to stop getting new
              deliveries.
            </p>
            <img
              className={classes.img}
              src="https://www.shutterstock.com/shutterstock/videos/1021020349/thumb/1.jpg?ip=x480"
            />
          </div>
        </Box>
        <Divider sx={{ mt: 4, mb: 4 }} />
        {/* new Order */}
        <div className={classes.itemParent}>
          <div className={classes.parent}>
            <div className={classes.leftSide}>
              <TableName> New Order </TableName>
              <img
                className={classes.img}
                src="https://www.shutterstock.com/shutterstock/videos/1054270889/thumb/11.jpg?ip=x480"
              />
            </div>
            <div className={classes.rightSide}>
              <Button
                sx={{
                  textTransform: "none",
                  borderColor: "#ccc",
                  color: "black",
                }}
                variant="outlined"
              >
                Reject
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                variant="contained"
                color="success"
              >
                Accept
              </Button>
            </div>
          </div>
          <Divider sx={{ mt: 3, mb: 3 }} />
          <div>
            <h6 style={{ fontWeight: 700 }}>
              Address: F. Tavadze str. #2, building 3
            </h6>
            <p style={{ fontSize: "14px" }}>
              Big Mac Menu, 2 Medium Fries, 2 Cheesburgers, 2 Cola
            </p>
          </div>
        </div>

        {/* Active Orders & Today Earnings */}
        <div className={classes.parent} style={{ gap: 55, margin: "15px 0" }}>
          <div className={classes.container} style={{ flexGrow: 2 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <TableName> Active Orders </TableName>
              <span
                style={{
                  border: `1px solid rgba(177,241,202,255)`,
                  borderRadius: "15px",
                  padding: "3px 10px",
                  backgroundColor: `rgba(235,253,243,255)`,
                  color: `rgba(4,118,71,255)`,
                  alignSelf: "center",
                  fontWeight: 700,
                }}
              >
                3 Active
              </span>
            </div>
            <p style={{ paddingLeft: "16px" }}>
              Keep track of your active orders and their statuses here.{" "}
            </p>
            <Divider />
            <div style={{ marginBottom: "15px" }}>
              <ActiveOrders />
            </div>
          </div>

          <div
            className={classes.container}
            style={{ alignSelf: "start", padding: "7px 15px" }}
          >
            <TableName> Today's Earnings </TableName>
            <div>
              <img
                className={classes.img}
                src="https://media.istockphoto.com/id/1248260614/vector/glass-jar-with-falling-gold-coins-over-blue.jpg?s=1024x1024&w=is&k=20&c=xDZmAwNLVIluQDoQoyfGEwy8AE4GN4SQBCGFXAc3Jpg="
              />
              <div
                className={classes.header}
                style={{
                  backgroundColor: `rgba(240,249,230,255)`,
                  borderRadius: "15px",
                  padding: "10px 15px 5px 15px",
                  position: "relative",
                }}
              >
                <h3> $512,80 </h3>
                <progress value={"60"} max={100}></progress>
                <p> 60% of today's goal </p>
              </div>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className={classes.itemParent}>
          <div className={classes.parent}>
            <TableName> Order History </TableName>
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              color="success"
            >
              <>
                <div style={{ marginRight: "10px" }}>
                  <UploadSVG />
                </div>
                <span> Import</span>
              </>
            </Button>
          </div>
          <Divider />
          <div className={classes.parent}>
            <div className={classes.leftSide} style={{ gap: 15 }}>
              <button className={classes.button}>
                <>
                  <DateSVG /> <span> Select Dates </span>
                </>
              </button>
              <button className={classes.button}>
                <div style={{ paddingTop: "5px" }}>
                  <BarsFilterSVG />
                </div>
                <span> Filters </span>
              </button>
            </div>

            <Search search={search} setSearch={setSearch} />
          </div>
          <OrderHistorySecond search={search} />
        </div>
      </Box>
    </Box>
  );
}
