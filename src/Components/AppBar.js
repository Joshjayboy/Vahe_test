import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import axios from "axios";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import { validateEmail } from "../Components/Util/GlobalValidation";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Select from "@mui/material/Select";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaymentIcon from "@mui/icons-material/Payment";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
const AppBarr = () => {
  const { t } = useTranslation();
  function handleClick(lang) {
    i18next.changeLanguage(lang);
  }
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateEmail(username)) {
      setErrorMsg("Please enter a valid email");
      return;
    }
    try {
      const response = await axios.post(
        `${BACKEND_BASE_URL}/auth/authenticate`,
        {
          email: username,
          password: password,
        }
      );
      const accessToken = response.data.accessToken;
      sessionStorage.setItem("accessToken", accessToken);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  const navigate = useNavigate();
  const handleSignupClick = () => {
    navigate("/sign-up");
  };
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  if (isLoggedIn) {
    return <Navigate to="/en" />;
  }
  const handleLoginClick = () => {
    navigate("/login");
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  if (isLoggedIn) {
    return <Navigate to="/en" />;
  }
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
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
      <Box sx={{ margin: "10px" }}>
        <AccountCircleIcon /> Jakintemi@gmail.com
        <Typography
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          08160641688
        </Typography>
        <MenuItem onClick={handleMenuClose}>
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <FavoriteBorderIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("favourite")}
          </Box>
        </MenuItem>
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
        <MenuItem onClick={handleMenuClose}>
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <BookOnlineIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("bonus")}
          </Box>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
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
            navigate("/address");
          }}
        >
          <Box sx={{ marginTop: "10px", marginBottom: "10px" }}>
            <LocationOnIcon
              sx={{
                marginRight: "10px",
              }}
            />
            {t("Address")}
          </Box>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
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
            href="/login"
            sx={{
              backgroundColor: "#c5022e",
              color: "#F5F5F5",
            }}
          >       
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
      <Box sx={{ flexGrow: 1 }}>
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
              component="a"
              href="/en"
              sx={{ display: { xs: "none", sm: "block" } }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="150.204"
                height="32.728"
                viewBox="0 0 150.204 32.728"
              >
                <g transform="translate(-0.048 0.028)">
                  <g transform="translate(0.048 -0.028)">
                    <path
                      d="M4404.087,95.425l-1.867,17.29a13.231,13.231,0,0,0,.452,5.687,8.331,8.331,0,0,0,2.577,3.779,11.681,11.681,0,0,0,4.422,2.193,22.663,22.663,0,0,0,5.926.723,28.742,28.742,0,0,0,6.465-.7,18.511,18.511,0,0,0,5.236-2.011l.008,0a5.308,5.308,0,0,0,2.868-4.289l2.018-18.681a6.032,6.032,0,0,0-.115-2.32,2.656,2.656,0,0,0-.839-1.307,3.308,3.308,0,0,0-1.541-.649,13.642,13.642,0,0,0-2.336-.178,19.786,19.786,0,0,0-2.7.181,16.566,16.566,0,0,0-1.648.284l-2.317,21.456-.211.1a9,9,0,0,1-1.506.517,9.622,9.622,0,0,1-2.438.26,5.3,5.3,0,0,1-3.739-1.192,4.7,4.7,0,0,1-.966-3.94l1.427-13.212a6.032,6.032,0,0,0-.113-2.32,2.658,2.658,0,0,0-.84-1.306,3.318,3.318,0,0,0-1.542-.65,13.637,13.637,0,0,0-2.335-.178,19.8,19.8,0,0,0-2.7.181,16.591,16.591,0,0,0-1.648.284Z"
                      transform="translate(-4282.045 -92.369)"
                      fill="#ea1f4d"
                      fillRule="evenodd"
                    ></path>
                    <path
                      d="M3187.66,113.659l2.047-18.95c.333-3.086-.309-5.968-2.7-8.093-2.671-2.375-6.645-2.936-10.087-2.936a25.853,25.853,0,0,0-7.022.906,19.583,19.583,0,0,0-5.4,2.345,8.448,8.448,0,0,0-2.042,1.813,4.819,4.819,0,0,0-.913,2.491l-1.991,18.435a6.02,6.02,0,0,0,.114,2.319,2.657,2.657,0,0,0,.84,1.307,3.3,3.3,0,0,0,1.541.649,13.639,13.639,0,0,0,2.336.179,19.837,19.837,0,0,0,2.7-.181,16.533,16.533,0,0,0,1.648-.284l2.293-21.233.163-.108a7.322,7.322,0,0,1,2.288-.979,10.563,10.563,0,0,1,2.562-.319,4.51,4.51,0,0,1,3.1,1,3.577,3.577,0,0,1,.907,3.15l-1.567,14.5a6.029,6.029,0,0,0,.114,2.319,2.66,2.66,0,0,0,.84,1.307,3.3,3.3,0,0,0,1.541.649,13.643,13.643,0,0,0,2.336.179,19.828,19.828,0,0,0,2.7-.181,16.522,16.522,0,0,0,1.647-.284Z"
                      transform="translate(-3073.326 -81.397)"
                      fill="#ea1f4d"
                      fillRule="evenodd"
                    ></path>
                    <path
                      d="M9.281,113.688,11.6,92.182l.2-.1c.472-.247.965-.463,1.459-.663a5.6,5.6,0,0,1,2.1-.368,4.557,4.557,0,0,1,2.9.919,3.241,3.241,0,0,1,1,3.045L17.68,109.7a6.032,6.032,0,0,0,.113,2.32,2.659,2.659,0,0,0,.84,1.306,3.3,3.3,0,0,0,1.541.65,13.639,13.639,0,0,0,2.336.178,19.381,19.381,0,0,0,2.637-.181c.559-.077,1.152-.161,1.71-.29L29.079,93.11a1.467,1.467,0,0,0-.011-.358l-.033-.235.185-.148a6.5,6.5,0,0,1,1.674-.893,5.676,5.676,0,0,1,2.039-.428,4.507,4.507,0,0,1,3.01.931,3.373,3.373,0,0,1,.9,3.033L35.255,109.7a6.027,6.027,0,0,0,.113,2.32,2.658,2.658,0,0,0,.84,1.306,3.308,3.308,0,0,0,1.541.65,13.639,13.639,0,0,0,2.336.178,19.833,19.833,0,0,0,2.7-.181,16.465,16.465,0,0,0,1.648-.284l2.06-19.072a11.414,11.414,0,0,0-.447-5.125,7.646,7.646,0,0,0-2.292-3.326,9.9,9.9,0,0,0-3.634-1.857,16.162,16.162,0,0,0-4.4-.6,17.552,17.552,0,0,0-5.515.777,20.237,20.237,0,0,0-4.279,1.986l-.261.162-.232-.2A10.307,10.307,0,0,0,21.607,84.4a16.462,16.462,0,0,0-4.751-.689,23.314,23.314,0,0,0-6.467.905A19.693,19.693,0,0,0,5.051,86.96a9.094,9.094,0,0,0-2.042,1.76,4.522,4.522,0,0,0-.9,2.421l-2,18.558a6.022,6.022,0,0,0,.114,2.32,2.659,2.659,0,0,0,.84,1.306,3.3,3.3,0,0,0,1.541.65,13.638,13.638,0,0,0,2.336.178,19.822,19.822,0,0,0,2.7-.181,16.478,16.478,0,0,0,1.648-.284Z"
                      transform="translate(-0.048 -81.426)"
                      fill="#ea1f4d"
                      fillRule="evenodd"
                    ></path>
                    <g transform="translate(50.627)">
                      <path
                        d="M2568.209,962.054a3.831,3.831,0,0,1,3.38-3.587,2.812,2.812,0,0,1,3.208,2.916,3.83,3.83,0,0,1-3.38,3.586A2.812,2.812,0,0,1,2568.209,962.054Z"
                        transform="translate(-2548.79 -932.308)"
                        fill="#ea1f4d"
                      ></path>
                      <path
                        d="M2100.17,1024.028a2.854,2.854,0,0,1,2.517-2.672,2.1,2.1,0,0,1,2.39,2.172,2.853,2.853,0,0,1-2.518,2.671,2.1,2.1,0,0,1-2.39-2.172Z"
                        transform="translate(-2093.516 -993.486)"
                        fill="#ea1f4d"
                      ></path>
                      <path
                        d="M1887.018,19.7c-.471.311-.945.617-1.428.908a22.133,22.133,0,0,1-3.934,1.872,24.786,24.786,0,0,1-2.622.8,13.884,13.884,0,0,1-8.455-.323c-4.552-1.935-5.845-8.19-3.592-12.174a8.412,8.412,0,0,1,4.243-3.525c2.668-1.134,6.437-.947,8.427,1.392a4.676,4.676,0,0,1,.935,1.735l.071.243-8.562,1.911a4.03,4.03,0,0,0-1.435.6,1.8,1.8,0,0,0-.64.835,2.225,2.225,0,0,0-.061,1.126,9.249,9.249,0,0,0,.416,1.527,13.152,13.152,0,0,0,.72,1.646,10.688,10.688,0,0,0,.564.99l10.452-2.531v0l2.8-.678a5.009,5.009,0,0,0,3.155-2.027,6.13,6.13,0,0,0,.877-4.277,10.055,10.055,0,0,0-2.134-4.858c-3.153-3.989-8.244-5.275-13.133-4.827a24.459,24.459,0,0,0-6.344,1.452,18.5,18.5,0,0,0-5.529,3.209,16.126,16.126,0,0,0-3.948,5.054,14.252,14.252,0,0,0-.63,11.7,14.843,14.843,0,0,0,5.423,6.847q.122-.157.258-.3a4,4,0,0,1,2.484-1.25,3.587,3.587,0,0,1,.455-.017,3.162,3.162,0,0,1,2.068.811,3.076,3.076,0,0,1,.98,1.981,3.387,3.387,0,0,1,.016.435,3.633,3.633,0,0,1-.134.882q.576.108,1.163.176a29.24,29.24,0,0,0,4.762-.005,4.077,4.077,0,0,1-.138-.717,4.316,4.316,0,0,1-.02-.545,4.877,4.877,0,0,1,1.357-3.188A5.023,5.023,0,0,1,1879.02,25a4.454,4.454,0,0,1,.57-.021,3.938,3.938,0,0,1,2.575,1.01,3.827,3.827,0,0,1,1.219,2.464,4.305,4.305,0,0,1,.02.544c0,.061,0,.123-.009.184q.194-.077.381-.157a7.1,7.1,0,0,0,4.344-4.378,6.016,6.016,0,0,0-1.1-4.948Z"
                        transform="translate(-1856.261 0.028)"
                        fill="#ea1f4d"
                        fillRule="evenodd"
                      ></path>
                    </g>
                  </g>
                </g>
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
                  >
                    <Button
                      onClick={handleLoginClick}
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
                    </Button>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Button
                      variant="contained"
                      onClick={handleSignupClick}
                      sx={{
                        boxShadow: "none",
                        borderRadius: "10px",
                        color: "#fff",
                        background:
                          "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                      }}
                    >
                      Sign Up
                    </Button>
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
              >
                <Button
                  position="relative"
                  variant="contained"
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
                    width="24"
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
                </Button>
              </IconButton>
              <Box
                sx={{
                  marginTop: "10px",
                }}
              >
                <Select
                  size="small"
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
                    component={Link}
                    value="en"
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
      </Box>
    </>
  );
};
export default AppBarr;