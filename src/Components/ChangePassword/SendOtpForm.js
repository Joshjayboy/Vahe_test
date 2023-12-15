import React from "react";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { validateEmail } from "../Util/GlobalValidation";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
const SendOTPForm = ({
  onSubmit,
  email,
  setEmail,
  verificationType,
  setVerificationType,
}) => (
  <form onSubmit={onSubmit}>
    <div className="reset">
      <div>
        <div>
          <div>
            <span>Reset Password</span>
          </div>
        </div>
      </div>
    </div>
    <Box mt={2} mb={2} sx={{ flexWrap: "wrap", width: "55%" }}>
      <div>
        <div className="form1_2">
          <label>
            <span>Email </span>
          </label>
        </div>
        <FormControl sx={{ width: "100%"}}> 
          <OutlinedInput
            outline="none"
            fullWidth
            placeholder="Enter your Email Address"
            required
            name="email"
            value={email}
            className="form1_4"
            onChange={(e) => {
              setEmail(e.target.value);
              validateEmail(email);
            }}
            sx={{
              borderRadius: "10px",
              border: "1px solid #cccccc",
              outline: "none",
              backgroundColor: "#ffffff",
            }}
            type="email"
          />
        </FormControl>
      </div>
    </Box>
    <div className="form1">
      <div className="form1_1">
        <div className="form1_2">
          <label>
            <span>Verification type</span>
          </label>
        </div>
        <div>
          <TextField
            select
            fullWidth
            value={verificationType}
            onChange={(e) => setVerificationType(e.target.value)}
            placeholder="Select Verification Type"
            required
          >
            <MenuItem value="SMS">SMS</MenuItem>
            <MenuItem value="EMAIL">Email</MenuItem>
          </TextField>
        </div>
      </div>
      <div className="sign1">
        <button className="sign2" type="submit">
          <span>Send verification code</span>
        </button>
      </div>
      <Box className="box2">
        <Typography className="box3">Don't have an account yet?</Typography>
        <Link to="/sign-up">
          <Button className="button1">
            <span>Create Account</span>
          </Button>
        </Link>
      </Box>
    </div>
  </form>
);
export default SendOTPForm;