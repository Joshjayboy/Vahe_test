import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import { Button } from "@mui/material";
import OrderItem from "./OrderItem";
import axios from "axios";
import i18next from "i18next";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import Typography from "@mui/material/Typography";
import { Link, Navigate, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import PaidIcon from "@mui/icons-material/Paid";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import Grid from "@mui/material/Grid";
import { List } from "@material-ui/core";
import { useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import HomeIcon from "@mui/icons-material/Home";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
const CheckOut = (props) => {
  const { lang } = useParams();
  let [cartList, setCartList] = React.useState([]);
  let [update, setUpdate] = React.useState(false);
  const getData = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/carts/current-user`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setCartList(response.data);
    } catch {
      console.log("Something went wrong");
    }
  };
  React.useEffect(() => {
    getData();
    return () => getData();
  }, [update]);
  React.useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);
  const [addresses, setAddresses] = useState([]);
  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/customers/logged-in`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAddresses(response.data.addresses);
    };
    fetchAddresses();
  }, []);

  const navigate = useNavigate();
  const [paymentTypeValue, setPaymentTypeValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const handleButtonClick = (option, value) => {
    setSelectedOption(option);
    console.log(`Button clicked with value: ${value}`);
    setPaymentTypeValue(value);
  };

  const handleOrderButtonClick = async () => {
    if (paymentTypeValue === "") {
      setErrorMessage("Please select a payment method.");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/checkout/create-order`,
        {
          paymentType: paymentTypeValue,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 201) {
        navigate("/last-order", { state: { orderData: response.data } });
      } else {
        setErrorMessage("Something went wrong with the order.");
      }
      console.log("Response from backend:", response.data);
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred while processing your order.");
    }
    console.log(
      `Order button clicked with payment method: ${paymentTypeValue}`
    );
  };

  return (
    <>
      <NavBar />
      <Box
        sx={{
          flexGrow: 1,
          ml: 3,
          mr: 3,
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: "75px",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              {cartList.productItems?.length ? (
                <Box
                  sx={{
                    minWidth: "300px",
                    height: "auto",
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                  }}
                >
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: "19px",
                        mb: "19px",
                      }}
                    >
                      <Box sx={{ width: "100%" }}>
                        <List>
                          {addresses.length > 0 ? (
                            <Box
                              key={addresses[0].id}
                              sx={{ marginBottom: "16px" }}
                            >
                              <Box
                                sx={{ display: "flex", alignItems: "baseline" }}
                              >
                                <InputLabel
                                  root="true"
                                  animated="true"
                                  sx={{
                                    overflow: "hidden",
                                    fontSize: "14px",
                                    marginRight: "8px",
                                    marginBottom: "8px",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  <Typography
                                    component="span"
                                    root="true"
                                    caption="true"
                                    noWrap
                                    sx={{
                                      fontSize: "15px",
                                      whiteSpace: "nowrap",
                                      fontWeight: "700",
                                      lineHeight: "1.66",
                                      color: "#363636",
                                      ml: "15px",
                                    }}
                                  >
                                    <HomeIcon />{" "}
                                    {`${addresses[0].city} ${addresses[0].street}`}
                                  </Typography>
                                </InputLabel>
                              </Box>
                            </Box>
                          ) : (
                            <InputLabel
                              root="true"
                              animated="true"
                              sx={{
                                overflow: "hidden",
                                fontSize: "14px",
                                marginRight: "8px",
                                marginBottom: "8px",
                                textOverflow: "ellipsis",
                              }}
                            >
                              <Typography
                                component="span"
                                root="true"
                                caption="true"
                                noWrap
                                sx={{
                                  fontSize: "15px",
                                  whiteSpace: "nowrap",
                                  fontWeight: "700",
                                  lineHeight: "1.66",
                                  color: "#363636",
                                  ml: "15px",
                                }}
                              >
                                <HomeIcon /> No address added yet
                              </Typography>
                            </InputLabel>
                          )}
                        </List>
                      </Box>
                    </Box>
                  </Box>
                  <Box sx={{ padding: "15px", overflowY: "hidden" }}>
                    <Box
                      sx={{
                        mt: "45px",
                        mb: "45px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "900",
                          fontSize: "13px",
                        }}
                      >
                        Payment Method
                      </Typography>
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          mt: "25px",
                        }}
                      >
                        <Button
                          variant={
                            selectedOption === "POS_TERMINAL"
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() =>
                            handleButtonClick("POS_TERMINAL", "POS_TERMINAL")
                          }
                          sx={{
                            color:
                              selectedOption === "POS_TERMINAL"
                                ? "#fff"
                                : "#000",
                            backgroundColor:
                              selectedOption === "POS_TERMINAL"
                                ? "#d32f2f"
                                : "transparent",
                          }}
                        >
                          <IconButton
                            sx={{
                              color:
                                selectedOption === "POS_TERMINAL"
                                  ? "#fff"
                                  : "#d32f2f",
                            }}
                          >
                            <PaidIcon />
                          </IconButton>
                          Pay with POS
                        </Button>
                        <Button
                          variant={
                            selectedOption === "CASH" ? "contained" : "outlined"
                          }
                          onClick={() => handleButtonClick("CASH", "CASH")}
                          sx={{
                            color: selectedOption === "CASH" ? "#fff" : "#000",
                            backgroundColor:
                              selectedOption === "CASH"
                                ? "#d32f2f"
                                : "transparent",
                          }}
                        >
                          <IconButton
                            sx={{
                              color:
                                selectedOption === "CASH" ? "#fff" : "#d32f2f",
                            }}
                          >
                            <AttachMoneyIcon />
                          </IconButton>
                          Pay with cash
                        </Button>
                        <Button
                          variant={
                            selectedOption === "STRIPE"
                              ? "contained"
                              : "outlined"
                          }
                          onClick={() => handleButtonClick("STRIPE", "STRIPE")}
                          sx={{
                            color:
                              selectedOption === "STRIPE" ? "#fff" : "#000",
                            backgroundColor:
                              selectedOption === "STRIPE"
                                ? "#d32f2f"
                                : "transparent",
                          }}
                          disabled
                        >
                          <IconButton
                            sx={{
                              color:
                                selectedOption === "STRIPE"
                                  ? "#fff"
                                  : "#d32f2f",
                            }}
                          >
                            <CreditCardIcon />
                          </IconButton>
                          credit card
                        </Button>
                      </Stack>
                    </Box>
                  </Box>
                </Box>
              ) : null}
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                mt: "75px",
                display: "flex",
              }}
            >
              {cartList.productItems?.length ? (
                <Box
                  sx={{
                    bgcolor: "background.paper",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "10px",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      mt: "19px",
                      mb: "19px",
                      color: " #c5022e",
                      fontSize: "24px",
                      fontWeight: "700",
                    }}
                  >
                    Your Order
                  </Box>
                  <Box
                    overflow="hidden"
                    sx={{ flexGrow: 1, overflow: "hidden" }}
                  >
                    {cartList.productItems?.map((item) => {
                      return (
                        <React.Fragment key={uuid()}>
                          <OrderItem
                            item={item}
                            update={update}
                            setUpdate={setUpdate}
                          />
                        </React.Fragment>
                      );
                    })}
                  </Box>
                  <Box sx={{ padding: "15px", overflowY: "hidden" }}>
                    <Typography
                      style={{
                        backgroundColor: "#f3f3f3",
                        padding: "0px",
                        display: "flex",
                        justifyContent: "center",
                        fontWeight: "900",
                        fontSize: "13px",
                      }}
                    >
                      *Delivery fee is a payment for a counter service
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "15px",
                        mb: "15px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "900",
                          fontSize: "13px",
                        }}
                      >
                        Subtotal
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "900",
                          fontSize: "13px",
                        }}
                      >
                        {cartList.price} AMD
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: "10px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "900",
                          fontSize: "13px",
                        }}
                      >
                        Delivery*
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "900",
                          fontSize: "13px",
                        }}
                      >
                        {cartList.deliveryFee} AMD
                      </Typography>
                    </Box>
                    <Box
                      sx={{ display: "flex", justifyContent: "space-between" }}
                    >
                      <Typography
                        sx={{
                          fontWeight: "900",
                          fontSize: "20px",
                        }}
                      >
                        Total
                      </Typography>
                      <Typography
                        sx={{
                          fontWeight: "900",
                          fontSize: "20px",
                        }}
                      >
                        {cartList.totalPrice} AMD
                      </Typography>
                    </Box>
                  </Box>
                  {errorMessage && (
                    <Stack sx={{ width: "100%" }} spacing={2}>
                      <Alert severity="error"> {errorMessage}</Alert>
                    </Stack>
                  )}
                  <Button
                    variant="contained"
                    color="error"
                    component={Link}
                    onClick={handleOrderButtonClick}
                    to="/checkout"
                    sx={{
                      width: "60%",
                      margin: "auto",
                      borderRadius: "10px",
                      mt: "30px",
                      mb: "30px",
                    }}
                  >
                    Order {cartList.totalPrice} AMD
                  </Button>
                </Box>
              ) : null}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
export default CheckOut;
