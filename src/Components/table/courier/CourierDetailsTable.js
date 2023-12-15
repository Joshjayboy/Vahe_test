import { makeStyles } from "@material-ui/styles";
import { Table, TableBody, TableCell, TableRow } from "@mui/material";
import React, { useRef, useState } from "react";
import PenSVG from "../svg/PenSVG";
import CustomerItem from "../CustomerItem";
import ActionCell from "../actionCell/ActionCell";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const useStyles = makeStyles({
  tableItem: {
    width: "100%",
    backgroundColor: "transparent",
    backgroundColor: `rgba(249,250,251,255)`,
    border: "none",
    outline: "none",
    padding: "15px",
    paddingLeft: "20px",
    borderRadius: "15px",
  },
  cell: {
    border: "none",
  },
  textarea: {
    width: "100%",
    height: "122px",
    backgroundColor: `rgba(249,250,251,255)`,
    border: "none",
    outline: "none",
    borderRadius: "15px",
    paddingLeft: "15px",
    paddingTop: "10px",
  },
});

export default function CourierDetailsTable(props) {
  const { selectedCourier, changeCourierStatus, isChecked, setisChecked } =
    props;
  const classes = useStyles();
  const [firstname, setFirstname] = useState(
    selectedCourier.firstname ? selectedCourier.firstname : ""
  );
  const [lastname, setLastname] = useState(
    selectedCourier.lastname ? selectedCourier.lastname : ""
  );
  const [phoneNumber, setPhoneNumber] = useState(selectedCourier.phoneNumber);
  const [notes, setNotes] = useState("");
  const phone = useRef(null);
  const statusRef = useRef(null);
  const note = useRef(null);
  const [status, setStatus] = useState("");

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  const defaultVal = {
    "Name Last Name": false,
    phone: false,
    status: false,
    note: false,
  };

  const [isSelectedItem, setIsSelectedItem] = useState(defaultVal);

  const changeItem = (changed) => {
    setIsSelectedItem(() => {
      return {
        ...defaultVal,
        [changed]: !isSelectedItem[changed],
      };
    });
  };

  const someItemTrue = Object.values(isSelectedItem).some((item) => item);
  const onFocus = async (changed, changedStr) => {
    await changeItem(changedStr);
    (await changed.current) && changed.current.focus();
  };

  const updateField = {
    "Name Last Name": (
      <CustomerItem
        firstname={firstname}
        setFirstname={setFirstname}
        lastname={lastname}
        setLastname={setLastname}
      />
    ),
  };

  return (
    <Table>
      <TableBody>
        {/* ID */}
        <TableRow>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell sx={{ color: () => (someItemTrue ? "#ccc" : "black") }}>
            ID:
          </TableCell>
          <TableCell>
            <input
              className={classes.tableItem}
              value={selectedCourier.id}
              style={{ color: () => (!someItemTrue ? "blue" : "red") }}
              readOnly
              disabled={someItemTrue}
            />
          </TableCell>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell rowSpan={2} className={classes.cell}></TableCell>
        </TableRow>
        {/* Email */}
        <TableRow>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell sx={{ color: () => (someItemTrue ? "#ccc" : "black") }}>
            Email:
          </TableCell>
          <TableCell>
            <input
              className={classes.tableItem}
              value={selectedCourier.email}
              readOnly
              disabled={someItemTrue}
            />
          </TableCell>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell rowSpan={2} className={classes.cell}></TableCell>
        </TableRow>
        {/* Name, Lastname */}
        <TableRow>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell
            sx={{
              color: () =>
                isSelectedItem["Name Last Name"]
                  ? "black"
                  : someItemTrue
                  ? "#ccc"
                  : "black",
            }}
          >
            Name, Last Name
          </TableCell>
          {isSelectedItem["Name Last Name"] ? (
            <>
              <TableCell>{updateField["Name Last Name"]}</TableCell>
              <TableCell className={classes.cell} sx={{ alignSelf: "center" }}>
                <ActionCell onClick={() => changeItem("Name Last Name")} />
              </TableCell>
            </>
          ) : (
            <>
              <TableCell>
                <input
                  className={classes.tableItem}
                  readOnly
                  value={`${firstname ? firstname : ""}  ${
                    lastname ? lastname : ""
                  }`}
                  disabled={
                    isSelectedItem["Name Last Name"]
                      ? false
                      : someItemTrue
                      ? true
                      : false
                  }
                />
              </TableCell>
              <TableCell className={classes.cell}>
                <PenSVG
                  onClick={() => {
                    onFocus("Name Last Name", "Name Last Name");
                  }}
                />
              </TableCell>
            </>
          )}
          <TableCell rowSpan={2} className={classes.cell}></TableCell>
        </TableRow>
        {/* Phone */}
        <TableRow>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell
            sx={{
              color: () =>
                isSelectedItem.phone
                  ? "black"
                  : someItemTrue
                  ? "#ccc"
                  : "black",
            }}
          >
            Phone number
          </TableCell>
          <TableCell>
            <input
              className={classes.tableItem}
              readOnly={isSelectedItem.phone ? false : true}
              disabled={
                isSelectedItem.phone ? false : someItemTrue ? true : false
              }
              type="tel"
              ref={phone}
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value.replace(/[^0-9,]/g, ""));
              }}
            />
          </TableCell>
          {isSelectedItem.phone ? (
            <TableCell className={classes.cell}>
              <ActionCell onClick={() => changeItem("phone")} />
            </TableCell>
          ) : (
            <>
              <TableCell className={classes.cell}>
                <PenSVG onClick={() => onFocus(phone, "phone")} />
              </TableCell>
              <TableCell rowSpan={2} className={classes.cell}></TableCell>
            </>
          )}
        </TableRow>
        {/* Status */}
        <TableRow>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell
            sx={{
              color: () =>
                isSelectedItem.status
                  ? "black"
                  : someItemTrue
                  ? "#ccc"
                  : "black",
            }}
          >
            Status
          </TableCell>
          {isSelectedItem.status ? (
            <>
              <TableCell>
                <Box sx={{ minWidth: 120 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={status}
                      label="Status"
                      onChange={handleChange}
                    >
                      <MenuItem value={"WORKING"}>Active</MenuItem>
                      <MenuItem value={"INACTIVE"}>Inactive</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
              </TableCell>
              <TableCell className={classes.cell}>
                <ActionCell
                  onClick={() => changeItem("status")}
                  handleSaveChangesClick={async () => {
                    await changeCourierStatus(status);
                    await setisChecked(status === "INACTIVE" ? false : true);
                  }}
                />
              </TableCell>
            </>
          ) : (
            <>
              <TableCell>
                <input
                  className={classes.tableItem}
                  readOnly
                  disabled={
                    isSelectedItem.status ? false : someItemTrue ? true : false
                  }
                  value={!isChecked ? "Inactive" : "Active"}
                />
              </TableCell>
              <TableCell className={classes.cell}>
                <PenSVG onClick={() => onFocus(statusRef, "status")} />
              </TableCell>
              <TableCell rowSpan={2} className={classes.cell}></TableCell>
            </>
          )}
        </TableRow>
        <TableRow>
          <TableCell className={classes.cell}> </TableCell>
          <TableCell
            className={classes.cell}
            sx={{
              color: () =>
                isSelectedItem.note ? "black" : someItemTrue ? "#ccc" : "black",
            }}
          >
            Notes
          </TableCell>
          <TableCell className={classes.cell}>
            <textarea
              className={classes.textarea}
              type="text"
              placeholder="Random generated text"
              ref={note}
              value={notes}
              rows={3}
              disabled={!isSelectedItem.note}
              readOnly={!isSelectedItem.note}
              onChange={(e) => {
                setNotes(e.target.value);
              }}
            />
          </TableCell>
          {isSelectedItem.note ? (
            <TableCell className={classes.cell}>
              <ActionCell onClick={() => changeItem("note")} />
            </TableCell>
          ) : (
            <TableCell className={classes.cell}>
              <PenSVG onClick={() => onFocus(note, "note")} />
            </TableCell>
          )}
          <TableCell rowSpan={2} className={classes.cell}></TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
