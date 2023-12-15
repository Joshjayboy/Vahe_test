import React, { useEffect, useState } from "react";
import TableName from "../TableName";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../Constants/AppConstants";
import { v4 as uuid } from "uuid";
import OrderHistoryItem from "./OrderHistoryItem";

export default function OrderHistory(props) {
  const { courierId } = props;
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState({});

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/orders/courier/${courierId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div
      style={{
        margin: "20px 0",
        backgroundColor: "white",
        borderRadius: "15px",
      }}
    >
      <TableName> Order History </TableName>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell> Company </TableCell>
            <TableCell> Date </TableCell>
            <TableCell> Status </TableCell>
            <TableCell> Customer Name </TableCell>
            <TableCell> About </TableCell>
          </TableRow>
          {orders.map((orderItem, index) => {
            return (
              <OrderHistoryItem
                key={uuid()}
                index={index}
                orderItem={orderItem}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
