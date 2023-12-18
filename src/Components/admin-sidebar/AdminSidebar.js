import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Link from "@mui/material/Link";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SidebarItem from "./SidebarItem";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import RepeatOutlinedIcon from "@mui/icons-material/RepeatOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { v4 as uuid } from "uuid";
import Home from "../sidebar-components/Home";
import Orders from "../sidebar-components/Orders";
import Subscriptions from "../sidebar-components/Subscriptions";
import Avatar from "@mui/material/Avatar";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Customers from "../sidebar-components/Customers";
import Products from "./../sidebar-components/Products";
import Discounts from "./../sidebar-components/Discounts";
import NavBar from "../NavBar";
import MenuItem from "@mui/material/MenuItem";
import MoreIcon from "@mui/icons-material/MoreVert";
import Select from "@mui/material/Select";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import i18next from "i18next";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import PaymentIcon from "@mui/icons-material/Payment";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { BACKEND_BASE_URL } from "../../Constants/AppConstants";
import axios from "axios";
import Couriers from "../table/courier/Couriers";

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const location = useLocation();
  const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
  const [sidebar, setSidebar] = React.useState([
    {
      name: "Orders",
      icon: (
        <img
          src="https://res.cloudinary.com/pro-solve/image/upload/v1697874154/time_vahe_fsqnvk.png"
          alt="Orders Icon"
          style={{ width: "20px", height: "20px" }}
        />
      ),

      id: uuid(),
      open: null,
      isComponentOpened: false,
      component: <Orders />,
    },

    {
      name: "Customers",
      icon: <PeopleAltOutlinedIcon />,
      id: uuid(),
      open: null,
      isComponentOpened: false,
      component: <Customers />,
    },
    {
      name: "Products",
      icon: <ShoppingBagOutlinedIcon />,
      open: null,
      id: uuid(),
      isComponentOpened: false,
      component: <Products />,
    },
    {
      name: "Couriers",
      icon: (
        <img
          src="  https://res.cloudinary.com/pro-solve/image/upload/v1697874744/fire_an3a34.png"
          alt="Orders Icon"
          style={{ width: "20px", height: "20px" }}
        />
      ),

      open: null,
      id: uuid(),
      isComponentOpened: false,
      component: <Couriers />,
    },
  ]);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(() => {
    setSidebar(() => {
      return sidebar.map((sidebarItem) => {
        if (
          location.pathname.toLowerCase() ===
          `/admin/${sidebarItem.name.toLowerCase()}`
        ) {
          return (sidebarItem.isComponentOpened = true), sidebarItem;
        } else {
          return (sidebarItem.isComponentOpened = false), sidebarItem;
        }
      });
    });
  }, [location.pathname]);

  const updateSidebar = (item) => {
    return item.open === null
      ? null
      : setSidebar(
          sidebar.map((oldItem) => {
            if (item.id === oldItem.idl) {
              return !item.open, item;
            } else {
              return oldItem;
            }
          })
        );
  };
  let callComponent = (item) => {
    navigate(`/admin/${item.name.toLowerCase()}`);
    setSidebar(
      sidebar.map((oldItem) => {
        if (item.id === oldItem.id) {
          return (item.isComponentOpened = true), item;
        } else {
          return (oldItem.isComponentOpened = false), oldItem;
        }
      })
    );
  };
  // menu for navbar

  // log out
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

  const { t } = useTranslation();
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
            href="/login"
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
  // end of menu for navbar
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          <AppBar
            position="absolute"
            open={open}
            sx={{
              boxShadow: "none",
              backgroundColor: "#ffffff",
              boxShadow: "none",
            }}
          >
            <Toolbar
              sx={{
                pr: "24px",
              }}
            >
              <Box sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  color: "#101828",
                  pr: 1,
                }}
              >
                Hello,
              </Box>
              <Box
                sx={{
                  color: "#101828",
                }}
              >
                {JSON.parse(sessionStorage.getItem("loggedInUser")).firstname ||
                  " "}
              </Box>
              <Box
                sx={{
                  pl: 5,
                  mr: 5,
                }}
              >
                <img
                  alt="icon"
                  src="https://res.cloudinary.com/pro-solve/image/upload/v1698219623/Bell_cuhcfi.png"
                />
              </Box>

              <Avatar
                sx={{
                  mr: 8,
                }}
                alt="Remy Sharp"
                src="https://res.cloudinary.com/pro-solve/image/upload/v1663362286/samples/people/smiling-man.jpg"
              />
            </Toolbar>
            <Divider />
          </AppBar>
          <Drawer variant="permanent" open={open}>
            <Toolbar
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                px: [1],
              }}
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
            </Toolbar>
            <Divider />
            <List
              component="nav"
              aria-labelledby="nested-list"
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              {sidebar.map((item) => {
                return (
                  <SidebarItem
                    key={uuid()}
                    item={item}
                    updateSidebar={updateSidebar}
                    callComponent={callComponent}
                  />
                );
              })}
            </List>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                mt: "auto",
                mb: "20px",
                overflow: "hidden",
              }}
            >
              <Divider
                width="80%"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: "26px",
                  ml: "20px",
                }}
              />
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 15,
                  mt: 5,
                  ml: "15px",
                }}
              >
                <Avatar
                  alt={`${loggedInUser.email.toUpperCase()}`}
                  src="/static/images/avatar/1.jpg"
                  sx={{
                    ml: "13px",
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",
                    flex: 1,
                  }}
                >
                  <Box
                    sx={{
                      fontSize: "14px",
                      fontWeight: "600",
                    }}
                  >
                    <span>
                      {JSON.parse(sessionStorage.getItem("loggedInUser"))
                        .firstname || " "}
                    </span>
                    <span>
                      {JSON.parse(sessionStorage.getItem("loggedInUser"))
                        .lastname || " "}
                    </span>
                  </Box>
                  <Box
                    sx={{
                      fontSize: "12px",
                    }}
                  >
                    {JSON.parse(sessionStorage.getItem("loggedInUser")).email ||
                      "no email"}
                  </Box>
                </Box>
                <Box>
                  <img
                    style={{ cursor: "pointer", marginRight: "5px" }}
                    alt="icon"
                    src="https://res.cloudinary.com/pro-solve/image/upload/v1697841748/arrowVahe_b7b5fp.png"
                  />
                </Box>
              </Box>
            </Box>
          </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            {/* <Toolbar /> */}
            {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 1 }}>
              <div
                style={{ width: "100vw", maxHeight: "100vh", overflow: "auto" }}
              > */}
            <Box
              sx={{
                mt: 15,
                ml: 3,
                mr: 3,
              }}
            >
              {/* <Grid container spacing={1}> */}
              {sidebar.map((item) => {
                return (
                  <React.Fragment key={uuid()}>
                    <Box
                      sx={{
                        backgroundColor: "#ffffff",
                        borderRadius: "12px",
                      }}
                    >
                      {!!item.isComponentOpened && item.component}
                    </Box>
                  </React.Fragment>
                );
              })}
            </Box>
          </Box>
          {renderMobileMenu}
          {renderMenu}
          {openCart && (
            <List
              anchorElCart={anchorElCart}
              openCart={openCart}
              handleCloseCart={handleCloseCart}
            />
          )}
        </Box>
      </ThemeProvider>
    </>
  );
}
