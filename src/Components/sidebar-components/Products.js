import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Box, Divider, Typography } from "@mui/material";
import { BACKEND_BASE_URL } from "../../Constants/AppConstants";
import EditProductDialog from ".././EditProductDialog";
import DeleteProductDialog from ".././DeleteProductDialog";
import Link from "@mui/material/Link";
import axios from "axios";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TextField from "@mui/material/TextField";
import ProductTableRow from "../table/ProductTableRow";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ProductInfo from "../ProductInfo";
import AddProduct from "../table/product/AddProduct";
import DeleteProduct from "../modal/Delete";
import Search from "../table/Search";
import TableName from "../table/TableName";
const useStyles = makeStyles({
  table: {
    // minWidth: "60%",
  },
});

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "#F9FAFB",
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function AdminProductList() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
  const [info, setInfo] = useState(false);
  const [showRequestMessage, setShowRequestMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isAddProduct, setIsAddProduct] = useState(false);

  const [open, setOpen] = useState(false);

  const handleButtonClick = (product) => {
    setInfo(true);
    setInfo(product);
  };
  const handleButtonClicks = () => {
    setInfo(!info);
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const fetchProducts = async () => {
    const response = await axios.get(`${BACKEND_BASE_URL}/products`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
      },
    });
    setProducts(response.data);
  };
  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteProductDialogOpen(true);
    setOpen(true);
  };
  const handleConfirmDelete = async () => {
    const response = await axios.delete(
      `${BACKEND_BASE_URL}/products/${productToDelete.id}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    if (response.status === 200) {
      setProducts(
        products.filter((product) => product.id !== productToDelete.id)
      );
      setDeleteProductDialogOpen(false);
      setOpen(false);
    }
  };
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };
  const sortedAndSearchedproducts = products
    .filter((products) =>
      `${products.id} ${products.name} ${products.price} ${products.description} ${products.productCategory.name} ${products.productStatus}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .sort(
      (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1) * (order === "asc" ? 1 : -1)
    );
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: "#F9FAFB",
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));
  const handleSaveChangesClick = async (product) => {
    try {
      const updatedInfo = {
        ...product,
      };

      const response = await axios.put(
        `${BACKEND_BASE_URL}/products/${product.id}`,
        updatedInfo,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Update successful:", response);
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  return (
    <>
      {isAddProduct ? (
        <AddProduct setIsAddProduct={setIsAddProduct} />
      ) : info ? (
        <>
          <div
            style={{
              backgroundColor: "rgba(245,245,245,255)",
              outline: "4px rgba(245,245,245,255) solid",
            }}
          >
            <button
              onClick={() => {
                handleButtonClicks(false);
              }}
              style={{
                width: "200px",
                marginTop: "20px",
                marginLeft: 3,
                fontFamily: "Inter",
                color: "green",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                cursor: "pointer",
                marginBottom: "20px",
              }}
            >
              <ArrowBackIcon sx={{ mr: 1 }} /> Back to product
            </button>
          </div>
          <div
            style={{
              padding: "16px",
              outline: "7px rgba(245,245,245,255) solid",
              borderRadius: "15px",
              marginTop: "5px",
            }}
          >
            <ProductInfo
              product={product}
              showRequestMessage={showRequestMessage}
              message={message}
              handleSaveChangesClick={handleSaveChangesClick}
            />
          </div>
        </>
      ) : (
        <Box sx={{ width: "100%", overflow: "auto", height: "100%" }}>
          <TableName> Products </TableName>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Search search={search} setSearch={setSearch} />
            <Box
              sx={{
                mr: 2,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  textAlign: "center",
                  backgroundColor: "#669F2A",
                }}
                onClick={() => setIsAddProduct(true)}
              >
                + &ensp; Add Product
              </Button>
            </Box>
          </Box>
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
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "price"}
                      direction={orderBy === "price" ? order : "asc"}
                      onClick={() => handleSort("price")}
                    >
                      Price
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "description"}
                      direction={orderBy === "description" ? order : "asc"}
                      onClick={() => handleSort("description")}
                    >
                      Description
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "category"}
                      direction={orderBy === "category" ? order : "asc"}
                      onClick={() => handleSort("category")}
                    >
                      Category
                    </TableSortLabel>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === "status"}
                      direction={orderBy === "status" ? order : "asc"}
                      onClick={() => handleSort("status")}
                    >
                      status
                    </TableSortLabel>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedAndSearchedproducts.map((product, index) => (
                  <ProductTableRow
                    key={product.id}
                    product={product}
                    setProduct={setProduct}
                    index={index}
                    setEditingProduct={setEditingProduct}
                    setInfo={setInfo}
                  />
                ))}
              </TableBody>
            </Table>
            <EditProductDialog
              open={editProductModalOpen}
              onClose={() => setEditProductModalOpen(false)}
              product={editingProduct}
              setUpdatedProduct={setEditingProduct}
              handleClose={() => setEditProductModalOpen(false)}
              handleUpdate={fetchProducts}
            />
            <DeleteProductDialog
              open={deleteProductDialogOpen}
              onclose={() => setDeleteProductDialogOpen(false)}
              onConfirm={handleConfirmDelete}
            />
            {open && (
              <DeleteProduct
                setOpen={setOpen}
                handleConfirmDelete={handleConfirmDelete}
              />
            )}
          </TableContainer>
        </Box>
      )}
    </>
  );
}
