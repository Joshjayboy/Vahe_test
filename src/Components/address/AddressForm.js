import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants/AppConstants";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import i18next from "i18next";
const AddressForm = ({ initialAddressData, customerId, onClose }) => {
  const { t } = useTranslation();
  const { lang } = useParams();
  React.useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);
  const [address, setAddress] = useState({
    id: "",
    addressIdentifier: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
    deliveryInstructions: "",
    defaultAddress: false,
  });
  useEffect(() => {
    if (initialAddressData) {
      setAddress(initialAddressData);
    }
  }, [initialAddressData]);
  const handleInputChange = (event) => {
    setAddress({
      ...address,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (initialAddressData) {
      updateAddress();
    } else {
      addAddress();
    }
  };
  const updateAddress = async () => {
    const response = await axios.put(
      `${BACKEND_BASE_URL}/customers/${customerId}/update-address/${initialAddressData.id}`,
      address,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    if (response.status === 200) {
      console.log("Address updated successfully");
      onClose();
    }
  };
  const addAddress = async () => {
    const response = await axios.post(
      `${BACKEND_BASE_URL}/customers/${customerId}/add-address`,
      address,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    if (response.status === 201) {
      console.log("Address created successfully");
      onClose();
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          name="addressIdentifier"
          label={t("add_address")}
          variant="outlined"
          value={address.addressIdentifier}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="street"
          label={t("street")}
          variant="outlined"
          value={address.street}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="city"
          label={t("city")}
          variant="outlined"
          value={address.city}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="state"
          label={t("state")}
          variant="outlined"
          value={address.state}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="postalCode"
          label={t("postal_code")}
          variant="outlined"
          value={address.postalCode}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="country"
          label={t("country")}
          variant="outlined"
          value={address.country}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="phoneNumber"
          label={t("phone_number")}
          variant="outlined"
          value={address.phoneNumber}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          margin="normal"
          name="deliveryInstructions"
          label={t("delivery_instructions")}
          variant="outlined"
          value={address.deliveryInstructions}
          onChange={handleInputChange}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
            marginBottom: "30px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            style={{
              marginTop: 20,
              borderRadius: "10px",
              backgroundColor: "#c5022e",
            }}
            type="submit"
          >
            {initialAddressData ? "Edit Address" : "Add Address"}
          </Button>
        </Box>
      </form>
    </>
  );
};
export default AddressForm;
