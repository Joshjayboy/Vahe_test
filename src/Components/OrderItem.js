import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { CircleButton, InputQuantity } from "../Constants/sharedComponents";
import axios from "axios";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import { Typography } from "@mui/material";

const OrderItem = (props) => {
  const { item, update, setUpdate } = props;
  let [quantity, setQuantity] = useState(item.quantity);
  const deleteProductFromCart = async (product) => {
    const response = await axios.put(
      `${BACKEND_BASE_URL}/carts`,
      { itemId: product.id, quantity: 0 },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
  };
  const addProductToCart = async (product, quantity) => {
    try {
      const response = await axios.put(
        `${BACKEND_BASE_URL}/carts`,
        { itemId: product.id, quantity: quantity },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log("Bad request.");
    }
  };
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          marginBottom: "15px",
          marginTop: "15px",
          width: "40vw",
        }}
      >
        <Box>
          <img
            src={item.product.imageUrl}
            alt="img"
            style={{
              width: "200px",
              height: "100px",
              objectFit: "contain",
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              fontWeight: "600",
              fontSize: "16px",
            }}
          >
            <Typography
              sx={{
                fontWeight: "600",
                fontSize: "19px",
                justifyContent: "flex-start",
              }}
            >
              {item.product.name}
            </Typography>       
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",          
                fontWeight: "600",
                fontSize: "26px",
                mr: "15px",
                mb: 3,
              }}
            >
              <Box sx={{ fontWeight: "600", fontSize: "16px" }}>
                {" "}
                {item.product.price}{" "}
              </Box>{" "}
              <Typography
                sx={{
                  fontWeight: "600",
                  fontSize: "10px",
                }}
              >
                AMD{" "}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexGrow: 1,
                alignItems: "center",
                mr: "15px",
              }}
            >
              <CircleButton
                value={item.quantity}
                onClick={() => {
                  return (
                    quantity > 1 && setQuantity(--quantity),
                    addProductToCart(item.product, quantity),
                    setUpdate(!update)
                  );
                }}
              >
                -
              </CircleButton>
              <InputQuantity
                maxLength="3"
                value={quantity}
                onChange={(e) => {
                  return (
                    setQuantity(() => {
                      return e.target.value;
                    }),
                    addProductToCart(item.product, e.target.value),
                    setUpdate(!update)
                  );
                }}
                style={{ width: "15%" }}
              />
              <CircleButton
                value={quantity}
                onClick={() => {
                  return (
                    setQuantity(++quantity),
                    addProductToCart(item.product, quantity),
                    setUpdate(!update)
                  );
                }}
              >
                +
              </CircleButton>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider />
    </React.Fragment>
  );
};

export default OrderItem;
