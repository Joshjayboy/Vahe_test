import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import InputLabel from "@mui/material/InputLabel";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
export const CreateProduct = () => {
  const [isProductCreated, setProductCreated] = useState(false);
  const [imageFile, setFile] = useState(null);
  const [productId, setProductId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    productStatus: "",
    productDetails: [{ id: "", cookingTime: "" }],
    ingredients: [{ id: "", name: "", description: "" }],
  });
  const handleInputChange = (e, index, section) => {
    const { name, value } = e.target;
    const list = [...product[section]];
    list[index][name] = value;
    setProduct((prevState) => ({ ...prevState, [section]: list }));
  };
  const handleRemoveClick = (index, section) => {
    const list = [...product[section]];
    list.splice(index, 1);
    setProduct((prevState) => ({ ...prevState, [section]: list }));
  };
  const handleAddClick = (section) => {
    setProduct((prevState) => ({
      ...prevState,
      [section]: [...product[section], { id: "", name: "", description: "" }],
    }));
  };
  const handleProductChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const addProductCategory = (e) => {
    setProduct({ ...product, [e.target.name]: { name: e.target.value } });
  };
  const handleImageSubmit = async () => {
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
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
        console.log(`Image added successfully to product ${productId}`);
        navigate("/");
      } else {
        console.log("Image upload failed");
      }
    }
  };
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(product);
    const response = await fetch(`${BACKEND_BASE_URL}/products`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    });
    if (response.status === 201) {
      const data = await response.json();
      console.log(`Created product ${data}`);
      setProductCreated(true);
      setProductId(data.id);
    }
  };
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        sx={{
          display: "flex",
          marginLeft: "25%",
          justifyContent: "center",
          width: "50%",
          overflow: "hidden",
          marginTop: "30px",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "center",
                FontSize: "90px",
                fontWeight: "900",
                mb: "60px",
              }}
            >
              Create a Product
            </Typography>
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <InputLabel                
                  animated
                  sx={{
                    overflow: "hidden",
                    marginRight: "8px",
                    marginBottom: "8px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    component="span"
                    root
                    caption
                    noWrap
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      fontWeight: "400",
                      lineHeight: "1.66",
                      color: "#363636",
                    }}
                  >
                    Name *
                  </Typography>
                </InputLabel>
              </Box>
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <OutlinedInput
                  outline="none"
                  placeholder="Name"
                  required
                  name="name"
                  sx={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    border: "1px solid #cccccc",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                  }}
                  onChange={handleProductChange}
                  id="outlined-adornment-password"
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <InputLabel                
                  animated
                  sx={{
                    overflow: "hidden",
                    marginRight: "8px",
                    marginBottom: "8px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    component="span"
                    root
                    caption
                    noWrap
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      fontWeight: "400",
                      lineHeight: "1.66",
                      color: "#363636",
                    }}
                  >
                    Description
                  </Typography>
                </InputLabel>
              </Box>
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <OutlinedInput
                  outline="none"
                  placeholder="Give a Description"
                  required
                  name="description"
                  sx={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    border: "1px solid #cccccc",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                  }}
                  onChange={handleProductChange}
                  id="outlined-adornment-password"
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <InputLabel
                  animated
                  sx={{
                    overflow: "hidden",
                    marginRight: "8px",
                    marginBottom: "8px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    component="span"
                    root
                    caption
                    noWrap
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      fontWeight: "400",
                      lineHeight: "1.66",
                      color: "#363636",
                    }}
                  >
                    Price
                  </Typography>
                </InputLabel>
              </Box>
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <OutlinedInput
                  outline="none"
                  placeholder="Please set the Price"
                  required
                  name="price"
                  sx={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    border: "1px solid #cccccc",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                  }}
                  onChange={handleProductChange}
                  id="outlined-adornment-password"
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <InputLabel
                  animated
                  sx={{
                    overflow: "hidden",
                    marginRight: "8px",
                    marginBottom: "8px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    component="span"
                    root
                    caption
                    noWrap
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      fontWeight: "400",
                      lineHeight: "1.66",
                      color: "#363636",
                    }}
                  >
                    Product Status
                  </Typography>
                </InputLabel>
              </Box>
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <OutlinedInput
                  outline="none"
                  placeholder="Type the Product Status here..."
                  required
                  name="productStatus"
                  sx={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    border: "1px solid #cccccc",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                  }}
                  onChange={handleProductChange}
                />
              </FormControl>
            </Box>
            <Box sx={{ marginBottom: "16px" }}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <InputLabel
                  animated
                  sx={{
                    overflow: "hidden",
                    marginRight: "8px",
                    marginBottom: "8px",
                    textOverflow: "ellipsis",
                  }}
                >
                  <Typography
                    component="span"
                    root
                    caption
                    noWrap
                    sx={{
                      fontSize: "0.75rem",
                      whiteSpace: "nowrap",
                      fontWeight: "400",
                      lineHeight: "1.66",
                      color: "#363636",
                    }}
                  >
                    Product category
                  </Typography>
                </InputLabel>
              </Box>
              <FormControl
                sx={{
                  width: "100%",
                }}
              >
                <OutlinedInput
                  outline="none"
                  placeholder="Type the Product category here..."
                  required
                  name="productCategory"
                  sx={{
                    fontSize: "14px",
                    letterSpacing: "1px",
                    border: "1px solid #cccccc",
                    borderRadius: "10px",
                    backgroundColor: "#ffffff",
                  }}
                  onChange={addProductCategory}
                />
              </FormControl>
            </Box>
            <Grid container spacing={3} sx={{ overflowY: "hidden" }}>
              {product.productDetails.map((x, i) => {
                return (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        mt: "60px",
                        FontSize: "90px",
                        fontWeight: "900",
                        mb: "30px",
                      }}
                    >
                      Product Details
                    </Box>
                    <Box sx={{ marginBottom: "16px" }}>
                      <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <InputLabel
                          animated
                          sx={{
                            overflow: "hidden",
                            marginRight: "8px",
                            marginBottom: "8px",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            component="span"
                            root
                            caption
                            noWrap
                            sx={{
                              fontSize: "0.75rem",
                              whiteSpace: "nowrap",
                              fontWeight: "400",
                              lineHeight: "1.66",
                              color: "#363636",
                            }}
                          >
                            Cooking Time
                          </Typography>
                        </InputLabel>
                      </Box>
                    </Box>
                    <Grid fullWidth container>
                      <Grid
                        item
                        sx={{
                          width: "70%",
                        }}
                      >
                        <Box sx={{ marginBottom: "16px" }}>
                          <FormControl container fullWidth>
                            <OutlinedInput
                              outline="none"
                              placeholder="Add a Cooking Time here..."
                              name="cookingTime"
                              value={x.cookingTime}
                              sx={{
                                fontSize: "14px",
                                letterSpacing: "1px",
                                border: "1px solid #cccccc",
                                borderRadius: "10px",
                                backgroundColor: "#ffffff",
                              }}
                              onChange={(e) =>
                                handleInputChange(e, i, "productDetails")
                              }
                            />
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        sx={{
                          marginLeft: "50px",
                          marginTop: "9px",
                        }}
                      >
                        {product.productDetails.length !== 1 && (
                          <Box>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() =>
                                handleRemoveClick(i, "productDetails")
                              }
                              sx={{
                                borderRadius: "10px",
                                backgroundColor: "#c5022e",
                              }}
                            >
                              <DeleteIcon />
                            </Button>
                          </Box>
                        )}
                        {product.productDetails.length - 1 === i && (
                          <Button
                            variant="contained"
                            onClick={() => handleAddClick("productDetails")}
                            sx={{
                              borderRadius: "10px",
                              backgroundColor: "#c5022e",
                            }}
                          >
                            <AddCircleIcon />
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
              {product.ingredients.map((x, i) => {
                return (
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        mt: "60px",
                        FontSize: "90px",
                        fontWeight: "900",
                        mb: "30px",
                      }}
                    >
                      Ingredients
                    </Box>
                    <Box sx={{ marginBottom: "16px" }}>
                      <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <InputLabel                          
                          animated
                          sx={{
                            overflow: "hidden",
                            marginRight: "8px",
                            marginBottom: "8px",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            component="span"
                            root
                            caption
                            noWrap
                            sx={{
                              fontSize: "0.75rem",
                              whiteSpace: "nowrap",
                              fontWeight: "400",
                              lineHeight: "1.66",
                              color: "#363636",
                            }}
                          >
                            Name
                          </Typography>
                        </InputLabel>
                      </Box>
                      <FormControl
                        sx={{
                          width: "100%",
                        }}
                      >
                        <OutlinedInput
                          outline="none"
                          placeholder="What is the Name of the Ingredient?"                          
                          value={x.name}
                          name="name"
                          sx={{
                            fontSize: "14px",
                            letterSpacing: "1px",
                            border: "1px solid #cccccc",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                          }}
                          onChange={(e) =>
                            handleInputChange(e, i, "ingredients")
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box sx={{ marginBottom: "16px" }}>
                      <Box sx={{ display: "flex", alignItems: "baseline" }}>
                        <InputLabel                          
                          animated
                          sx={{
                            overflow: "hidden",
                            marginRight: "8px",
                            marginBottom: "8px",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <Typography
                            component="span"
                            root
                            caption
                            noWrap
                            sx={{
                              fontSize: "0.75rem",
                              whiteSpace: "nowrap",
                              fontWeight: "400",
                              lineHeight: "1.66",
                              color: "#363636",
                            }}
                          >
                            Description
                          </Typography>
                        </InputLabel>
                      </Box>
                      <FormControl
                        sx={{
                          width: "100%",
                        }}
                      >
                        <OutlinedInput
                          outline="none"
                          placeholder="Give the ingredient a befiting description..."
                          name="description"
                          value={x.description}
                          sx={{
                            fontSize: "14px",
                            letterSpacing: "1px",
                            border: "1px solid #cccccc",
                            borderRadius: "10px",
                            backgroundColor: "#ffffff",
                          }}
                          onChange={(e) =>
                            handleInputChange(e, i, "ingredients")
                          }
                        />
                      </FormControl>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {product.ingredients.length !== 1 && (
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => handleRemoveClick(i, "ingredients")}
                          sx={{
                            borderRadius: "10px",
                            backgroundColor: "#c5022e",
                          }}
                        >
                          <DeleteIcon />
                        </Button>
                      )}
                      {product.ingredients.length - 1 === i && (
                        <Button
                          variant="contained"
                          onClick={() => handleAddClick("ingredients")}
                          sx={{
                            borderRadius: "10px",
                            backgroundColor: "#c5022e",
                          }}
                        >
                          <AddCircleIcon />
                        </Button>
                      )}
                    </Box>                   
                  </Grid>
                );
              })}
              <Grid
                item
                fullWidth
                xs={12}
                sx={{
                  marginTop: "70px",
                  marginBottom: "70px",
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  onSubmit={handleSubmit}
                  onClick={handleSubmit}
                  sx={{
                    borderRadius: "10px",
                    backgroundColor: "#c5022e",
                  }}
                >
                  Submit
                </Button>
              </Grid>
              {isProductCreated && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    marginBottom: "100px",
                  }}
                >
                  <input type="file" onChange={handleFileChange} />
                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ width: "200px", height: "200px" }}
                    />
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleImageSubmit}
                    sx={{
                      borderRadius: "10px",
                      backgroundColor: "#c5022e",
                    }}
                  >
                    Upload Image
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default CreateProduct;