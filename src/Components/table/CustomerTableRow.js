import React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { makeStyles } from "@mui/styles";

import DeleteIcon from "@mui/icons-material/Delete";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

const useStyles = makeStyles({
  tableCell: {
    width: "14%",
    border: "none",
  },
});

export default function CustomerTableRow(props) {
  const {
    customer,
    setCustomer,
    index,
    setEditingCustomer,
    setCustomerToDelete,
    setDeleteCustomerDialog,
    setEditCustomerModalOpen,
    setShowCustomerInfo,
  } = props;
  const classes = useStyles();

  const handleDeleteClick = (customer) => {
    setCustomerToDelete(customer);
    setDeleteCustomerDialog(true);
  };
  const color = {
    text:
      customer.role === "Premium"
        ? `rgba(17,124,80,255)`
        : customer.role === "Blacklisted"
        ? `rgba(179,36,25,255)`
        : `rgba(23,90,208,255)`,
    backgroundColor:
      customer.role === "Premium"
        ? `rgba(229,247,238,255)`
        : customer.role === "Blacklisted"
        ? `rgba(254,243,242,255)`
        : `rgba(233,243,251,255)`,
    border:
      customer.role === "Premium"
        ? `rgba(166,234,195,255)`
        : customer.role === "Blacklisted"
        ? `rgba(254,205,202,255)`
        : `rgba(63,119,216,255)`,
  };

  return (
    <TableRow
      onClick={async () => {
        await setCustomer(customer);
        await setShowCustomerInfo(true);
      }}
      // style={{
      //   backgroundColor: index % 2 !== 0 ? "white" : `rgba(249,250,251,255)`,
      //   cursor: "pointer",
      //   position: "relative",
      //   border: ".5px #ccc solid",
      // }}
      sx={{
        "&:last-child td, &:last-child th": { border: 0 },
        backgroundColor: index % 2 === 0 ? `rgba(249,250,251,255)` : "white",
        border: ".5px #ccc solid",
      }}
    >
      {/* <TableCell component="th" scope="row" className={classes.tableCell}> */}
      <TableCell component="th" scope="row">
        {customer.id === null ? <p>No items found.</p> : <p> {customer.id}</p>}
      </TableCell>
      <TableCell style={{ fontFamily: "Inter" }}>
        {customer.firstname}
      </TableCell>
      <TableCell style={{ fontFamily: "Inter" }}>{customer.lastname}</TableCell>
      <TableCell style={{ fontFamily: "Inter" }}>{customer.email}</TableCell>
      <TableCell style={{ fontFamily: "Inter" }}>
        {customer.phoneNumber}
      </TableCell>
      <TableCell
        style={{ fontFamily: "Inter" }}
        align="center"
        // className={classes.tableCell}
      >
        <div
          style={{
            color: color.text,
            backgroundColor: color.backgroundColor,
            // outline: `2px ${color.border} solid`,
            //   borderRadius: "25px",
            //   padding: "4px 12px",
          }}
        >
          {customer.role}
        </div>
      </TableCell>
      <TableCell
        //  style={{ display: "flex" }}
        //   className={classes.tableCell}
        onClick={(e) => e.stopPropagation()}
      >
        <InfoOutlinedIcon
          onClick={() => {
            setEditingCustomer(customer);
            setEditCustomerModalOpen(true);
          }}
        />
        <DeleteIcon
          color="error"
          onClick={() => handleDeleteClick(customer)}
          sx={{ ml: 0.8 }}
        />
      </TableCell>
    </TableRow>
  );
}
