import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from "../../Constants/AppConstants";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle, List } from "@material-ui/core";
import AddressForm from "./AddressForm";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import Button from '@mui/material/Button';
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
const AddressList = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  React.useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);
  const [addresses, setAddresses] = useState([]);
  const [editingAddress, setEditingAddress] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const customerId = JSON.parse(sessionStorage.getItem("loggedInUser")).id;
  const [addressIdToDelete, setAddressIdToDelete] = useState('');
  const [deletionStatus, setDeletionStatus] = useState('');
  useEffect(() => {
    const fetchAddresses = async () => {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/customers/logged-in`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setAddresses(response.data.addresses);
    };
    fetchAddresses();
  }, []);
  const handleEdit = (address) => {
    setEditingAddress(address);
    setModalOpen(true);
  };
  const handleModalClose = () => {
    setModalOpen(false);
    setEditingAddress(null);
    const fetchAddresses = async () => {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/customers/logged-in`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setAddresses(response.data.addresses);
    };
    fetchAddresses();
  };
  const [openModal, setOpenModal] = useState(false);
  const handleDeleteClick = async (addressId) => {
    setAddressIdToDelete(addressId);
    setOpenModal(true);
  };
  const handleConfirmDelete = async (addressId, Id, id, address, addressid) => {
    try {
      console.log('Starting handleConfirmDelete...');
      const accessToken = sessionStorage.getItem('accessToken');
      if (!accessToken) {
        console.error('Access token is missing');
        return;
      }
      console.log('Access token:', accessToken);
      console.log('AddressId:', addresses);
      const url = `${BACKEND_BASE_URL}/customers/${customerId}/remove-address`;
      console.log('DELETE URL:', url);
      const response = await axios.delete(url, {
        params: {
          addressId: addressId,
        },
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      console.log('AddressId: check', addressId);
      if (response.status === 200) {
        setOpenModal(false);
        console.log("Address deleted successfully");
        setDeletionStatus('Address deleted successfully');
        setAddresses((prevAddresses) => prevAddresses.filter((address) => address.id !== addressId));
      } else {
        console.error("Error deleting address:", response.data);
      }
    } catch (error) {
      console.error("Error deleting address:", error.message);
    }
  };
  const handleCancelDelete = () => {
    setOpenModal(false);
  };
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "90px",
          marginBottom: "0px"
        }}
      >
        <Box sx={{ width: "43%" }}>        
          <List>
            {addresses.length === 0 ? (
              <Typography
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  color: "#c5022e",
                  marginTop: "30px",
                  fontWeight: "bold",
                }}
              >
                {t("no_saved_address")}
              </Typography>

            ) : (

              addresses.map((address) => (
                <Box key={address.id} sx={{ marginBottom: "16px" }}>
                  <Box sx={{ display: "flex", alignItems: "baseline" }}>
                    <InputLabel
                      root="true"
                      animated="true"
                      sx={{
                        overflow: "hidden",
                        fontSize: "14px",
                        marginRight: "8px",
                        marginBottom: "8px",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <Typography
                        component="span"
                        root="true"
                        caption="true"
                        noWrap
                        sx={{
                          fontSize: "0.75rem",
                          whiteSpace: "nowrap",
                          fontWeight: "400",
                          lineHeight: "1.66",
                          color: "#363636",
                        }}
                      >
                        {`${address.city} ${address.street}`}
                      </Typography>
                    </InputLabel>
                  </Box>
                  <FormControl
                    sx={{
                      width: "100%",
                    }}
                  >
                    <OutlinedInput
                      readOnly
                      defaultValue={address.addressIdentifier}
                      required
                      name="password"
                      className="form1_4"
                      sx={{
                        borderRadius: "10px",
                        border: "1px solid #cccccc",
                        outline: "none",
                        backgroundColor: "#ffffff",
                      }}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            edge="end"
                            onClick={() => handleEdit(address)}
                          >
                            <EditIcon
                              sx={{
                                color: "#d60f3c",
                              }}
                            />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteClick(address.id)}
                            edge="end"
                          >
                            <DeleteIcon
                              sx={{
                                color: "red",
                              }}
                            />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                  <Dialog
                    open={openModal}
                    onClose={handleCancelDelete}
                    aria-labelledby="delete-modal-title"
                    aria-describedby="delete-modal-description"
                  >
                    <DialogTitle
                      sx={{
                        backgroundColor: 'white',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        minWidth: 300,
                        textAlign: 'center',
                      }}
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete this address?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          This step cannot be reversed
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={() => handleConfirmDelete(address.id)} autoFocus>
                          Yes
                        </Button>
                        <Button onClick={handleCancelDelete}>No</Button>
                      </DialogActions>
                    </DialogTitle>
                  </Dialog>
                </Box>
              ))
            )}
          </List>
        </Box>
      </Box>
      <Box
        sx={{
          marginTop: "10px",
        }}
      >
        <Box
          sx={{
            marginTop: "5%",
            display: "flex",
            justifyContent: "center",
            cursor: "pointer",
            backgroundColor: "#c5022e",
            margin: "100px 40%",
            borderRadius: "10px",
          }}
          onClick={() => {
            setModalOpen(true);
          }}
        >
          <Box
            variant="contained"
            sx={{
              marginTop: 20,
              color: "#fff",
              borderRadius: "10px",
              margin: "20px",
            }}
          >
            {t("add_address")}
          </Box>
        </Box>
        <Dialog open={isModalOpen} onClose={handleModalClose}>
          <DialogTitle>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "#c5022e",
                fontWeight: "bold",
              }}
            >
              {editingAddress ? "Edit Address" : "Add Address"}
            </Box>
          </DialogTitle>
          <DialogContent>
            <AddressForm
              initialAddressData={editingAddress}
              customerId={customerId}
              onClose={handleModalClose}
            />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};
export default AddressList;