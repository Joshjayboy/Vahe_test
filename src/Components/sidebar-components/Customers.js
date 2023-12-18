import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles } from "@mui/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import { BACKEND_BASE_URL, PERPAGE } from "../../Constants/AppConstants";
import DeleteCustomerDialog from ".././DeleteCustomerDialog";
import EditCustomerDialog from ".././EditCustomerDialog";
import { Box, Divider } from "@mui/material";
import CustomPagination from "../pagination/CustomPagination";
import TableName from "../table/TableName";
import Search from "../table/Search";
import CustomerInfo from "../CustomerInfo";
import CustomerTableRow from "../table/CustomerTableRow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
const useStyles = makeStyles({
  table: {
    // minWidth: "60%",
    position: "relative",
  },
  tableCell: {
    width: "14%",
  },
});
export default function CustomerList(props) {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({});
  const [showCustomerInfo, setShowCustomerInfo] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [editCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [customerToDelete, setCustomerToDelete] = useState(null);
  const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);
  const [search, setSearch] = useState("");
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showRequestMessage, setShowRequestMessage] = useState(false);
  const [message, setMessage] = useState("");
  // const handleDeleteClick = (customer) => {
  //   setCustomerToDelete(customer);
  //   setDeleteCustomerDialog(true);
  // };
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${BACKEND_BASE_URL}/customers/${customerToDelete.id}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        setCustomers(
          customers.filter((customer) => customer.id !== customerToDelete.id)
        );
        setDeleteCustomerDialog(false);
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchCustomers();
  }, []);
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/customers`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setCustomers(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };

  // const handleSaveChangesClick = async (editedCustomer) => {
  //   try {
  //     const response = await axios.put(
  //       `${BACKEND_BASE_URL}/customers/${editedCustomer.id}`,
  //       editedCustomer,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       console.log("Customer edited successfully");
  //       setShowRequestMessage(true);
  //       setMessage("Customer edited successfully");
  //       setTimeout(() => {
  //         setShowRequestMessage(false);
  //         setMessage("");
  //       }, 3000);
  //       setEditCustomerModalOpen(false);
  //       setEditingCustomer(null);
  //       await fetchCustomers();
  //     }
  //   } catch (error) {
  //     setErrorMsg(error.response.data.message);
  //     setMessage(error.response.data.message);
  //     setTimeout(() => {
  //       setShowRequestMessage(false);
  //       setMessage("");
  //     }, 3000);
  //   }
  // };
  const sortedAndSearchedCustomers = customers
    .filter((customer) =>
      `${customer.id} ${customer.firstname} ${customer.lastname} ${customer.email} ${customer.phoneNumber} ${customer.role}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
    );

  return (
    <>          
      <div style={{ marginBottom: "20px" }}>
        <TableName> Customers </TableName>
        <Divider />
        <Search search={search} setSearch={setSearch} />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            minWidth: "60%",
          }}
        >
          <TableContainer>
            <Table
              sx={{ minWidth: 650 }}
              className={classes.table}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow sx={{ border: ".5px #ccc solid" }}>
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
                      active={orderBy === "role"}
                      direction={orderBy === "role" ? order : "asc"}
                      onClick={() => handleSort("role")}
                    >
                      Role
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {sortedAndSearchedCustomers
                  .slice(currentPage * PERPAGE - PERPAGE, currentPage * PERPAGE)
                  .map((customer, index) => (
                    <CustomerTableRow
                      key={customer.id}
                      customer={customer}
                      setCustomer={setCustomer}
                      index={index}
                      setEditingCustomer={setEditingCustomer}
                      setCustomerToDelete={setCustomerToDelete}
                      setDeleteCustomerDialog={setDeleteCustomerDialog}
                      setEditCustomerModalOpen={setEditCustomerModalOpen}
                      setShowCustomerInfo={setShowCustomerInfo}
                    />
                  ))}
              </TableBody>
            </Table>
            <EditCustomerDialog
              open={editCustomerModalOpen}
              onClose={() => setEditCustomerModalOpen(false)}
              customer={editingCustomer}
              setUpdatedCustomer={setEditingCustomer}
              handleClose={() => setEditCustomerModalOpen(false)}
              handleUpdate={fetchCustomers}
            />
            <DeleteCustomerDialog
              open={deleteCustomerDialog}
              onClose={() => setDeleteCustomerDialog(false)}
              onConfirm={handleConfirmDelete}
            />
          </TableContainer>
        </Box>
        {!!Math.ceil(sortedAndSearchedCustomers.length / PERPAGE) >= 1 && (
          <div
            style={{
              width: "100%",
              position: "absolute",
              left: "auto",
              bottom: "-100px",
            }}
          >
            <CustomPagination
              allLists={sortedAndSearchedCustomers}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}
      </div>
      {/* <Box
        sx={{
          // minWidth: "60%",
          // minHeight: "100vh",
          // position: "relative",
          width: "100%",
          overflow: "auto",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        ></Box>
      </Box> */}
      {/* </div> */}
      {/* )} */}
    </>
  );
}
