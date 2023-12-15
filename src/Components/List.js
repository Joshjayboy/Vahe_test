import * as React from "react";
import Box from "@mui/material/Box";
import { v4 as uuid } from "uuid";
import { Button } from "@mui/material";
import Menu from "@mui/material/Menu";
import CartItem from "./CartItem";
import axios from "axios";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
export default function List(props) {  
  const { anchorElCart, handleCloseCart, openCart } = props;
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
  return (
    <>
      <Menu
        overflow="hidden"
        overflowY="hidden"
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorElCart}
        open={openCart}
        onClose={handleCloseCart}
        keepMounted
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        style={{
          width: "100%",
          marginTop: "25px",
          overflow: "hidden",
          overflowY: "hidden",
        }}
        sx={{
          overflow: "hidden",
          overflowY: "hidden",
        }}
      >
        {cartList.productItems?.length ? (
          <Box
            overflow="hidden"
            overflowY="hidden"
            sx={{
              minWidth: "300px",
              height: "500px",
              bgcolor: "background.paper",
              display: "flex",
              flexDirection: "column",
              borderRadius: "10px",
              overflow: "hidden",
              overflowY: "hidden",
            }}
          >
            <Box
              overflow="hidden"
              overflowY="hidden"
              sx={{
                overflow: "hidden",
                overflowY: "hidden",
              }}
            >
              <Button onClick={handleCloseCart} sx={{ color: "grey" }}>
                <CloseIcon />
              </Button>
            </Box>
            <Box overflow="hidden" sx={{ flexGrow: 1, overflow: "hidden" }}>
              {cartList.productItems?.map((item) => {
                return (
                  <React.Fragment key={uuid()}>
                    <CartItem
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
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
            <Button
              variant="contained"
              color="error"
              component={Link}
              to="/checkout"
              sx={{
                width: "90%",
                margin: "auto",
                borderRadius: "10px",
                mb: "30px",
              }}
            >
              Go to checkout
            </Button>
          </Box>
        ) : null}
      </Menu>
    </>
  );
}
