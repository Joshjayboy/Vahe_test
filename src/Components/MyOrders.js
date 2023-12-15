import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import NavBar from "./NavBar";
import Divider from '@mui/material/Divider';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";


const MyOrders = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [orders, setOrders] = React.useState([]);
  useEffect(() => {
    console.log("Starting to fetch orders...");
    const accessToken = sessionStorage.getItem("accessToken");
    if (!accessToken) {
      console.error("Access token is missing");
      return;
    }
    console.log("Access token:", accessToken);
    const fetchOrders = async () => {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/orders/current-user`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setOrders(response.data);
      console.log(response.data);
    };
    fetchOrders();
  }, []);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleViewDetails = (order) => {
    if (expandedOrder === order.id) {      
      setExpandedOrder(null);
    } else {      
      setExpandedOrder(order.id);
    }
    setSelectedOrder(order);    
  };

  return (
    <>
      <NavBar />
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
                <TableCell>Site</TableCell>
                <TableCell align="right">Order Id</TableCell>
                <TableCell align="right">Items Count</TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">View Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <>
                  <TableRow
                    key={order.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {order.id}
                    </TableCell>
                    <TableCell align="right">{order.id}</TableCell>
                    <TableCell align="right">{order.length}</TableCell>
                    <TableCell align="right">{order.createdAt}</TableCell>
                    <TableCell align="right">{order.orderStatus}</TableCell>
                    <TableCell
                      align="right"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Button>
                        {/* {isExpanded ? "Show Less" : "View Details"} */}

                        {expandedOrder === order.id
                          ? "Show Less"
                          : "View Details"}
                      </Button>

                      {/* <Button>View Details</Button> */}
                    </TableCell>
                  </TableRow>
                  <TableRow fullWidth>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0, width: "100%" }}
                      colSpan={6}
                    >
                      <Collapse
                        in={expandedOrder === order.id}
                        timeout="auto"
                        unmountOnExit
                        sx={{ width: "100%" }}
                      >
                        <List component="div">
                          {selectedOrder && (
                            <div style={{ width: "100%" }}>
                              <h2>Order Products</h2>
                              {selectedOrder.cart.productItems.map(
                                (item, index) => (
                                  <div key={index}>
                                    <List
                                      sx={{
                                        width: "100%",
                                        bgcolor: "background.paper",
                                      }}
                                    >
                                      <ListItem
                                        secondaryAction={
                                          <Typography
                                            edge="end"
                                            aria-label="comments"
                                          >
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
                                )
                              )}
                            </div>
                          )}
                        </List>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MyOrders;
