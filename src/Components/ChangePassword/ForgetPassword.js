import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BACKEND_BASE_URL } from '../../Constants/AppConstants';
import { Alert, Container } from '@mui/material';
import VerifyOTPForm from './VerifyOtpForm';
import ChangePasswordForm from './ChangePasswordForm';
import SendOTPForm from './SendOtpForm';
const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [verificationType, setVerificationType] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [passwordResetToken, setPasswordResetToken] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCorrect, setOtpCorrect] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const sendOtp = async (e) => {
    e.preventDefault();
    const payload = { email, verificationType };
    try {
      await axios.post(
        `${BACKEND_BASE_URL}/auth/send-change-password-otp`,
        payload,
      );
      setOtpSent(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  const verifyOtp = async (e) => {
    e.preventDefault();
    const payload = { email, verificationType, otpCode };
    try {
      const { data } = await axios.post(
        `${BACKEND_BASE_URL}/auth/verify-change-password`,
        payload,
      );
      setPasswordResetToken(data.details.passwordResetToken);
      setOtpCorrect(true);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  const changePassword = async (e) => {
    e.preventDefault();
    const payload = { password, confirmPassword, passwordResetToken, email };
    try {
      await axios.put(`${BACKEND_BASE_URL}/auth/change-password`, payload);
      navigate('/login');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };
  return (
    <>
      <Container>
        {errorMessage && <Alert severity='error'>{errorMessage}</Alert>}
        {!otpCorrect && !otpSent && (
          <SendOTPForm
            onSubmit={sendOtp}
            email={email}
            setEmail={setEmail}
            verificationType={verificationType}
            setVerificationType={setVerificationType}
          />
        )}
        {!otpCorrect && otpSent && (
          <VerifyOTPForm
            onSubmit={verifyOtp}
            otpCode={otpCode}
            setOtpCode={setOtpCode}
            email={email}
          />
        )}
        {otpCorrect && (
          <ChangePasswordForm
            onSubmit={changePassword}
            password={password}
            setPassword={setPassword}
            confirmPassword={confirmPassword}
            setConfirmPassword={setConfirmPassword}
          />
        )}
      </Container>
    </>
  );
};
export default ForgetPassword;