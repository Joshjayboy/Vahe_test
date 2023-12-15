import React from 'react';
import { Alert, Button } from '@mui/material';
import axios from 'axios';
import { BACKEND_BASE_URL } from '../Constants/AppConstants';
import { useNavigate } from 'react-router-dom';
const Logout = () => {
  const [errorMsg, setErrorMsg] = React.useState('');
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.post(`${BACKEND_BASE_URL}/auth/logout`, {}, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
        },
      });
      if (response.status === 200) {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('loggedInUser')
        navigate('/login');
      }
    } catch (error) {
      setErrorMsg(error.response.data.message);
    }
  };
  return (
    <>
      {errorMsg && <Alert severity='error'>{errorMsg}</Alert>}
      <Button variant='contained' color='secondary' onClick={handleLogout}>
        Logout
      </Button>
    </>
  );
};
export default Logout;