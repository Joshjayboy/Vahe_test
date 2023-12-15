import React, { useState } from "react";
import { Divider, Table, TableBody } from "@mui/material";
import CustomerInfoItem from "./customer/CustomerInfoItem";

export default function CustomerInfo(props) {
  const { customer, handleSaveChangesClick, showRequestMessage, message } =
    props;

  return (
    <>
      <h4 style={{ fontSize: "18px", paddingLeft: "25px" }}> Customer Info </h4>
      <p style={{ paddingLeft: "25px" }}> ID: {customer.id} </p>
      <Divider />
      <Table sx={{ width: "80%", margin: "auto" }}>
        <TableBody style={{ display: "flex", flexDirection: "column" }}>
          <CustomerInfoItem
            customer={customer}
            handleSaveChangesClick={handleSaveChangesClick}
            showRequestMessage={showRequestMessage}
            message={message}
          />
        </TableBody>
      </Table>
    </>
  );
}
