import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
// import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { TextareaAutosize } from "@mui/base";
import { styled } from "@mui/system";
import Grid from "@mui/material/Grid";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import axios from "axios";
import { CircleButton, InputQuantity } from "../Constants/sharedComponents";
const ProductItem = ({ product }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();
  const blue = {
    100: "#DAECFF",
    200: "#b6daff",
    400: "#3399FF",
    500: "#007FFF",
    600: "#0072E5",
    900: "#003A75",
  };
  const grey = {
    50: "#f6f8fa",
    100: "#eaeef2",
    200: "#d0d7de",
    300: "#afb8c1",
    400: "#8c959f",
    500: "#6e7781",
    600: "#57606a",
    700: "#424a53",
    800: "#32383f",
    900: "#24292f",
  };
  const StyledTextarea = styled(TextareaAutosize)(
    ({ theme }) => `
    width: 100%;
    resize: none;
    font-family: IBM Plex Sans, sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 12px;
    border-radius: 12px;
    color: ${theme.palette.mode === "dark" ? grey[300] : grey[900]};
    background: ${theme.palette.mode === "dark" ? grey[900] : "#fff"};
    border: 1px solid ${theme.palette.mode === "dark" ? grey[700] : grey[200]};
    box-shadow: 0px 2px 2px ${
      theme.palette.mode === "dark" ? grey[900] : grey[50]
    };
    &:hover {
      border-color: ${blue[400]};
    }
    &:focus {
      border-color: ${blue[400]};
      box-shadow: 0 0 0 3px ${
        theme.palette.mode === "dark" ? blue[500] : blue[200]
      };
    }   
    &:focus-visible {
      outline: 0;
    }
  `
  );
  const paperStyles = {
    borderRadius: "10px",
  };
  const paperStyless = {
    display: "flex",
    marginTop: "-8px",
    marginBottom: "-8px",
  };
  let [quantity, setQuantity] = useState(1);
  const [showQuantity, setShowQuantity] = useState(false);
  const addToCart = async (product) => {
    try {
      const response = await axios.put(
        `${BACKEND_BASE_URL}/carts`,
        { itemId: product.id, quantity: quantity },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (err) {
      console.log(err, "Something went wrong.");
    }
  };
  useEffect(() => {
    getData();
    if (showQuantity) {
      getData();
    }
  }, [showQuantity]);
  const getData = async () => {
    let updatedValue;
    try {
      const response = await axios.get(
        `${BACKEND_BASE_URL}/carts/current-user`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      updatedValue = response.data.productItems.find(
        (item) => item.product.id === product.id
      );
      setQuantity(() => {
        if (updatedValue) {
          return updatedValue.quantity;
        } else {
          return 1;
        }
      });
    } catch {
      console.log("Bad request");
    }
  };
  return (
    <>
      <Grid>
        <Grid>
          <Button onClick={handleOpen} disableRipple>
            <Card
              sx={{
                maxWidth: 260,
                justifyContent: "space-around",
                boxShadow: "0px 0px 0px 0.7px rgb(0 0 0 / 12%)",
                borderRadius: "10px",
                outline: "none",
                transition:
                  "transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
              }}
            >
              {product.imageUrl && (
                <Typography style={{ position: "relative" }}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    height="256px"
                    width="256px"
                  />
                </Typography>
              )}
              <CardContent sx={{ padding: "16px" }}>
                <Box
                  variant="body2"
                  color="text.secondary"
                  sx={{ height: "40px" }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1.57,
                      fontSize: "0.875rem",
                      textAlign: "center",
                      fontWeight: "700",
                      color: "#424242",
                    }}
                  >
                    {product.name}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    marginTop: "16px",
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <CardActions sx={{ display: "flex" }}>
                    <Box sx={{ lineHeight: "14px" }}>
                      <Box
                        sx={{
                          color: "#424242",
                        }}
                      >
                        <IconButton
                          sx={{
                            fontSize: "14px",
                            fontWeight: 900,
                          }}
                        >
                          {product.price}
                        </IconButton>
                        <IconButton
                          sx={{
                            fontSize: "9px",
                            fontWeight: 900,
                          }}
                        >
                          AMD
                        </IconButton>
                      </Box>
                    </Box>
                  </CardActions>
                  <Box sx={{ cursor: "pointer" }}>
                    {!showQuantity ? (
                      <Button
                        onClick={async (e) => {
                          await e.stopPropagation();
                          await setShowQuantity(true);
                          await addToCart(product);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <g transform="translate(-108 -187)">
                            <rect
                              width="24"
                              height="24"
                              transform="translate(108 187)"
                              fill="none"
                            ></rect>
                            <g transform="translate(111.236 190)">
                              <path
                                transform="translate(-150.521 -575.212)"
                                fill="#ea1f4d"
                                d="M156.71,587.519a.325.325,0,0,0,.079-.025,1.084,1.084,0,0,0,.227.026h8.2a1.438,1.438,0,0,0,1.255-.85L168.7,581.1a.77.77,0,0,0-.747-1.1h-2.735a.342.342,0,1,0,0,.684h2.735a.1.1,0,0,1,.112.166l-2.227,5.568a.755.755,0,0,1-.62.42h-8.2a.587.587,0,0,1-.518-.4l-1.378-5.511a.171.171,0,0,1,.186-.239h3.077a.342.342,0,1,0,0-.684h-3.077a.85.85,0,0,0-.85,1.088l1.378,5.511a1.16,1.16,0,0,0,.245.463,1.967,1.967,0,0,0-.753,1.03,1.087,1.087,0,0,0,.131.973,1.381,1.381,0,0,0,1.217.508h9.914a.342.342,0,1,0,0-.684h-9.914a.824.824,0,0,1-.658-.22.41.41,0,0,1-.045-.35C156.226,587.6,156.679,587.524,156.71,587.519Z"
                              ></path>
                              <path
                                transform="translate(-143 -565.996)"
                                fill="#ea1f4d"
                                d="M147.173,569.787l-.68-2.25a1.79,1.79,0,0,0-1.7-1.54h-1.453a.342.342,0,1,0,0,.684h1.47c.075,0,.76,0,1.023,1.039l.684,2.265a.342.342,0,0,0,.655-.2Z"
                              ></path>
                              <path
                                transform="translate(-151.556 -594.956)"
                                fill="#ea1f4d"
                                d="M157.709,610a1.709,1.709,0,1,0,1.709,1.709A1.711,1.711,0,0,0,157.709,610Zm0,2.735a1.026,1.026,0,1,1,1.026-1.026A1.027,1.027,0,0,1,157.709,612.735Z"
                              ></path>
                              <path
                                transform="translate(-167.351 -594.956)"
                                fill="#ea1f4d"
                                d="M181.709,610a1.709,1.709,0,1,0,1.709,1.709A1.711,1.711,0,0,0,181.709,610Zm0,2.735a1.026,1.026,0,1,1,1.026-1.026A1.027,1.027,0,0,1,181.709,612.735Z"
                              ></path>
                              <path
                                transform="translate(-160.111 -569.289)"
                                fill="#ea1f4d"
                                d="M171.174,578.442a.343.343,0,0,0,.438,0l2.051-1.709a.342.342,0,0,0-.438-.526l-1.491,1.242v-6.108a.342.342,0,0,0-.684,0v6.108l-1.491-1.242a.342.342,0,0,0-.438.526Z"
                              ></path>
                            </g>
                          </g>
                        </svg>
                      </Button>
                    ) : (
                      <Box
                        sx={{
                          display: "flex",
                          maxWidth: "120px",
                          boxSizing: "border-box",
                        }}
                      >
                        <CircleButton
                          onClick={(e) => {
                            return (
                              e.stopPropagation(),
                              quantity === 1 && setShowQuantity(false),
                              quantity > 1 && setQuantity(--quantity),
                              addToCart(product)
                            );
                          }}
                        >
                          -
                        </CircleButton>
                        <div sx={{ overflow: "hidden", maxWidth: "40px" }}>
                          <InputQuantity
                            onChange={(e) => {
                              setQuantity(e.target.value);
                            }}
                            onClick={(e) => {
                              return e.stopPropagation();
                            }}
                            maxLength="3"
                            value={quantity}
                          />
                        </div>
                        <CircleButton
                          onClick={(e) => {
                            return (
                              e.stopPropagation(),
                              setQuantity(++quantity),
                              addToCart(product)
                            );
                          }}
                        >
                          +
                        </CircleButton>
                      </Box>
                    )}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Button>
          <Dialog
            fullWidth
            open={open}
            onClose={handleClose}
            PaperProps={{ style: paperStyles }}
          >
            <DialogTitle sx={{ position: "relative" }}>
              <Button
                type="button"
                onClick={handleClose}
                sx={{
                  top: "10px",
                  right: "10px",
                  position: "absolute",
                  overflowX: "hidden",
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#e3e3e3"
                      d="M18.3,5.71a1,1,0,0,0-1.41,0L12,10.59,7.11,5.7A1,1,0,0,0,5.7,7.11L10.59,12,5.7,16.89A1,1,0,0,0,7.11,18.3L12,13.41l4.89,4.89a1,1,0,0,0,1.41-1.41L13.41,12,18.3,7.11A1,1,0,0,0,18.3,5.71Z"
                    ></path>
                  </svg>
                </span>
              </Button>
            </DialogTitle>
            <DialogContent PaperProps={{ style: paperStyless }}>
              <Card
                sx={{
                  display: "flex",
                  marginTop: "8px",
                  marginBottom: "8px",
                  overflow: "hidden",
                  boxShadow: "none",
                  borderRadius: "10px",
                  color: "#424242",
                  transition:
                    "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  backgroundColor: "#fff",
                }}
              >
                <CardMedia
                  sx={{
                    width: "150px",
                    height: "150px",
                    position: "relative",
                    borderBottomRightRadius: "10px",
                    borderTopRightRadius: "10px",
                    display: "block",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    "@media (min-width: 768px)": {
                      width: "60%",
                      height: "300px",
                    },
                  }}
                  style={{
                    backgroundImage: product.imageUrl
                      ? `url(${product.imageUrl})`
                      : "none",
                  }}
                ></CardMedia>
                <CardContent
                  sx={{
                    width: "calc(100% - 150px)",
                    position: "relative",
                    minHeight: "100%",
                    paddingTop: "0",
                    paddingRight: "0!important",
                    paddingBottom: "0!important",
                    padding: "16px",
                  }}
                >
                  <Box
                    sx={{
                      fontWeight: "bold",
                      paddingBottom: "8px",

                      "@media (min-width: 0px)": {
                        fontSize: "16px",
                      },
                      "@media (min-width: 768px)": {
                        paddingTop: "8px",
                        fontSize: "20px",
                      },
                    }}
                  >
                    {product.name}
                  </Box>
                  <Box
                    sx={{
                      width: "calc(100% - 16px)",
                      bottom: 0,
                      display: "flex",
                      position: "absolute",
                      flexDirection: "column",
                    }}
                  >
                    <Box sx={{ marginTop: "4px", marginBottom: "4px" }}>
                      <Box
                        component="span"
                        sx={{
                          fontSize: "20px",
                          fontWeight: "900",
                        }}
                      >
                        {product.price}
                      </Box>
                      <Box
                        component="span"
                        sx={{
                          fontSize: "15px",
                          fontWeight: 900,
                          marginLeft: "1.6px",
                        }}
                      >
                        AMD
                      </Box>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        maxWidth: "120px",
                        boxSizing: "border-box",
                      }}
                    >
                      <button
                        style={{
                          padding: "4.5px 13.12px",
                          border: "none",
                          margin: 0,
                          boxSizing: "border-box",
                          fontSize: "16px",
                          display: "inline-flex",
                          outline: 0,
                          position: "relative",
                          alignItems: "center",
                          verticalAlign: "middle",
                          justifyContent: "center",
                          textDecoration: "none",
                          background: "#E7E7E7",
                          borderRadius: "30px",
                          cursor: "pointer",
                        }}
                        onClick={() => quantity > 1 && setQuantity(--quantity)}
                      >
                        -
                      </button>
                      <div sx={{ overflow: "hidden", maxWidth: "40px" }}>
                        <input
                          type="text"
                          maxLength="3"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          style={{
                            width: "100%",
                            border: "none",
                            margin: 0,
                            outline: 0,
                            padding: "3px",
                            boxSizing: "border-box",
                            textAlign: "center",
                          }}
                        ></input>
                      </div>
                      <button
                        style={{
                          padding: "5.5px 10.98px",
                          border: "none",
                          margin: 0,
                          boxSizing: "border-box",
                          fontSize: "16px",
                          display: "inline-flex",
                          outline: 0,
                          position: "relative",
                          borderRadius: "30px",
                          alignItems: "center",
                          verticalAlign: "middle",
                          justifyContent: "center",
                          textDecoration: "none",
                          background: "#E7E7E7",
                          cursor: "pointer",
                        }}
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
              <Box sx={{ fontSize: "16px", marginTop: "24px" }}>
                {product.description}
              </Box>
            </DialogContent>
            <DialogActions
              onClick={handleClose}
              sx={{ paddingBottom: "32px", justifyContent: "center" }}
            >
              <Box sx={{ marginTop: "16px", width: "60%" }}>
                <Button
                  sx={{
                    color: "#fff",
                    width: "100%",
                    boxShadow: "none",
                    background:
                      "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                    padding: "10px 18px",
                    fontWeight: "bold",
                    lineHeight: "22px",
                    textTransform: "inherit",
                    borderRadius: "10px",
                  }}
                >
                  <Button
                    type="button"
                    sx={{
                      width: "100%",
                      display: "inherit",
                      alignItems: "inherit",
                      justifyContent: "inherit",
                      color: "#fff",
                    }}
                    onClick={() => {
                      addToCart(product);
                    }}
                    disabled={quantity ? false : true}
                  >
                    Add to Cart
                  </Button>
                </Button>
              </Box>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
    </>
  );
};
export default ProductItem;
