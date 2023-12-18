// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { makeStyles } from "@mui/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import TableSortLabel from "@mui/material/TableSortLabel";
// import TableContainer from "@mui/material/TableContainer";
// import { BACKEND_BASE_URL, PERPAGE } from "../../Constants/AppConstants";
// import DeleteCustomerDialog from ".././DeleteCustomerDialog";
// import EditCustomerDialog from ".././EditCustomerDialog";
// import { Box, Divider } from "@mui/material";
// import CustomPagination from "../pagination/CustomPagination";
// import TableName from "../table/TableName";
// import Search from "../table/Search";
// import CustomerInfo from "../CustomerInfo";
// import CustomerTableRow from "../table/CustomerTableRow";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// const useStyles = makeStyles({
//   table: {
//     // minWidth: "60%",
//     position: "relative",
//   },
//   tableCell: {
//     width: "14%",
//   },
// });
// export default function CustomerList(props) {
//   const classes = useStyles();
//   const [customers, setCustomers] = useState([]);
//   const [customer, setCustomer] = useState({});
//   const [showCustomerInfo, setShowCustomerInfo] = useState(false);
//   const [errorMsg, setErrorMsg] = useState("");
//   const [editCustomerModalOpen, setEditCustomerModalOpen] = useState(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);
//   const [customerToDelete, setCustomerToDelete] = useState(null);
//   const [deleteCustomerDialog, setDeleteCustomerDialog] = useState(false);
//   const [search, setSearch] = useState("");
//   const [orderBy, setOrderBy] = useState("id");
//   const [order, setOrder] = useState("asc");
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showRequestMessage, setShowRequestMessage] = useState(false);
//   const [message, setMessage] = useState("");
//   // const handleDeleteClick = (customer) => {
//   //   setCustomerToDelete(customer);
//   //   setDeleteCustomerDialog(true);
//   // };
//   const handleSort = (property) => {
//     const isAsc = orderBy === property && order === "asc";
//     setOrder(isAsc ? "desc" : "asc");
//     setOrderBy(property);
//   };
//   const handleConfirmDelete = async () => {
//     try {
//       const response = await axios.delete(
//         `${BACKEND_BASE_URL}/customers/${customerToDelete.id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//           },
//         }
//       );
//       if (response.status === 200) {
//         setCustomers(
//           customers.filter((customer) => customer.id !== customerToDelete.id)
//         );
//         setDeleteCustomerDialog(false);
//       }
//     } catch (error) {
//       setErrorMsg(error.response.data.message);
//     }
//   };
//   useEffect(() => {
//     fetchCustomers();
//   }, []);
//   const fetchCustomers = async () => {
//     try {
//       const response = await axios.get(`${BACKEND_BASE_URL}/customers`, {
//         headers: {
//           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//         },
//       });
//       setCustomers(response.data);
//     } catch (error) {
//       setErrorMsg(error.response.data.message);
//     }
//   };

//   // const handleSaveChangesClick = async (editedCustomer) => {
//   //   try {
//   //     const response = await axios.put(
//   //       `${BACKEND_BASE_URL}/customers/${editedCustomer.id}`,
//   //       editedCustomer,
//   //       {
//   //         headers: {
//   //           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
//   //           "Content-Type": "application/json",
//   //         },
//   //       }
//   //     );
//   //     if (response.status === 200) {
//   //       console.log("Customer edited successfully");
//   //       setShowRequestMessage(true);
//   //       setMessage("Customer edited successfully");
//   //       setTimeout(() => {
//   //         setShowRequestMessage(false);
//   //         setMessage("");
//   //       }, 3000);
//   //       setEditCustomerModalOpen(false);
//   //       setEditingCustomer(null);
//   //       await fetchCustomers();
//   //     }
//   //   } catch (error) {
//   //     setErrorMsg(error.response.data.message);
//   //     setMessage(error.response.data.message);
//   //     setTimeout(() => {
//   //       setShowRequestMessage(false);
//   //       setMessage("");
//   //     }, 3000);
//   //   }
//   // };
//   const sortedAndSearchedCustomers = customers
//     .filter((customer) =>
//       `${customer.id} ${customer.firstname} ${customer.lastname} ${customer.email} ${customer.phoneNumber} ${customer.role}`
//         .toLowerCase()
//         .includes(search.toLowerCase())
//     )
//     .sort(
//       (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
//     );

//   return (
//     <>          
//       <div style={{ marginBottom: "20px" }}>
//         <TableName> Customers </TableName>
//         <Divider />
//         <Search search={search} setSearch={setSearch} />
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "center",
//             minWidth: "60%",
//           }}
//         >
//           <TableContainer>
//             <Table
//               sx={{ minWidth: 650 }}
//               // className={classes.table}
//               // aria-label="simple table"
//             >
//               <TableHead>
//                 <TableRow sx={{ border: ".5px #ccc solid" }}>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "id"}
//                       direction={orderBy === "id" ? order : "asc"}
//                       onClick={() => handleSort("id")}
//                     >
//                       ID
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "firstname"}
//                       direction={orderBy === "firstname" ? order : "asc"}
//                       onClick={() => handleSort("firstname")}
//                     >
//                       First Name
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "lastname"}
//                       direction={orderBy === "lastname" ? order : "asc"}
//                       onClick={() => handleSort("lastname")}
//                     >
//                       Last Name
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "email"}
//                       direction={orderBy === "email" ? order : "asc"}
//                       onClick={() => handleSort("email")}
//                     >
//                       Email
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "phoneNumber"}
//                       direction={orderBy === "phoneNumber" ? order : "asc"}
//                       onClick={() => handleSort("phoneNumber")}
//                     >
//                       Phone Number
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>
//                     <TableSortLabel
//                       active={orderBy === "role"}
//                       direction={orderBy === "role" ? order : "asc"}
//                       onClick={() => handleSort("role")}
//                     >
//                       Role
//                     </TableSortLabel>
//                   </TableCell>
//                   <TableCell>Actions</TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {sortedAndSearchedCustomers
//                   .slice(currentPage * PERPAGE - PERPAGE, currentPage * PERPAGE)
//                   .map((customer, index) => (
//                     <CustomerTableRow
//                       key={customer.id}
//                       customer={customer}
//                       setCustomer={setCustomer}
//                       index={index}
//                       setEditingCustomer={setEditingCustomer}
//                       setCustomerToDelete={setCustomerToDelete}
//                       setDeleteCustomerDialog={setDeleteCustomerDialog}
//                       setEditCustomerModalOpen={setEditCustomerModalOpen}
//                       setShowCustomerInfo={setShowCustomerInfo}
//                     />
//                   ))}
//               </TableBody>
//             </Table>
//             <EditCustomerDialog
//               open={editCustomerModalOpen}
//               onClose={() => setEditCustomerModalOpen(false)}
//               customer={editingCustomer}
//               setUpdatedCustomer={setEditingCustomer}
//               handleClose={() => setEditCustomerModalOpen(false)}
//               handleUpdate={fetchCustomers}
//             />
//             <DeleteCustomerDialog
//               open={deleteCustomerDialog}
//               onClose={() => setDeleteCustomerDialog(false)}
//               onConfirm={handleConfirmDelete}
//             />
//           </TableContainer>
//         </Box>
//         {!!Math.ceil(sortedAndSearchedCustomers.length / PERPAGE) >= 1 && (
//           <div
//             style={{
//               width: "100%",
//               position: "absolute",
//               left: "auto",
//               bottom: "-100px",
//             }}
//           >
//             <CustomPagination
//               allLists={sortedAndSearchedCustomers}
//               currentPage={currentPage}
//               setCurrentPage={setCurrentPage}
//             />
//           </div>
//         )}
//       </div>
//       {/* <Box
//         sx={{
//           // minWidth: "60%",
//           // minHeight: "100vh",
//           // position: "relative",
//           width: "100%",
//           overflow: "auto",
//           height: "100%",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             justifyContent: "space-between",
//             alignItems: "center",
//           }}
//         ></Box>
//       </Box> */}
//       {/* </div> */}
//       {/* )} */}
//     </>
//   );
// }













































































// test with order
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants/AppConstants";
import { TextField } from "@material-ui/core";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button } from "@mui/material";
import NavBar from ".././NavBar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Collapse from "@mui/material/Collapse";
import TableSortLabel from "@mui/material/TableSortLabel";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import TableName from "../table/TableName";
import CustomPagination from "../pagination/CustomPagination";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteIcon from "@mui/icons-material/Delete";
import Search from "../table/Search";
import MoreOrder from "../table/Orders/MoreOrder";
import { useLocation } from "react-router-dom";

export default function Orders() {
  const [open, setOpen] = React.useState(false);
  const [orders, setOrders] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const perpage = 10;
  const getSelectedOrder = useLocation();

  useEffect(() => {
    fetchOrders();
    if (getSelectedOrder.state) {
      handleViewDetails(getSelectedOrder.state);
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setOrders(response.data);
      console.log(response.data);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleViewDetails = (order) => {
    if (expandedOrder === order.id) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(order.id);
    }
    setSelectedOrder(order);
  };
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedAndSearchedOrders = orders
    .filter((order) => {
      const email = order.customer?.email || "";
      const item = order.cart?.productItems?.lenght || "";
      const searchString =
        `${email} ${order.id} ${item} ${order.customer.firstname} ${order.customer.lastname} ${order.paymentType} ${order.restaurantName}`.toLowerCase();
      const searchLowerCase = search.toLowerCase();

      if (searchString.includes(searchLowerCase)) {
        return true;
      } else {
        return "not found".includes(searchLowerCase);
      }
    })
    .sort(
      (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
    );

  return (
    <div style={{ marginBottom: "20px" }}>
      <TableName> Orders </TableName>
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
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ border: ".5px solid #ccc" }}>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "ID"}
                    direction={orderBy === "ID" ? order : "asc"}
                    onClick={() => handleSort("ID")}
                  >
                    ID
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === " Courier Name"}
                    direction={orderBy === " Courier Name" ? order : "asc"}
                    onClick={() => handleSort("Courier Name")}
                  >
                    Courier Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "Customer Name"}
                    direction={orderBy === "Customer Name" ? order : "asc"}
                    onClick={() => handleSort("Customer Name")}
                  >
                    Customer Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "restaurantName"}
                    direction={orderBy === "restaurantName" ? order : "asc"}
                    onClick={() => handleSort("order.createdAt")}
                  >
                    Restaurant Name
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "Delivery Address"}
                    direction={orderBy === "Delivery Address" ? order : "asc"}
                    onClick={() => handleSort("Delivery Address")}
                  >
                    Delivery Address
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right">
                  <TableSortLabel
                    active={orderBy === "paymentType"}
                    direction={orderBy === "paymentType" ? order : "asc"}
                    onClick={() => handleSort("order.paymentType")}
                  >
                    Payment Method
                  </TableSortLabel>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndSearchedOrders.slice(
                perpage * currentPage - perpage,
                perpage * currentPage
              ).length === 0 ? (
                <TableRow>
                  <TableCell> No data available </TableCell>
                </TableRow>
              ) : (
                sortedAndSearchedOrders
                  .slice(perpage * currentPage - perpage, perpage * currentPage)
                  .map((order, index) => (
                    <React.Fragment key={index}>
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                          backgroundColor:
                            index % 2 === 0 ? `rgba(249,250,251,255)` : "white",
                          border: ".5px #ccc solid",
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {order.customer === null ? (
                            <p>No items found.</p>
                          ) : (
                            <p> {order.id}</p>
                          )}
                        </TableCell>
                        <TableCell align="right"> Name Lastname </TableCell>
                        <TableCell align="right">
                          {order.cart === null ? (
                            <p>No items found.</p>
                          ) : (
                            <p> {order.customer.firstname} Name Lastname </p>
                          )}
                        </TableCell>
                        <TableCell align="right"> McDonalds</TableCell>
                        <TableCell align="right"> Asatiani Str </TableCell>
                        <TableCell align="right"> Card </TableCell>
                        <TableCell align="right">
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              flexWrap: "nowrap",
                            }}
                          >
                            {expandedOrder === order.id ? (
                              <button
                                onClick={() => handleViewDetails(order)}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  display: "flex",
                                  cursor: "pointer",
                                }}
                              >
                                <span> Less </span> <ExpandLessIcon />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleViewDetails(order)}
                                style={{
                                  backgroundColor: "transparent",
                                  border: "none",
                                  display: "flex",
                                  cursor: "pointer",
                                }}
                              >
                                <span> More </span> <ExpandMoreIcon />
                              </button>
                            )}
                            <DeleteIcon color="error" />
                          </div>
                        </TableCell>
                      </TableRow>
                      {expandedOrder === order.id && <MoreOrder />}
                      {/* <TableRow>
                        <TableCell
                          style={{
                            paddingBottom: 0,
                            paddingTop: 0,
                            width: "100%",
                          }}
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
                                            bgcolor: "background.paper",
                                          }}
                                        >
                                          <ListItem
                                            secondaryAction={
                                              <Typography
                                                edge="end"
                                                aria-label="comments"
                                              >
                                                {order.cart === null ? (
                                                  <p>No items found.</p>
                                                ) : (
                                                  <p style={{ color: "#000" }}>
                                                    {item.product.price} AMD
                                                  </p>
                                                )}
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
                                              primary={
                                                order.cart === null ? (
                                                  <p>No items found.</p>
                                                ) : (
                                                  <p
                                                    style={{
                                                      color: "#000",
                                                    }}
                                                  >
                                                    {item.product.name}
                                                  </p>
                                                )
                                              }
                                              secondary={
                                                order.cart === null ? (
                                                  <p>No items found.</p>
                                                ) : (
                                                  <p
                                                    style={{
                                                      color: "#000",
                                                    }}
                                                  >
                                                    {item.quantity}
                                                  </p>
                                                )
                                              }
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
                      </TableRow> */}
                    </React.Fragment>
                  ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      {Math.ceil(sortedAndSearchedOrders.length / perpage) > 1 && (
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

// end of test with order