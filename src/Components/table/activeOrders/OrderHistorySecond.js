import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../../Constants/AppConstants";
import { v4 as uuid } from "uuid";
import OrderHistoryItem from "../Orders/OrderHistoryItem";
import CustomPagination from "../../pagination/CustomPagination";

export default function OrderHistorySecond(props) {
  const { search } = props;
  const courierId = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const [orders, setOrders] = useState([]);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [errorMsg, setErrorMsg] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const perpage = 10;
  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/orders/courier/${courierId.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setOrders(response.data);
    } catch (error) {
      setErrorMsg(error.message);
    }
  };
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedAndSearchedOrders = orders
    .filter((order) =>
      `${order.company} ${order.customer.firstname} ${order.orderStatus} ${order.email} ${order.about}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
    );

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "company"}
                direction={orderBy === "company" ? order : "asc"}
                onClick={() => handleSort("id")}
              >
                Company
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "date"}
                direction={orderBy === "date" ? order : "asc"}
                onClick={() => handleSort("date")}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "status"}
                direction={orderBy === "status" ? order : "asc"}
                onClick={() => handleSort("status")}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "customer name"}
                direction={orderBy === "customer name" ? order : "asc"}
                onClick={() => handleSort("customer name")}
              >
                Customer Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "about"}
                direction={orderBy === "about" ? order : "asc"}
                onClick={() => handleSort("about")}
              >
                About
              </TableSortLabel>
            </TableCell>
          </TableRow>

          {sortedAndSearchedOrders.length >= 1 ? (
            sortedAndSearchedOrders.map((orderItem, index) => {
              return (
                <OrderHistoryItem
                  key={uuid()}
                  index={index}
                  orderItem={orderItem}
                  isNoNavigate={true}
                />
              );
            })
          ) : (
            <TableRow>
              <TableCell> No data available </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {sortedAndSearchedOrders.length > 1 && (
        <CustomPagination
          allLists={sortedAndSearchedOrders}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perpage={perpage}
        />
      )}
    </div>
  );
}
