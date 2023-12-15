import React from "react";
import NavBar from "./NavBar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
const LastOrder = () => {
  const location = useLocation();
  const orderData = location.state.orderData;
  const [orders, setOrders] = React.useState([]);
  if (!orderData || Object.keys(orderData).length === 0) {
    return <div>No order data available.</div>;
  }
  const { id, cart, orderStatus, customer, paymentType, createdAt, updatedAt } =
    orderData;
  const {
    cart: { productItems },
  } = orderData;

  return (
    <>
      <NavBar />
      <Box
        sx={{
          mt: "50px",
        }}
      >
        <div>
          <Box
            sx={{
              mt: 15,
              ml: 5,
              mr: 5,
              display: "flex",
              justifyContent: "center",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="right">Order Id</TableCell>
                    <TableCell align="right">Items Count</TableCell>
                    <TableCell align="right">Order Date</TableCell>
                    <TableCell align="right">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <>
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="right">{cart.id} </TableCell>
                      <TableCell align="right">
                        {cart.productItems.length}
                      </TableCell>
                      <TableCell align="right">{cart.createdAt}</TableCell>
                      <TableCell align="right">{orderStatus}</TableCell>
                    </TableRow>
                  </>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <List component="div" sx={{ p: 4 }}>
            <div style={{ width: "100%" }}>
              <h2>Order Products</h2>
              {productItems.map((item, index) => (
                <div key={index}>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem
                      secondaryAction={
                        <Typography edge="end">
                          {item.product.price} AMD
                        </Typography>
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          sx={{
                            width: "90px",
                            height: "90px",
                          }}
                        >
                          <img
                            src={item.product.imageUrl}
                            alt="logo"
                            width="100%"
                            height="100%"
                          />
                        </Avatar>
                      </ListItemAvatar>
                      <Box sx={{ ml: 5 }}></Box>
                      <ListItemText
                        primary={item.product.name}
                        secondary={item.quantity}
                        sx={{ color: "#000" }}
                      />
                    </ListItem>
                    <Divider />
                  </List>
                </div>
              ))}
            </div>
          </List>
        </div>
      </Box>
    </>
  );
};

export default LastOrder;
