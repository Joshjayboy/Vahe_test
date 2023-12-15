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
export default function ProductTableRow(props) {
  const { product, setProduct, index, setEditingProduct, setInfo } = props;
  const classes = useStyles();
  const color = {
    text:
      product.productStatus === "Premium"
        ? `rgba(17,124,80,255)`
        : product.productStatus === "Blacklisted"
        ? `rgba(179,36,25,255)`
        : `rgba(23,90,208,255)`,
    backgroundColor:
      product.productStatus === "Premium"
        ? `rgba(229,247,238,255)`
        : product.productStatus === "Blacklisted"
        ? `rgba(254,243,242,255)`
        : `rgba(233,243,251,255)`,
    border:
      product.productStatus === "Premium"
        ? `rgba(166,234,195,255)`
        : product.productStatus === "Blacklisted"
        ? `rgba(254,205,202,255)`
        : `rgba(63,119,216,255)`,
  };
  return (
    <TableRow
      onClick={async () => {
        await setProduct(product);
        await setInfo(true);
      }}
      style={{
        backgroundColor: index % 2 !== 0 ? "white" : `rgba(249,250,251,255)`,
        cursor: "pointer",
        position: "relative",
        border: ".5px #ccc solid",
      }}
    >
      <TableCell component="th" scope="row" className={classes.tableCell}>
        {product.id}
      </TableCell>
      <TableCell style={{ fontFamily: "Inter" }} className={classes.tableCell}>
        {product.name}
      </TableCell>
      <TableCell style={{ fontFamily: "Inter" }} className={classes.tableCell}>
        {product.price}
      </TableCell>
      <TableCell style={{ fontFamily: "Inter" }} className={classes.tableCell}>
        {product.description}
      </TableCell>
      <TableCell style={{ fontFamily: "Inter" }} className={classes.tableCell}>
        {product.productCategory.name}
      </TableCell>
      <TableCell
        style={{ fontFamily: "Inter" }}
        align="center"
        className={classes.tableCell}
      >
        <div
          style={{
            color: color.text,
            backgroundColor: color.backgroundColor,
            outline: `2px ${color.border} solid`,
            borderRadius: "25px",
            padding: "4px 12px",
          }}
        >
          {product.productStatus}
        </div>
      </TableCell>
      <TableCell
        style={{ display: "flex" }}
        className={classes.tableCell}
        onClick={(e) => e.stopPropagation()}
      >
        <InfoOutlinedIcon
          onClick={async () => {
            await setProduct(product);
            await setInfo(true);
          }}
        />
        <DeleteIcon color="error" sx={{ ml: 0.8 }} />
      </TableCell>
    </TableRow>
  );
}
