import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Logout from "./Logout";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import Footer from "./Footer";

const ProductsList = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  const [cartItems, setCartItems] = useState([]);
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }

  React.useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/products`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          Cookie: "JSESSIONID=CA5696E69CC8087799286FBD15245034",
        },
      });
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const getCartItems = async () => {
    const response = await axios.get(`${BACKEND_BASE_URL}/carts/current-user`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
      },
    });
    setCartItems(response.data.productItems);
    console.log("Request to backend")
  }

  const groupByCategory = (products) => {
    return products.reduce((groups, product) => {
      const category = product.productCategory.name;
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(product);
      return groups;
    }, {});
  };

  const productsByCategory = groupByCategory(products);
  const categories = Object.keys(productsByCategory);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filterProducts = (products) => {
    if (search.length > 3) {
      products = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (selectedCategory) {
      products = products.filter(
        (product) => product.productCategory.name === selectedCategory
      );
    }
    return products;
  };

  return (
    <>


      <Box sx={{ minHeight: "600px", marginTop: "90px" }}>
        <Box
          sx={{
            "@media (min-width: 768px)": {
              paddingTop: "40px",
              paddingBottom: "40px",
            },
            "@media (min-width: 0px)": {
              paddingTop: "8px",
              paddingBottom: "8px",
            },
          }}
        >
          <Grid
            container
            spacing={2}
            sx={{
              "@media (min-width: 768px)": {
                paddingLeft: "24px",
                paddingRight: "24px",
              },
              "@media (min-width: 1200px)": {
                justifyContent: "space-between",
              },
            }}
          >
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "space-between",
                "@media (min-width: 1200px)": {
                  justifyContent: "space-between",
                },
              }}
            >
              <Grid
                item
                xs={12}
                sm={8}
                md={8}
                lg={3}
                xl={3}
                sx={{
                  "@media (min-width: 992px)": {
                    top: "-195px",
                  },
                  "@media (min-width: 768px)": {
                    top: "-153px",
                  },

                  "@media (min-width: 1200px)": {
                    top: 0,
                    position: "relative",
                  },
                  top: "50px",
                  display: "flex",
                  zIndex: "111",
                  position: "sticky",
                  flexDirection: "column",
                  backgroundColor: "#f9f9fb",
                  boxSizing: "border-box",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    marginTop: "0",
                    marginRight: "15px",
                    flexDirection: "column",
                    paddingBottom: "8px",
                    backgroundColor: "#f9f9fb",
                  }}
                >
                  <FormControl>
                    <OutlinedInput
                      type="text"
                      startAdornment={
                        <InputAdornment position="end">
                          <IconButton edge="start">
                            <SearchIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                      placeholder="Search Products"
                      onChange={handleSearchChange}
                    />
                  </FormControl>

                  <Box sx={{ margin: "21px" }}>
                    <Typography sx={{ marginBottom: "20px" }}>
                      Categories:
                    </Typography>
                    <List key={categories.id}>
                      <ListItem
                        button
                        key="All"
                        onClick={() => handleCategorySelect(null)}
                      >
                        <ListItemText primary="All categories" />
                      </ListItem>
                      {categories.map((category) => (
                        <ListItem
                          button
                          key={category}
                          onClick={() => handleCategorySelect(category)}
                        >
                          <ListItemText primary={category} />
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  {/* search end */}
                </div>
              </Grid>
              <Grid
                item
                sx={{ paddingLeft: 1 }}
                xs={12}
                sm={8}
                md={8}
                lg={8.69}
                xl={9}
              >
                <div>
                  <div style={{ height: "auto", overflow: "visible" }}>
                    <Box
                      sx={{
                        borderBottom: "2px solid #e3e3e3",
                        marginBottom: "40px",
                        paddingBottom: "40px",
                      }}
                    >
                      <Box
                        sx={{
                          flexGrow: 1,
                          justifyContent: "space-between",
                          marginBottom: "21px",
                        }}
                      >
                        {Object.entries(productsByCategory).map(
                          ([category, products]) => {
                            products = filterProducts(products);
                            if (products.length === 0) return null;

                            return (
                              <>
                                <Box key={category} sx={{ margin: "-1px" }}>
                                  <Typography
                                    component="h2"
                                    sx={{
                                      padding: 0,
                                      fontSize: "24px",
                                      fontWeight: "bold",
                                      lineHeight: "33px",
                                      color: "#c5022e",
                                      margin: "10px",
                                      marginBottom: "50px",
                                    }}
                                  >
                                    {category}
                                  </Typography>
                                </Box>
                                <Grid
                                  container
                                  spacing={{ xs: 5 }}
                                  sx={{
                                    marginBottom: "10%",
                                    "@media (min-width: 1200px)": {
                                      justifyContent: "start ",
                                    },
                                    justifyContent: "space-around",
                                  }}
                                >
                                  {products.map((product) => (
                                    <ProductItem
                                      key={product.id}
                                      product={product}
                                      initialCartItems={cartItems}
                                    />
                                  ))}
                                </Grid>
                              </>
                            );
                          }
                        )}
                      </Box>
                    </Box>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default ProductsList;
