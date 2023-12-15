import React, { useEffect, useState } from "react";
import TableName from "../TableName";
import {
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import Search from "../Search";
import { BACKEND_BASE_URL } from "../../../Constants/AppConstants";
import axios from "axios";
import CustomPagination from "../../pagination/CustomPagination";
import { v4 as uuid } from "uuid";
import Courier from "./Courier";
import CourierDetails from "./CourierDetails";

const perpage = 10;
export default function Couriers() {
  const [couriers, setCouriers] = useState([]);
  const [search, setSearch] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isShowDetails, setIsShowDetails] = useState(false);
  const [selectedCourier, setSelcetedCourier] = useState({});

  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const fetchCouriers = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/couriers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setCouriers(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  const handleShowDetails = (courier) => {
    setIsShowDetails(!isShowDetails);
    setSelcetedCourier(courier);
  };

  const sortedAndSearchedCouriers = couriers
    .filter((courier) =>
      `${courier.id} ${courier.firstname} ${courier.lastname} ${courier.email} ${courier.phoneNumber} ${courier.courierStatus}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
    );

  const changeCourierStatus = (updatedValue) => {
    const status = updatedValue
      ? updatedValue
      : selectedCourier.courierStatus === "WORKING"
      ? "INACTIVE"
      : "WORKING";
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${sessionStorage.getItem("accessToken")}`
    );

    const formdata = new FormData();
    formdata.append("courierStatus", status);
    formdata.append("id", selectedCourier.id);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: formdata,
    };

    fetch(
      `${BACKEND_BASE_URL}/couriers/${selectedCourier.id}/change-status`,
      requestOptions
    )
      .then((response) => response.json())
      .catch((error) => setErrorMsg(error.message));
  };

  useEffect(() => {
    fetchCouriers();
  }, []);

  return !isShowDetails ? (
    <div>
      <TableName> Couriers </TableName>
      <Divider />
      <Search search={search} setSearch={setSearch} />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "id"}
                direction={orderBy === "id" ? order : "asc"}
                onClick={() => handleSort("id")}
              >
                ID
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "firstname"}
                direction={orderBy === "firstname" ? order : "asc"}
                onClick={() => handleSort("firstname")}
              >
                First Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "lastname"}
                direction={orderBy === "lastname" ? order : "asc"}
                onClick={() => handleSort("lastname")}
              >
                Last Name
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "email"}
                direction={orderBy === "email" ? order : "asc"}
                onClick={() => handleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "phoneNumber"}
                direction={orderBy === "phoneNumber" ? order : "asc"}
                onClick={() => handleSort("phoneNumber")}
              >
                Phone Number
              </TableSortLabel>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={orderBy === "courierStatus"}
                direction={orderBy === "courierStatus" ? order : "asc"}
                onClick={() => handleSort("courierStatus")}
              >
                Status
              </TableSortLabel>
            </TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedAndSearchedCouriers.length > 0 ? (
            sortedAndSearchedCouriers
              .slice(currentPage * perpage - perpage, currentPage * perpage)
              .map((courier, index) => {
                return (
                  <Courier
                    key={uuid()}
                    courier={courier}
                    index={index}
                    handleShowDetails={handleShowDetails}
                  />
                );
              })
          ) : (
            <TableRow>
              <TableCell sx={{ border: "none" }} colSpan={"6"}>
                <p> No data available </p>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {!!sortedAndSearchedCouriers.length && (
        <CustomPagination
          allLists={sortedAndSearchedCouriers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          perpage={perpage}
        />
      )}
    </div>
  ) : (
    <CourierDetails
      selectedCourier={selectedCourier}
      setIsShowDetails={setIsShowDetails}
      changeCourierStatus={changeCourierStatus}
    />
  );
}
