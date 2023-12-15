import React, { useState, useRef } from "react";
import { TableRow } from "@mui/material";
import { TableCell } from "@mui/material";
import SuccessSVG from "../table/svg/SuccessSVG";
import PenSVG from "../table/svg/PenSVG";
import CustomerItem from "../table/CustomerItem";
import { v4 as uuid } from "uuid";
import Snackbar from "./../snackbar/Snackbar";
import { Box, Typography } from "@mui/material";
import { BACKEND_BASE_URL } from "../../Constants/AppConstants";
import axios from "axios";
export default function ProductInfoItem(props) {
  const { product, handleSaveChangesClick } = props;
  const [showRequestMessage, setShowRequestMessage] = useState(false);
  const [message, setMessage] = useState("");
  const pname = useRef(null);
  const cat = useRef(null);
  const status = useRef(null);
  const price = useRef(null);
  const astatus = useRef(null);
  const desc = useRef(null);
  const [productName, setProductName] = useState(product.name);
  const [category, setCategory] = useState(product.productCategory.name);
  const [productStatus, setProductStatus] = useState(product.productStatus);
  const [oStatus, setOStatus] = useState(product.productStatus);
  const [pprice, setPprice] = useState(product.price);
  const [des, setDes] = useState(product.description);
  const [isSelectedItem, setIsSelectedItem] = useState({
    pname: false,
    category: false,
    status: false,
    price: false,
    astatus: false,
    des: false,
  });
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
  const handleSaveChangesClickname = async (product) => {
    console.log(productName);
    try {
      const updatedInfo = {
        ...product,
        name: productName,
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
        setShowRequestMessage(true);
        setMessage("Product Name edited successfully");
        setTimeout(() => {
          setShowRequestMessage(false);
          setMessage("");
        }, 3000);
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  const handleSaveChangesClickcat = async (
    product,
    productCategory,
    newCatalog
  ) => {
    console.log(category);
    try {
      const updatedInfo = {
        ...product.productCategory,
        name: category,
      };
      const response = await axios.put(
        `${BACKEND_BASE_URL}/products/${product.id}`,
        { productCategory: updatedInfo },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("Update successful:", response.data.productCategory.name);
        setShowRequestMessage(true);
        setMessage("Product Category edited successfully");
        setTimeout(() => {
          setShowRequestMessage(false);
          setMessage("");
        }, 3000);
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  const handleSaveChangesStatus = async (product) => {
    console.log(productStatus);
    try {
      const updatedInfo = {
        ...product,
        productStatus: productStatus,
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
        setShowRequestMessage(true);
        setMessage("Status edited successfully");
        setTimeout(() => {
          setShowRequestMessage(false);
          setMessage("");
        }, 3000);
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  const handleSaveChangesClickprice = async (product) => {
    console.log(pprice);
    try {
      const updatedInfo = {
        ...product,
        price: pprice,
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
        setShowRequestMessage(true);
        setMessage("Price edited successfully");
        setTimeout(() => {
          setShowRequestMessage(false);
          setMessage("");
        }, 3000);
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  const handleSaveChangesoStatus = async (product) => {
    console.log(oStatus);
    try {
      const updatedInfo = {
        ...product,
        productStatus: oStatus,
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
        setShowRequestMessage(true);
        setMessage("Status edited successfully");
        setTimeout(() => {
          setShowRequestMessage(false);
          setMessage("");
        }, 3000);
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  const handleSaveChangesClickdes = async (product) => {
    console.log(productName);
    try {
      const updatedInfo = {
        ...product,
        description: des,
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
        setShowRequestMessage(true);
        setMessage("Description edited successfully");
        setTimeout(() => {
          setShowRequestMessage(false);
          setMessage("");
        }, 3000);
      } else {
        console.log("Not successful");
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };
  return (
    <>
      {showRequestMessage && <Snackbar message={message} />}
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
          mt: 3,
          mb: 2,
        }}
      >
        <TableCell sx={{ border: "none" }}> Product Name </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            paddingBottom: "25px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
            mb: 2,
          }}
        >
          <input
            disabled={!isSelectedItem.pname}
            ref={pname}
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
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
          {isSelectedItem.pname ? (
            <>
              <span
                onClick={() => changeItem("pname")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesClickname({
                    ...product,
                    productName,
                  });
                  await changeItem("pname");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(pname, "pname")} />
          )}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
        }}
      >
        <TableCell sx={{ border: "none" }}> Product Category </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
            mb: 2,
          }}
        >
          <input
            disabled={!isSelectedItem.cat}
            ref={cat}
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
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
          {isSelectedItem.cat ? (
            <>
              <span
                onClick={() => changeItem("cat")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesClickcat({
                    ...product,
                    category,
                  });
                  await changeItem("cat");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(cat, "cat")} />
          )}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
          mt: 2,
        }}
      >
        <TableCell sx={{ border: "none" }}> Product Status </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
            mb: 2,
          }}
        >
          <input
            disabled={!isSelectedItem.status}
            type="text"
            ref={status}
            value={productStatus}
            onChange={(e) => {
              setProductStatus(e.target.value);
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
          {isSelectedItem.status ? (
            <>
              <span
                onClick={() => changeItem("status")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesStatus({
                    ...product,
                    oStatus,
                  });
                  await changeItem("status");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(status, "status")} />
          )}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: ".2px grey solid",
          borderBottom: `1px rgba(242,244,246,255) solid`,
          mt: 2,
        }}
      >
        <TableCell sx={{ border: "none" }}> ID</TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
            mb: 2,
          }}
        >
          <input
            readOnly
            value={product.id}
            style={{
              width: "100%",
              backgroundColor: "transparent",
              border: "none",
              outline: "none",
            }}
          />
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
          mt: 2,
        }}
      >
        <TableCell sx={{ border: "none" }}> Price </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
            mb: 2,
          }}
        >
          <input
            disabled={!isSelectedItem.price}
            type="text"
            ref={price}
            value={pprice}
            onChange={(e) => {
              setPprice(e.target.value);
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
          {isSelectedItem.price ? (
            <>
              <span
                onClick={() => changeItem("price")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesClickprice({
                    ...product,
                    pprice,
                  });
                  await changeItem("price");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(price, "price")} />
          )}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          borderBottom: `1px rgba(242,244,246,255) solid`,
          mt: 2,
        }}
      >
        <TableCell sx={{ border: "none" }}> Status </TableCell>
        <TableCell
          sx={{
            height: "80%",
            paddingLeft: "15px",
            paddingBottom: "25px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderRadius: "15px",
            border: "none",
            mb: 2,
          }}
        >
          <input
            disabled={!isSelectedItem.astatus}
            ref={astatus}
            value={oStatus}
            onChange={(e) => {
              setOStatus(e.target.value);
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
          {isSelectedItem.astatus ? (
            <>
              <span
                onClick={() => changeItem("oStatus")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesoStatus({
                    ...product,
                    oStatus,
                  });
                  await changeItem("astatus");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(astatus, "astatus")} />
          )}
        </TableCell>
      </TableRow>
      <TableRow
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 4fr 1fr",
          border: "none",
          outline: "none",
          mt: 2,
        }}
      >
        <TableCell sx={{ border: "none" }}> Description </TableCell>
        <TableCell
          style={{
            width: "100%",
            borderRadius: "15px",
            alignSelf: "center",
            backgroundColor: `rgba(249,250,251,255)`,
            borderColor: "none",
            mb: 5,
          }}
        >
          <textarea
            type="text"
            placeholder="Random generated text"
            ref={desc}
            value={des}
            rows={3}
            disabled={!isSelectedItem.desc}
            onChange={(e) => {
              setDes(e.target.value);
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
          {isSelectedItem.desc ? (
            <>
              <span
                onClick={() => changeItem("desc")}
                style={{ cursor: "pointer", marginRight: "20px" }}
              >
                X
              </span>
              <SuccessSVG
                onClick={async () => {
                  await handleSaveChangesClickdes({
                    ...product,
                    des,
                  });
                  await changeItem("desc");
                }}
              />
            </>
          ) : (
            <PenSVG onClick={() => onFocus(desc, "desc")} />
          )}
        </TableCell>
      </TableRow>
    </>
  );
}
