import React, { useState } from "react";
import { Alert, Box, Button, Typography } from "@mui/material";
import { BACKEND_BASE_URL } from "../Constants/AppConstants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { validateEmail } from "./Util/GlobalValidation";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import i18next from "i18next";
import Footer from "../Components/Footer";
function SignUp() {
  const { t } = useTranslation();
  const { lang } = useParams();
  React.useEffect(() => {
    i18next.changeLanguage(lang);
  }, [lang]);
  // eslint-disable-next-line no-unused-vars
  const [isError, setIsError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPasswordd, setShowPasswordd] = React.useState(false);
  const handleClickShowPasswordd = () => setShowPasswordd((show) => !show);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isPasswordMatch()) {
      alert("Password and Confirm Password must match!");
    } else {
      console.log("Form submitted successfully!");
      try {
        const payload = {
          email,
          phoneNumber,
          password,
        };
        const response = await axios.post(
          `${BACKEND_BASE_URL}/auth/register`,
          payload
        );
        console.log("User registered successfully");
        const accessToken = response.data.accessToken;
        sessionStorage.setItem("accessToken", accessToken);
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify(response.data.customerDto)
        );
        navigate("/en");
      } catch (error) {
        console.log("Registration failed");
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const checkValidation = (e) => {
    const confPass = e.target.value;
    setConfirmPassword(confPass);
    if (password !== confPass) {
      setIsError("Password and confirm password should be same");
    } else {
      setIsError("");
    }
  };
  const isPasswordMatch = () => password === confirmPassword;
  const isFormValid = () => {
    return password !== "" && confirmPassword !== "" && isPasswordMatch();
  };
  return (
    <>
      <div>
        <div>
          <Box container sx={{ minHeight: "600px" }}>
            <Box sx={{ display: "flex", backgroundColor: "rgb(252 252 253)" }}>
              <Box sx={{ width: "50%" }} className="disimage">
                <picture>
                  <img
                    src="https://menu.am/images/sign-in-up.png"
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
                    {t("readyAccount")}
                  </Box>
                  <Button
                    variant="outlined"
                    href="/login"
                    disableElevation
                    sx={{
                      padding: "1px 1px",
                      fontWeight: "bold",
                      lineHeight: "22px",
                      textTransform: "inherit",
                    }}
                    className="button1"
                  >
                    <Button
                      label
                      component="span"
                      sx={{
                        width: "100%",
                        display: "inherit",

                        alignItems: "inherit",
                        justifyContent: "center",
                      }}
                    >
                      {t("signIn")}
                    </Button>
                  </Button>
                </Box>
                <Typography>&nbsp;</Typography>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <Box sx={{ marginTop: "16px", marginBottom: "16px" }}>
                    <Link to="/">
                      {/* <picture>
                        <img src="https://menu.am/images/logo.png" alt="Logo" />
                      </picture> */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="150.204"
                        height="32.728"
                      >
                        <text
                          y="30"
                          font-family="Arial"
                          font-size="40"
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
                  {t("create")}
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
                  {errorMessage && (
                    <Alert severity="error">{errorMessage}</Alert>
                  )}
                  <Box mt={2} mb={2} sx={{ flexWrap: "wrap", width: "100%" }}>
                    <div>
                      <div className="form1_2">
                        <label>
                          <span> {t("phone")}</span>
                        </label>
                      </div>
                      <FormControl
                        sx={{
                          width: "100%",
                          border: "1px solid #cccccc",
                          borderRadius: "10px",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <PhoneInput
                          placeholder="55 22 33 44"
                          required
                          style={{
                            border: "1px solid #cccccc",
                            borderRadius: "10px",
                            backgroundColor: " #ffffff",
                          }}
                          className="form1_4"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e)}
                        />
                      </FormControl>
                    </div>
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
                        sx={{
                          fontSize: "14px",
                          letterSpacing: "1px",
                          border: "1px solid #cccccc",
                          borderRadius: "10px",
                          backgroundColor: "#ffffff",
                        }}
                        className="form1_4"
                        onChange={(e) => {
                          setEmail(e.target.value);
                          validateEmail(email);
                        }}
                        id="outlined-adornment-password"
                        type="email"
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ marginBottom: "16px" }}>
                    <Box sx={{ display: "flex", alignItems: "baseline" }}>
                      <InputLabel
                        root
                        animated
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
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Box>
                  <Box sx={{ marginBottom: "16px" }}>
                    <Box sx={{ display: "flex", alignItems: "baseline" }}>
                      <InputLabel
                        root
                        animated
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
                          {t("confirmPassword")}
                        </Typography>
                      </InputLabel>
                    </Box>
                    <FormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <OutlinedInput
                        placeholder={t("conPasswordPlace")}
                        required
                        name="password"
                        className="form1_4"
                        value={confirmPassword}
                        onChange={(e) => checkValidation(e)}
                        sx={{
                          borderRadius: "10px",
                          border: "1px solid #cccccc",
                          outline: "none",
                          backgroundColor: "#ffffff",
                        }}
                        type={showPasswordd ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPasswordd}
                              edge="end"
                            >
                              {showPasswordd ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
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
                      root
                      contained
                      containedPrimary
                      disableElevation
                      fullWidth
                      type="submit"
                      onClick={handleSubmit}
                      disabled={!isFormValid()}
                      sx={{
                        background:
                          "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                        padding: "10px 18px",
                        lineHeight: "22px",
                        textTransform: "inherit",
                        fontWeight: "bold",
                        color: "#fff",
                        borderRadius: "10px",
                        marginTop: "20px",
                      }}
                    >
                      {t("SignUp")}
                    </Button>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      marginTop: "32px",
                      marginBottom: "32px",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      sx={{
                        width: "35%",
                        margin: "auto",
                        borderBottom: "1px solid rgb(182 182 182)",
                      }}
                    ></Box>
                    <Box
                      sx={{
                        color: "rgb(182 182 182)",
                        marginLeft: "16px",
                        marginRight: "16px",
                      }}
                    >
                      {t("continue")}
                    </Box>
                    <Box
                      sx={{
                        width: "35%",
                        margin: "auto",
                        borderBottom: "1px solid rgb(182 182 182)",
                      }}
                    ></Box>
                  </Box>
                  <Box>
                    <span style={{ transition: "opacity 0.5s ease 0s" }}>
                      <button
                        type="button"
                        style={{
                          width: "100%",
                          border: "transparent",
                          padding: 0,
                          background: "transparent",
                        }}
                      >
                        <Button
                          contained
                          colorInherit
                          disableElevation
                          fullWidth
                          sx={{
                            color: "#FFFFFF",
                            width: "100%",
                            border: "1px solid #3B5999",
                            fontWeight: "bold",
                            paddingTop: "2px",
                            borderRadius: "20px",
                            paddingBottom: "2px",
                            backgroundColor: "#3B5999",
                          }}
                        >
                          <Button component="span" label>
                            <picture>
                              <img
                                alt="img"
                                src="https://menu.am/images/icons/facebook-icon.png"
                              />
                            </picture>
                            <Box
                              sx={{
                                marginLeft: "8px",
                                color: "#FFFFFF",
                                fontWeight: "bold",
                                lineHeight: "22px",
                                textTransform: "lowercase",
                              }}
                            >
                              Facebook
                            </Box>
                          </Button>
                        </Button>
                      </button>
                    </span>
                  </Box>
                  <Box sx={{ marginTop: "24px" }}>
                    <Button
                      fullWidth
                      disableElevation
                      colorInherit
                      type="button"
                      sx={{
                        color: "#000000",
                        border: "1px solid #CFCFD0",
                        borderRadius: "20px",
                        backgroundColor: "#FFFFFF",
                      }}
                    >
                      <Button component="span" label>
                        <picture>
                          <img
                            alt="img"
                            src="	https://menu.am/images/icons/google-icon.png"
                          />
                        </picture>
                        <Box
                          sx={{
                            marginLeft: "8px",
                            textTransform: "inherit",
                            color: "#000000",
                            fontWeight: "bold",
                            lineHeight: "22px",
                          }}
                        >
                          Google
                        </Box>
                      </Button>
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </div>
      </div>
      <Footer />
    </>
  );
}
export default SignUp;
