import React, { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Grid from "@mui/material/Grid";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

const EditCustomerDialog = ({
  open,
  handleClose,
  customer,
  setUpdatedCustomer,
  handleUpdate,
}) => {
  const [editingCustomer, setEditingCustomer] = useState(null);
  useEffect(() => {
    setEditingCustomer(customer);
  }, [customer]);
  const handleFieldChange = (e) => {
    setEditingCustomer({
      ...editingCustomer,
      [e.target.name]: e.target.value,
    });
  };
  const handleSaveChanges = async () => {
    const response = await axios.put(
      `${BACKEND_BASE_URL}/customers/${editingCustomer.id}`,
      editingCustomer,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      setUpdatedCustomer(editingCustomer);
      console.log("Customer edited successfully");
      handleUpdate();
      handleClose();
    }
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            mt: 5,
            mb: 3,
            ml: 5,
            mr: 5,
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="First Name"
                  value={editingCustomer?.firstname || ""}
                  name="firstname"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Last Name"
                  value={editingCustomer?.lastname || ""}
                  name="lastname"
                  onChange={handleFieldChange}
                />
              </Grid>
            </Grid>
          </Box>
          <Box sx={{ flexGrow: 1, mt: 5 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Email"
                  value={editingCustomer?.email || ""}
                  name="email"
                  onChange={handleFieldChange}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Role"
                  value={editingCustomer?.role || ""}
                  name="role"
                  onChange={handleFieldChange}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          mb: 2,
          mr: 5,
        }}
      >
        <Stack spacing={5} direction="row">
          <Button
            variant="outlined"
            onClick={handleClose}
            sx={{
              color: "black",
              border: "none",
              outline: "black solid 1px",
              borderRadius: "50px",
              borderColor: "black",
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSaveChanges}
            outlined
            sx={{
              bgcolor: "rgb(233, 243, 251)",
              color: "rgb(23, 90, 208)",
              outline: "rgb(63, 119, 216) solid 1px",
              borderRadius: "50px",
              "&:hover": {
                bgcolor: "rgb(23, 90, 208)",
                color: "rgb(233, 243, 251)",
              },
            }}
          >
            Save Changes
          </Button>
        </Stack>
      </DialogActions>
    </Dialog>
  );
};
export default EditCustomerDialog;
