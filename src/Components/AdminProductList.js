import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Box } from "@mui/material";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import EditProductDialog from "./EditProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import { Link } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const ProductRow = ({ product, onDelete, onEdit }) => (
  <TableRow key={product.id}>
    <TableCell component="th" scope="row">
      {product.id}
    </TableCell>
    <TableCell align="right">{product.name}</TableCell>
    <TableCell align="right">{product.description}</TableCell>
    <TableCell align="right">{product.price}</TableCell>
    <TableCell align="right">{product.productStatus}</TableCell>
    <TableCell align="right">
      <Button onClick={onEdit}>Edit</Button>
      <Button variant="contained" color="secondary" onClick={onDelete}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
);
export default function AdminProductList() {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [editProductModalOpen, setEditProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [deleteProductDialogOpen, setDeleteProductDialogOpen] = useState(false);
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
    }
  };
  return (
    <>
      <Box sx={{ mt: 5 }}>
        <TableContainer component={Paper}>
          <Box
            sx={{
              display: "flex",  
              justifyContent: "center",
              mb: 5,  
            }}
          >
            <Link
              to={"/admin/add-product"}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  textAlign: "center",                 
                }}
              >
                Add Product
              </Button>
            </Link>
          </Box>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Description</TableCell>
                <TableCell align="right">Price</TableCell>
                <TableCell align="right">Product status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  onDelete={() => handleDeleteClick(product)}
                  onEdit={() => {
                    setEditingProduct(product);
                    setEditProductModalOpen(true);
                  }}
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
        </TableContainer>
      </Box>
    </>
  );
}