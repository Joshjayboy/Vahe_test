import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function ChangePasswordForm({
  onSubmit,
  password,
  setPassword,
  confirmPassword,
  setConfirmPassword,
}) {
  const [validationError, setValidationError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword((show) => !show);
  const toggleShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const validatePassword = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    if (password !== confirmPasswordValue) {
      setValidationError("Password and Confirm password must be the same");
    } else {
      setValidationError("");
    }
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      onSubmit({ password });
    }
  };
  const isPasswordMatch = () => password === confirmPassword;
  const isFormValid = () => {
    return password !== "" && confirmPassword !== "" && isPasswordMatch();
  };
  return (
    <Box sx={{ minHeight: "600px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingTop: "120px",
          flexDirection: "column",
        }}
      >
        <Box sx={{ width: "60%" }}>
          <Box sx={{ textAlign: "center", marginBottom: "56px" }}>
            <Box
              component="span"
              sx={{
                color: "rgb(0, 0, 0)",
                fontWeight: "700",
                paddingBottom: "24px",
                fontSize: "24px",
              }}
            >
              Reset Password
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            marginTop: "16px",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "baseline",
              justifyContent: "center",
            }}
          >
            <form onSubmit={onSubmit}>
              <Box sx={{ flexWrap: "wrap", width: "100%" }}>
                <div>
                  <label>
                    <span>Password</span>
                  </label>
                  <FormControl sx={{ width: "100%" }}>
                    <OutlinedInput
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      type={showPassword ? "text" : "password"}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={toggleShowPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </div>
                <Box mt={2} mb={4} sx={{ flexWrap: "wrap", width: "100%" }}>
                  <div>
                    <label>
                      <span>Confirm Password</span>
                    </label>
                    <FormControl sx={{ width: "100%" }}>
                      <OutlinedInput
                        placeholder="Confirm your password"
                        required
                        value={confirmPassword}
                        onChange={validatePassword}
                        type={showConfirmPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={toggleShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </div>
                </Box>
                <Box
                  sx={{
                    color: "#ef5350",
                  }}
                >
                  {validationError}
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    marginTop: "56px",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ width: "100%" }}>
                    <Button
                      width="100%"
                      type="submit"
                      variant="contained"
                      disabled={!isFormValid()}
                      sx={{
                        padding: "10px 18px",
                        fontWeight: "bold",
                        lineHeight: "22px",
                        width: "100%",
                        borderRadius: "10px",
                        background:
                          "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                      }}
                    >
                      Change Password
                    </Button>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
export default ChangePasswordForm;