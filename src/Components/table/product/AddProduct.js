import React, { useState } from "react";
import TableName from "../TableName";

import LanguageIcon from "@mui/icons-material/Language";
import {
  Box,
  Divider,
  List,
  ListItem,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { v4 as uuid } from "uuid";
import AddIcon from "@mui/icons-material/Add";
import { BACKEND_BASE_URL, Languages } from "../../../Constants/AppConstants";
import SnackbarMessage from "../../snackbar/Snackbar";
import DragAndDropImage from "../../dragDropFiles/DragAndDropImage";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

export default function AddProduct(props) {
  const { setIsAddProduct } = props;
  const [language, setLanguage] = useState("Eng");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [productStatus, setProductStatus] = useState("AVAILABLE");
  const [categories, setCategories] = useState(["Meat", "Food", "Swallow"]);
  const [categoryName, setCategoryName] = useState("");
  const [selectCategory, setSelectCategory] = useState("");
  const isCategoryExists = categories.find(
    (category) => category.toLowerCase() === categoryName.toLowerCase()
  );
  const disabled =
    name.length < 3 ||
    description.length < 1 ||
    price < 1 ||
    selectCategory.length < 2;
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const [productId, setProductId] = useState("");
  const [isSelect, setIsSelect] = useState(false);
  const [message, setMessage] = useState("");
  const [productCreated, setProductCreated] = useState(false);
  const [fileSize, setFileSize] = useState(0);
  const [isImageSend, setIsImageSend] = useState(false);
  const [isSend, setIsSend] = useState(false);

  const handleSubmit = async () => {
    const response = await fetch(`${BACKEND_BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        description: description,
        price: price,
        productStatus: productStatus,
        productCategory: {
          name: selectCategory,
        },
        productDetails: [],
        ingredients: [],
      }),
    });

    if (response.status === 201) {
      const data = await response.json();
      setProductId(data.id);
      setIsImageSend(true);
      setProductCreated(true);
    }
  };

  const returnFileSize = (number) => {
    if (file.size > 2 * 1000 * 1024) {
      setFileSize("File size exceeds the maximum allowed size.");
    }
  };

  const handleImageSubmit = async () => {
    if (file.size > 2 * 1000 * 1024) {
      returnFileSize();
    } else {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const imageResponse = await fetch(
          `${BACKEND_BASE_URL}/products/${productId}/add-image`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            },
            body: formData,
          }
        );
        if (imageResponse.status === 200) {
          setMessage("Product was added successfully");
          setIsSend(true);
          setTimeout(() => {
            setMessage("");
            setProductCreated(false);
            navigate("/");
            setIsSend(false);
          }, 2000);
        } else {
          setMessage("Product could not be added.");
          setTimeout(() => {
            setIsSend(false);
            setMessage("");
          }, 2000);
        }
      }
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(245,245,245,255)",
          outline: "4px rgba(245,245,245,255) solid",
        }}
      >
        <button
          onClick={() => {
            navigate(setIsAddProduct(false));
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
          <ArrowBackIcon sx={{ mr: 1 }} /> Back to products
        </button>
      </div>

      <div
        style={{
          borderRadius: "15px",
          marginTop: "5px",
          padding: "16px",
          outline: "7px rgba(245,245,245,255) solid",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <TableName> Add Product Info </TableName>
          <div style={{ position: "relative" }}>
            <LanguageIcon
              style={{ position: "absolute", left: "10px", top: "30%" }}
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <Select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                sx={{ paddingLeft: "20px" }}
              >
                {Languages.map((lang) => {
                  return (
                    <MenuItem key={uuid()} value={lang}>
                      {lang}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
        </div>

        <Divider />
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell> Product Name </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value.trimStart())}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Product Description</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    rows={3}
                    multiline
                    id="Enter Description"
                    label="Enter Description"
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value.trimStart())}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Product Price </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label="Price"
                    variant="outlined"
                    value={price}
                    onChange={(e) =>
                      setPrice(e.target.value.replace(/[^0-9,]/g, ""))
                    }
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Product Status </TableCell>
                <TableCell>
                  <FormControl
                    sx={{ m: 1, minWidth: 120 }}
                    size="small"
                    fullWidth
                  >
                    <InputLabel id="demo-select-small-label">Status</InputLabel>
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={productStatus}
                      label="Available"
                      onChange={(e) => {
                        setProductStatus(e.target.value);
                      }}
                    >
                      <MenuItem value={"AVAILABLE"}>AVAILABLE</MenuItem>
                      <MenuItem value={"FINISHED"}>FINISHED</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell> Product Category </TableCell>
                <TableCell>
                  <div
                    style={{
                      border: "1px #ccc solid",
                      borderRadius: "15px",
                      padding: "10px",
                    }}
                  >
                    {isSelect ? (
                      <div>
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignContent: "stretch",
                          }}
                        >
                          <AddIcon
                            sx={{
                              cursor: isCategoryExists ? "auto" : "pointer",
                            }}
                            onClick={() => {
                              isCategoryExists ||
                                categoryName.length < 2 ||
                                setCategories((prev) => {
                                  return [...prev, categoryName];
                                }) ||
                                setCategoryName("");
                            }}
                          />
                          <input
                            placeholder="Add a new category"
                            style={{
                              border: "none",
                              flexGrow: 2,
                              paddingLeft: "10px",
                              marginTop: "2ox",
                              outline: "none",
                              backgroundColor: "transparent",
                            }}
                            value={categoryName}
                            onChange={(e) =>
                              setCategoryName(e.target.value.trimStart())
                            }
                          />
                        </div>
                        <br />

                        {!!categories.length && <Divider />}

                        {categories.map((category) => {
                          return (
                            <List key={uuid()} style={{ cursor: "pointer" }}>
                              <ListItem
                                onClick={() => {
                                  setSelectCategory(category);
                                  setIsSelect(false);
                                }}
                              >
                                {category}
                              </ListItem>
                            </List>
                          );
                        })}
                      </div>
                    ) : (
                      <div onClick={() => setIsSelect(true)}>
                        <FormControl
                          fullWidth
                          style={{ outline: "5px red sollid" }}
                        >
                          <InputLabel id="demo-simple-select-label">
                            Category
                          </InputLabel>
                          <Select
                            disabled
                            variant="standard"
                            style={{
                              border: "none",
                              outline: "none",
                              color: "black",
                            }}
                            onClick={() => {
                              setIsSelect(true);
                            }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectCategory}
                            label="Category"
                          >
                            {categories.map((category) => {
                              return (
                                <MenuItem key={uuid()} value={category}>
                                  {" "}
                                  {category}{" "}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </div>
                    )}
                  </div>
                  {isCategoryExists && (
                    <span style={{ color: "red" }}>
                      The category name already exists.
                    </span>
                  )}
                </TableCell>
              </TableRow>
              {!!isImageSend && (
                <TableRow>
                  <TableCell> Please, upload product picture </TableCell>
                  <TableCell>
                    <DragAndDropImage file={file} setFile={setFile} />
                    <p style={{ color: "red" }}> {!!fileSize && fileSize} </p>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ padding: "20px 50px" }}>
          <button
            style={{
              width: "150px",
              padding: "5px ",
              marginRight: "20px",
              backgroundColor: "white",
              borderRadius: "15px",
              border: "none",
              outline: "1px black solid",
              cursor: "pointer",
            }}
            onClick={() => {
              setName("");
              setDescription("");
              setPrice(0);
              setProductStatus("Available");
              setCategoryName("");
              setCategories([]);
            }}
          >
            Cancel
          </button>
          <button
            disabled={!!disabled}
            style={{
              width: "150px",
              padding: "7px 0",
              marginLeft: "20px",
              backgroundColor: disabled ? "#cccccc" : "green",
              borderRadius: "15px",
              color: "white",
              border: "none",
              cursor: disabled ? "auto" : "pointer",
            }}
            onClick={() => {
              return !!productCreated ? handleImageSubmit() : handleSubmit();
            }}
          >
            Save
          </button>
        </Box>
        {isSend && <SnackbarMessage message={message} />}
      </div>
    </>
  );
}
