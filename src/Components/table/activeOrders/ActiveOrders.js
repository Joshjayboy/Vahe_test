import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useState } from "react";
import ActiveOrderRow from "./ActiveOrderRow";
import { v4 as uuid } from "uuid";

export default function ActiveOrders() {
  const [activeOrders, setActiveOrders] = useState([{}, {}, {}]);

  return (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell> Company </TableCell>
          <TableCell> Order Status </TableCell>
          <TableCell> About </TableCell>
        </TableRow>
        {activeOrders.length >= 1 ? (
          activeOrders.map((activeOrder, index) => {
            return (
              <ActiveOrderRow
                key={uuid()}
                activeOrder={activeOrder}
                index={index}
              />
            );
          })
        ) : (
          <TableRow>
            <TableCell sx={{ border: "none" }}>No data available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
