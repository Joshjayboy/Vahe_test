import React from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import { Box, Button, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import Select from "@mui/material/Select";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaymentIcon from "@mui/icons-material/Payment";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import List from "./List";
import axios from "axios";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
const NavBar = () => {
  const { t } = useTranslation();

  const [errorLogOutMsg, setErrorLogOutMsg] = React.useState("");
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/auth/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("loggedInUser");
        navigate("/login");
      }
    } catch (error) {
      setErrorLogOutMsg(error.response.data.message);
    }
  };

  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [anchorElCart, setAnchorElCart] = React.useState(null);
  const openCart = Boolean(anchorElCart);
  const handleOpenCartClick = (event) => {
    setAnchorElCart(event.currentTarget);
  };
  const handleCloseCart = () => {
    setAnchorElCart(null);
  };
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const [age, setAge] = React.useState("");
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/sign-up");
  };
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  if (isLoggedIn) {
    return <Navigate to="/en" />;
  }
  const handleLoginClick = () => {
    navigate("/login");
  };
  if (isLoggedIn) {
    return <Navigate to="/en" />;
  }
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{
        margin: "25px ",
      }}
    >
      <Box sx={{ margin: "30px", borderRadius: "10px" }}>
        {/* <AccountCircleIcon /> Jakintemi@gmail.com */}
        <AccountCircleIcon />{" "}
        {JSON.parse(sessionStorage.getItem("loggedInUser")).email}
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          {JSON.parse(sessionStorage.getItem("loggedInUser")).phoneNumber}
          {/* 08160641688 */}
        </Typography>
        {/* <MenuItem onClick={handleMenuClose}>
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <FavoriteBorderIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("favourite")}
          </Box>
        </MenuItem> */}
        <MenuItem onClick={handleMenuClose}>
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <PaymentIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("payment")}
          </Box>
        </MenuItem>
        {/* <MenuItem onClick={handleMenuClose}>
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <BookOnlineIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("bonus")}
          </Box>
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            navigate("/orders");
          }}
        >
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <CollectionsBookmarkIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("orderHistory")}
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/my-orders");
          }}
        >
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <LocationOnIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("myorders")}
          </Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/profile");
          }}
        >
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <SettingsIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("accountSettings")}
          </Box>
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            component="a"
            // href="/login"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#c5022e",
              color: "#F5F5F5",
            }}
          >
            {t("signout")}
          </Button>
        </MenuItem>
      </Box>
    </Menu>
  );
  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>{t("profile")}</p>
      </MenuItem>
    </Menu>
  );
  return (
    <>
      <Box sx={{ flexGrow: 1, overflow: "hidden" }}>
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#f9f9fb",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component={Link}
              to="/en"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150.204"
                height="32.728"
              >
                <text
                  x="10"
                  y="30"
                  fontFamily="Arial"
                  fontSize="40"
                  fill="#ea1f4d"
                  fontWeight="900"
                  fontStyle="italic"
                  fillRule="evenodd"
                >
                  Vema
                </text>
              </svg>
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              {isLoggedIn ? (
                <div>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                    onClick={handleLoginClick}
                  >
                    <Box
                      variant="text"
                      sx={{
                        backgroundColor: "#f9f9fb",
                        marginRight: "16px",
                        paddingLeft: "32px",
                        paddingRight: "32px",
                        color: "#c5022e",
                        fontWeight: "bold",
                        textTransform: "inherit",
                      }}
                    >
                      Sign in
                    </Box>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                    onClick={handleSignupClick}
                  >
                    <Box
                      variant="contained"
                      sx={{
                        boxShadow: "none",
                        borderRadius: "10px",
                        color: "#fff",
                        background:
                          "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                      }}
                    >
                      Sign Up
                    </Box>
                  </IconButton>
                </div>
              ) : (
                <div></div>
              )}
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
                sx={{
                  background:
                    "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                  color: "white",
                  marginRight: "10px",
                  borderRadius: "10px",
                  margin: "5px",
                }}
              >
                <PersonIcon />
              </IconButton>
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleOpenCartClick}
              >
                <Box
                  position="relative"
                  sx={{
                    boxShadow: "none",
                    borderRadius: "10px",
                    color: "#fff",
                    background:
                      "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="44"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <g transform="translate(0 0)">
                      <path
                        fill="#fff"
                        d="M19.978,4.822a1.221,1.221,0,0,0-1.055-.541H4.655a1.388,1.388,0,0,0-1.069.514,1.3,1.3,0,0,0-.222,1.152L4.9,12.22a2.013,2.013,0,0,0,.153.361,2.776,2.776,0,0,0-.708,1.11,1.527,1.527,0,0,0,.194,1.388A1.874,1.874,0,0,0,6.2,15.8H17.383a.764.764,0,0,0,.042-1.527H6.2c-.319,0-.444-.083-.472-.18.208-.583.527-.666.555-.68h9.55a1.971,1.971,0,0,0,1.749-1.166L20.089,6a1.221,1.221,0,0,0-.111-1.18Zm-3.762,6.94a.569.569,0,0,1-.389.25H6.584a.305.305,0,0,1-.25-.194L4.821,5.751H18.6Z"
                        transform="translate(1.286 1.661)"
                      ></path>
                      <path
                        fill="#fff"
                        d="M4.9,5.441a.736.736,0,0,0,.43-.361.708.708,0,0,0,0-.555L4.622,2A2.332,2.332,0,0,0,2.373,0H.736a.736.736,0,0,0,0,1.471H2.387c.139,0,.611,0,.819.916l.777,2.568a.736.736,0,0,0,.708.514Z"
                        transform="translate(0 0)"
                      ></path>
                      <path
                        fill="#fff"
                        d="M7.836,14.226a.694.694,0,0,0-.694.694.722.722,0,1,1-.708-.722.694.694,0,0,0,0-1.388,2.11,2.11,0,1,0,2.1,2.11A.694.694,0,0,0,7.836,14.226Z"
                        transform="translate(1.672 4.97)"
                      ></path>
                      <path
                        fill="#fff"
                        d="M14.536,14.226a.694.694,0,0,0-.694.694.722.722,0,1,1-.722-.722.694.694,0,1,0,0-1.388,2.11,2.11,0,1,0,2.11,2.11A.694.694,0,0,0,14.536,14.226Z"
                        transform="translate(4.272 4.97)"
                      ></path>
                      <path
                        fill="#fff"
                        d="M15.175,8.508H6.084a.694.694,0,1,1,0-1.388h9.091a.694.694,0,1,1,0,1.388Z"
                        transform="translate(2.091 2.763)"
                      ></path>
                    </g>
                  </svg>
                </Box>
              </IconButton>
              <Box
                sx={{
                  marginTop: "10px",
                }}
              >
                <Select
                  size="small"
                  defaultValue="EN"
                  value={age}
                  onChange={handleChange}
                  displayEmpty
                  sx={{
                    color: "#c5022e",
                    borderRadius: "10px",
                    background: "#fff",
                    outline: "none",
                    margin: "0px",
                    maxWidth: "70px",
                    height: "40px",
                  }}
                >
                  <MenuItem
                    selected
                    component={Link}
                    value=""
                    to="/en"
                    onClick={() => handleClick("/en")}
                  >
                    EN
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    value="am"
                    to="/am"
                    onClick={() => handleClick("/am")}
                  >
                    AM
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    value="ru"
                    to="/ru"
                    onClick={() => handleClick("/ru")}
                  >
                    RU
                  </MenuItem>
                </Select>
              </Box>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {openCart && (
          <List
            overflow="hidden"
            overflowY="hidden"
            anchorElCart={anchorElCart}
            openCart={openCart}
            handleCloseCart={handleCloseCart}
            sx={{ overflow: "hidden", overflowY: "hidden" }}
          />
        )}
      </Box>
    </>
  );
};
export default NavBar;
