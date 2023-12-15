import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { Box } from "@mui/material";
import { v4 as uuid } from "uuid";
import AddressItem from "./AddressItem";

export default function Address(props) {
  const { customer, selectedAddress, setSelectedAddress } = props;

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSelectedAddress(value);
  };

  return (
    <div>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Choose the Address to Edit
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectedAddress}
            label="Choose the Address to Edit"
            onChange={handleChange}
          >
            {customer.addresses.map((address) => {
              return (
                <MenuItem key={uuid()} value={address}>
                  {address.addr}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>

      {/* Edit */}
      {!selectedAddress.length && (
        <AddressItem
          address={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}

      {/* add new address */}
      <p style={{ color: "green", cursor: "pointer" }}>+ Add another address</p>
    </div>
  );
}
