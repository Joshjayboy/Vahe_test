import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import axios from "axios";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
const EditProductDialog = ({
  open,
  handleClose,
  product,
  setUpdatedProduct,
  handleUpdate,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);
  useEffect(() => {
    setEditingProduct(product);
  }, [product]);
  const handleFieldChange = (e) => {
    setEditingProduct({
      ...editingProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleImageSubmit = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      const imageResponse = await fetch(
        `${BACKEND_BASE_URL}/products/${editingProduct.id}/add-image`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
          body: formData,
        }
      );
      if (imageResponse.status === 200) {
        console.log(`Image added successfully to product ${editingProduct.id}`);
        imageResponse.json().then((data) => {
          setEditingProduct(data);
        });
      } else {
        console.log("Image upload failed");
      }
    }
  };
  const handleSaveChanges = async () => {
    const response = await axios.put(
      `${BACKEND_BASE_URL}/products/${editingProduct.id}`,
      editingProduct,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setUpdatedProduct(editingProduct);
      console.log("Product edited successfully");
      handleUpdate();
      handleClose();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          value={editingProduct?.name || ""}
          name="name"
          onChange={handleFieldChange}
        />
        <TextField
          label="Description"
          value={editingProduct?.description || ""}
          name="description"
          onChange={handleFieldChange}
        />
        <TextField
          label="Price"
          value={editingProduct?.price || ""}
          name="price"
          onChange={handleFieldChange}
        />
        <TextField
          label="ProductStatus"
          value={editingProduct?.productStatus || ""}
          name="productStatus"
          onChange={handleFieldChange}
        />
        {editingProduct?.imageUrl && (
          <img
            src={editingProduct.imageUrl}
            alt="product"
            height="256px"
            width="256px"
          />
        )}
        <Grid item xs={12}>
          <input
            type="file"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
          {imageFile && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleImageSubmit}
            >
              Change image
            </Button>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </DialogActions>
    </Dialog>
  );
};
export default EditProductDialog;