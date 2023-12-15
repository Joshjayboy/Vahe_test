import React, { useState, useRef } from "react";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import SuccessSVG from "../table/svg/SuccessSVG";
import PenSVG from "../table/svg/PenSVG";
import CustomerItem from "../table/CustomerItem";
import { v4 as uuid } from "uuid";
import Snackbar from "./../snackbar/Snackbar";

export default function CustomerInfoItem(props) {
  const { customer, handleSaveChangesClick, showRequestMessage, message } =
    props;
  const phone = useRef(null);
  const role = useRef(null);
  const note = useRef(null);
  const [firstname, setFirstname] = useState(customer.firstname);
  const [lastname, setLastname] = useState(customer.lastname);
  const [phoneNumber, setPhoneNumber] = useState(customer.phoneNumber);
  const [notes, setNotes] = useState("");
  const [isSelectedItem, setIsSelectedItem] = useState({
    "Name Last Name": false,
    phone: false,
    role: false,
    note: false,
  });

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

  const changeItem = (changed) => {
    setIsSelectedItem((prev) => {
      return {
        ...prev,
        [changed]: !isSelectedItem[changed],
      };
    });
  };

  const onFocus = async (changed, changedStr) => {
    await changeItem(changedStr);
    (await changed.current) && changed.current.focus();
  };

  return (
    <>
      {showRequestMessage && <Snackbar message={message} />}
      {/* ID */}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
        }}
      >
        <TableCell sx={{ border: "none" }}> ID </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            paddingBottom: "25px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
          }}
        >
          <input
            readOnly
            value={customer.id}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
          />
        </TableCell>
      </TableRow>

      {/* Name, Last name */}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
        }}
      >
        <TableCell sx={{ border: "none" }}> Name, Last Name </TableCell>
        {isSelectedItem["Name Last Name"] ? (
          <>
            <TableCell sx={{ border: "none" }}>
              {updateField["Name Last Name"]}
            </TableCell>
            <TableCell sx={{ border: "none", alignSelf: "center" }}>
              <>
                <span
                  onClick={() => changeItem("Name Last Name")}
                  style={{ cursor: "pointer", marginRight: "2px" }}
                >
                  X
                </span>
                <SuccessSVG
                  onClick={async () => {
                    await handleSaveChangesClick({
                      ...customer,
                      firstname,
                      lastname,
                    });
                    await changeItem("Name Last Name");
                  }}
                />
              </>
            </TableCell>
          </>
        ) : (
          <>
            <TableCell
              sx={{
                height: "80%",
                paddingLeft: "15px",
                alignSelf: "center",
                backgroundColor: `rgba(249,250,251,255)`,
                borderRadius: "15px",
                border: "none",
              }}
            >
              <input
                readOnly
                value={firstname + " " + lastname}
                style={{
                  width: "100%",
                  backgroundColor: "transparent",
                  border: "none",
                  outline: "none",
                }}
              />
            </TableCell>
            <TableCell sx={{ border: "none", alignSelf: "center" }}>
              <PenSVG
                onClick={() => onFocus("Name Last Name", "Name Last Name")}
              />
            </TableCell>
          </>
        )}
      </TableRow>

      {/* Email Address */}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
        }}
      >
        <TableCell sx={{ border: "none" }}> Email Address </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
          }}
        >
          <input
            readOnly
            value={customer.email}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
          />
        </TableCell>
      </TableRow>

      {/* Phone Number */}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
        }}
      >
        <TableCell sx={{ border: "none" }}> Phone Number </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
          }}
        >
          <input
            disabled={!isSelectedItem.phone}
            type="tel"
            ref={phone}
            value={phoneNumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
          />
        </TableCell>
        <TableCell sx={{ border: "none", alignSelf: "center" }}>
          {isSelectedItem.phone ? (
            <>
              <span
                onClick={() => changeItem("phone")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesClick({
                    ...customer,
                    phoneNumber,
                  });
                  await changeItem("phone");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(phone, "phone")} />
          )}
        </TableCell>
      </TableRow>

      {/* Address */}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: ".2px grey solid",
          borderBottom: `1px rgba(242,244,246,255) solid`,
        }}
      >
        <TableCell sx={{ border: "none" }}> Address </TableCell>

        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
          }}
        >
          {customer.addresses.map((txt, index) => {
            return (
              <div
                key={uuid()}
                style={{
                  display: "flex",
                  backgroundColor: `rgba(249,250,251,255)`,
                  padding: "25px",
                  margin: "5px 0",
                  borderRadius: "15px",
                }}
              >
                <span> {++index}. </span>
                <p style={{ width: "100%" }}> {txt.addr} </p>
              </div>
            );
          })}
        </TableCell>
      </TableRow>

      {/* Role */}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
        }}
      >
        <TableCell sx={{ border: "none" }}> Role </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
          }}
        >
          <input
            disabled={true}
            type="text"
            ref={role}
            value={customer.role}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
          />
        </TableCell>

        <TableCell sx={{ border: "none", alignSelf: "center" }}>
          {isSelectedItem.role ? (
            <>
              <span
                onClick={() => changeItem("role")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesClick({
                    ...customer,
                    //
                  });
                  await changeItem("role");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(role, "role")} />
          )}
        </TableCell>
      </TableRow>

      {/* Notes */}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",

          border: "none",
          outline: "none",
        }}
      >
        <TableCell sx={{ border: "none" }}> Notes </TableCell>
        <TableCell
          style={{
            width: "100%",
            borderRadius: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderColor: "none",
          }}
        >
          <textarea
            type="text"
            placeholder="Random generated text"
            ref={note}
            value={notes}
            rows={3}
            disabled={!isSelectedItem.note}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            style={{
              width: "100%",
              height: "122px",
              backgroundColor: `rgba(249,250,251,255)`,
              border: "none",
              outline: "none",
              borderRadius: "15px",
              paddingLeft: "15px",
              paddingTop: "10px",
            }}
          />
        </TableCell>
        <TableCell sx={{ border: "none", alignSelf: "center" }}>
          {isSelectedItem.note ? (
            <>
              <span
                onClick={() => changeItem("note")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesClick({
                    ...customer,
                  });
                  await changeItem("note");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(note, "note")} />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
