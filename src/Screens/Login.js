import React from "react";
import axios from "axios";
import { Alert, Box, Button, Typography } from "@mui/material";
import { Link, Navigate } from "react-router-dom";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import { validateEmail } from "../Components/Util/GlobalValidation";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import Footer from "../Components/Footer";
const LoginForm = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  React.useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [loggedInUser, setLoggedInUser] = React.useState({});

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
      sessionStorage.setItem(
        "loggedInUser",
        JSON.stringify(response.data.customerDto)
      );
      setLoggedInUser(response.data.customerDto);
      setIsLoggedIn(true);
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  if (isLoggedIn) {
    return <Navigate to={loggedInUser.role === "ADMIN" ? "/admin" : `/en`} />;
  }
  return (
    <>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Box sx={{ marginTop: "16px", marginBottom: "16px" }}>
          <Link to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="150.204"
              height="32.728"
            >
              <text
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
          </Link>
        </Box>
      </Box>
      <Box
        component="span"
        sx={{
          color: "black",
          fontWeight: "700",
          paddingBottom: "24px",
          "@media (min-width: 0px)": {
            fontSize: "24px",
          },
          "@media (min-width: 768px)": {
            fontSize: "24px",
          },
          "@media (min-width: 992px)": {
            fontSize: "24px",
          },
          "@media (min-width: 1200px)": {
            fontSize: "34px",
          },
        }}
      >
        {t("sign")}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          paddingTop: "24px",
          "@media (min-width: 0px)": {
            width: "80%",
          },
          "@media (min-width: 768px)": {
            width: "80%",
          },
          "@media (min-width: 992px)": {
            width: "80%",
          },
          "@media (min-width: 1200px)": {
            width: "55%",
          },
        }}
      >
        {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
        <Box sx={{ marginBottom: "16px" }}>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <InputLabel
              sx={{
                overflow: "hidden",
                marginRight: "8px",
                marginBottom: "8px",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                component="span"
                noWrap
                sx={{
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  fontWeight: "400",
                  lineHeight: "1.66",
                  color: "#363636",
                }}
              >
                {t("email")}
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
              placeholder={t("email_place")}
              required
              name="email"
              value={username}
              sx={{
                fontSize: "14px",
                letterSpacing: "1px",
                border: "1px solid #cccccc",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
              }}
              className="form1_4"
              onChange={(e) => setUsername(e.target.value)}
              id="outlined-adornment-password"
              type="email"
            />
          </FormControl>
        </Box>
        <Box sx={{ marginBottom: "16px" }}>
          <Box sx={{ display: "flex", alignItems: "baseline" }}>
            <InputLabel
              sx={{
                overflow: "hidden",
                fontSize: "14px",
                marginRight: "8px",
                marginBottom: "8px",
                textOverflow: "ellipsis",
              }}
            >
              <Typography
                component="span"
                noWrap
                sx={{
                  fontSize: "0.75rem",
                  whiteSpace: "nowrap",
                  fontWeight: "400",
                  lineHeight: "1.66",
                  color: "#363636",
                }}
              >
                {t("password")}
              </Typography>
            </InputLabel>
          </Box>
          <FormControl
            sx={{
              width: "100%",
            }}
          >
            <OutlinedInput
              placeholder={t("password_place")}
              required
              name="password"
              className="form1_4"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{
                borderRadius: "10px",
                border: "1px solid #cccccc",
                outline: "none",
                backgroundColor: "#ffffff",
              }}
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
        </Box>
        <Box className="for1">
          <Link to="/forget-password">
            <Button>
              <span> {t("ForgetPassword")}</span>
            </Button>
          </Link>
        </Box>
        <Box
          sx={{
            "@media (min-width: 768px)": {
              marginTop: "32px",
            },
            "@media (min-width: 0px)": {
              marginTop: "16px",
            },
          }}
        >
          <Button
            type="submit"
            onClick={handleSubmit}
            sx={{
              width: "100%",
              background:
                "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
              padding: "10px 18px",
              lineHeight: "22px",
              textTransform: "inherit",
              fontWeight: "bold",
              color: "#fff",
              borderRadius: "10px",
            }}
          >
            {t("SignIn")}
          </Button>
        </Box>
      </Box>
    </>
  );
};
const Login = () => {
  const { t } = useTranslation();
  const { lang } = useParams();
  React.useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);
  return (
    <>
      <div>
        <div>
          <Box
            sx={{
              minHeight: "600px",
            }}
          >
            <Box sx={{ display: "flex", backgroundColor: "rgb(252 252 253)" }}>
              <Box sx={{ width: "50%" }} className="disimage">
                <picture>
                  <img
                    width="80%"
                    src="	https://menu.am/images/sign-in-up.png"
                    alt="Login illustration"
                  />
                </picture>
              </Box>
              <Box
                sx={{
                  "@media (min-width: 0px)": {
                    width: "80%",
                    margin: "96px auto auto",
                  },
                  "@media (min-width: 768px)": {
                    width: "70%",
                    margin: "96px auto auto",
                  },
                  "@media (min-width: 992px)": {
                    width: "70%",
                    marginTop: "0px",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    paddingTop: "32px",
                    paddingRight: "80px",
                    justifyContent: "flex-end",
                  }}
                >
                  <Box
                    sx={{
                      color: "black",
                      display: "flex",
                      fontSize: "14px",
                      alignItems: "center",
                      fontWeight: "500",
                      marginRight: "16px",
                    }}
                  >
                    {t("DontHaveAccount")}
                  </Box>
                  <Button
                    variant="outlined"
                    href="/sign-up"
                    sx={{
                      padding: "1px 1px",
                      fontWeight: "bold",
                      lineHeight: "22px",
                      textTransform: "inherit",
                    }}
                    className="button1"
                  >
                    <Button
                      component="span"
                      sx={{
                        width: "100%",
                        display: "inherit",

                        alignItems: "inherit",
                        justifyContent: "center",
                      }}
                    >
                      {t("create")}
                    </Button>
                  </Button>
                </Box>
                <Typography>&nbsp;</Typography>
                <LoginForm />
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Login;
