import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";
import { BACKEND_BASE_URL } from "../../Constants/AppConstants";
import { Alert, Container } from "@mui/material";
// import VerifyOTPForm from './VerifyOtpForm';
import ChangePasswordForm from "./ChangePasswordForm";
import SendOTPForm from "./SendOtpForm";
const VerifyOTPForm = ({ onSubmit, otpCode, setOtpCode, email }) => {
  const [timer, setTimer] = useState(60);
  const [timerActive, setTimerActive] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60);
  const [isResending, setIsResending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const startTimer = () => {
    setIsResending(true);
    const interval = setInterval(() => {
      setRemainingTime((prevTime) => prevTime - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(interval);
      setIsResending(false);
      setRemainingTime(60);
    }, 60000);
  };
  useEffect(() => {
    let interval;
    if (isResending) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);
    }
    if (remainingTime === 0) {
      clearInterval(interval);
      setIsResending(false);
    }
    return () => clearInterval(interval);
  }, [isResending, remainingTime]);
  const handleResendClick = () => {
    console.log("Verification code resent!");
    startTimer();
  };
  const handleSendCode = () => {
    console.log("Sending verification code...");
    setTimer(60);
    setTimerActive(true);
    setTimeout(() => {
      setTimerActive(false);
      console.log("Verification code sent!");
    }, 3000); 
  };
  // Function to start the timer
  // const startTimer = () => {
  //   setTimerActive(true);
  //   const intervalId = setInterval(() => {
  //     setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0));
  //   }, 1000);

  //   // Clear the interval when the component unmounts or when the timer reaches 0
  //   return () => clearInterval(intervalId);
  // };

  // Start the timer when the component mounts
  React.useEffect(() => {
    if (timerActive && timer > 0) {
      startTimer();
    }
  }, [timerActive, timer]);
  return (
    <>
      <Box container sx={{ minHeight: "600px", marginTop: "100px" }}>
        <Box
          sx={{
            display: "flex",
            marginBottom: "32px",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Box
              component="span"
              sx={{
                color: "black",
                fontWeight: "700",
                paddingBottom: "24px",
                fontSize: "34px",
              }}
            >
              Verify your phone number
            </Box>
            <Box>The message with verification code will be sent to number</Box>
            <Box
              sx={{
                fontSize: "20px",
                marginTop: "32px",
                textAlign: "center",
                fontWeight: "bold",
              }}
            >
              {email}
            </Box>
            <Box
              sx={{
                display: "flex",
                marginTop: "32px",
                justifyContent: "center",
              }}
            >
              <form onSubmit={onSubmit}>
                <TextField
                  label="OTP"
                  type="text"
                  variant="outlined"
                  fullWidth
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  required
                />
              </form>
            </Box>
            <Box
              sx={{
                cursor: "pointer",
                color: "rgb(3, 188, 102)",
                marginTop: "32px",
              }}
            >
              <Button
                type="button"
                // variant="contained" 
                // onClick={handleSendCode}
                onClick={handleResendClick}
                // disabled={timerActive}
                disabled={isResending}
                sx={{
                  color: "rgb(3, 188, 102)",
                }}
              >
                {/* {timerActive
                  ? `Resend in ${timer}s`
                  : "Resend Verification Code"} */}
                {isResending
                  ? `Verification Code Sent (${remainingTime}s)`
                  : "Resend Verification Code"}
              </Button>
              {/* Resend verification code */}
            </Box>
            <Box sx={{ width: "100%", marginTop: "32px" }}>
              <Button
                type="submit"
                variant="contained"
                onClick={onSubmit}
                sx={{
                  padding: "10px 18px",
                  width: "100%",
                  fontWeight: "bold",
                  lineHeight: "22px",
                  textTransform: "inherit",
                  boxShadow: "none",
                  borderRadius: "10px",
                  background:
                    "transparent linear-gradient(180deg, #c5022e 0%, #ea1f4d 100%) 0% 0% no-repeat",
                }}
              >
                <span
                  sx={{
                    width: "100%",
                    display: "inherit",
                    alignItems: "inherit",
                    justifyContent: "inherit",
                  }}
                >
                  Verify OTP
                </span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default VerifyOTPForm;