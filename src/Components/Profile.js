
import React, { useEffect, useState } from "react";
import { BACKEND_BASE_URL } from '../Constants/AppConstants';
import axios from 'axios';
import { Box, Button, Typography } from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import Grid from "@mui/material/Unstable_Grid2";
import Divider from "@mui/material/Divider";
import NavBar from "./NavBar";
const Profile = () => {
  const [user, setUser] = useState({});
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const handleChange = (event) => {
    if (event.target.name === "firstname") {
      setFirstname(event.target.value);
    } else if (event.target.name === "lastname") {
      setLastname(event.target.value);
    }
  };
  const updateUser = async () => {
    try {
      const updatedUserData = {
        ...user,
        firstname: firstname,
        lastname: lastname,
      };
      const response = await axios.put(
        `${BACKEND_BASE_URL}/customers/${updatedUserData.id}`,
        updatedUserData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        console.log("User data updated successfully");
        setUser(response.data);
      } else {
        console.error("Error updating user data. Response status:", response.status);
        console.error("Response data:", response.data);
      }
    } catch (error) {
      console.error("Error updating user data:", error.message);
    }
  };
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/customers/logged-in`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      setUser(response.data);
      setFirstname(response.data.firstname);
      setLastname(response.data.lastname);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <>
      <NavBar />
      <Box
        sx={{
          backgroundColor: "#fff",
          mt: 9,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            ml: 9,
          }}
        >
          <TableContainer >
            <Table sx={{ width: "90%", mt: 5 }} size="small">
              <TableHead>
                <Grid container justifyContent="space-between">
                  <Grid >
                    <Typography
                      sx={{
                        fontSize: "40px",
                        fontWeight: "900",
                        mb: 5,
                      }}
                    >
                      Profile
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography style={{ textAlign: "right" }}>
                      <Grid
                        container
                        spacing={7}
                        justifyContent="space-between"
                        sx={{ color: "rgb(235, 23, 0)" }}
                      >
                        <Grid item>
                          <Typography
                            sx={{
                              fontWeight: 900,
                            }}
                          >
                            Change Password
                          </Typography>
                        </Grid>
                      </Grid>
                    </Typography>
                  </Grid>
                </Grid>
              </TableHead>
              <Divider sx={{
                mb: 5
              }} />
              <TableBody>
                <Box>
                  <Box>
                    <Box sx={{ width: "100%" }}>
                      <Grid
                        container
                        rowSpacing={3}
                        columnSpacing={{ xs: 1, sm: 2, md: 8 }}
                      >
                        <Grid item xs={6}>
                          <Box sx={{ marginBottom: "16px" }}>
                            <Box
                              sx={{ display: "flex", alignItems: "baseline" }}
                            >
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
                                    fontSize: "16px",
                                    whiteSpace: "nowrap",
                                    fontWeight: "700",
                                    lineHeight: "1.66",
                                    color: "#363636",
                                  }}
                                >
                                  First Name
                                </Typography>
                              </InputLabel>
                            </Box>
                            <FormControl
                              sx={{
                                width: "100%",
                                mb: 8,
                              }}
                            >
                              <OutlinedInput
                                id="firstname"
                                placeholder="Enter your First name"
                                value={firstname}
                                name="firstname"
                                onChange={handleChange}
                                sx={{
                                  borderRadius: "10px",
                                  border: "1px solid #cccccc",
                                  outline: "none",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            </FormControl>
                            <Box
                              sx={{ display: "flex", alignItems: "baseline" }}
                            >
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
                                    fontSize: "16px",
                                    whiteSpace: "nowrap",
                                    fontWeight: "700",
                                    lineHeight: "1.66",
                                    color: "#363636",
                                  }}
                                >
                                  Email
                                </Typography>
                              </InputLabel>
                            </Box>
                            <FormControl
                              sx={{
                                width: "100%",
                                mb: 8,
                              }}
                            >
                              <OutlinedInput
                                defaultValue={JSON.parse(sessionStorage.getItem("loggedInUser")).email}
                                placeholder="Enter Email address"
                                required
                                name="password"
                                sx={{
                                  borderRadius: "10px",
                                  border: "1px solid #cccccc",
                                  outline: "none",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            </FormControl>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ marginBottom: "16px" }}>
                            <Box
                              sx={{ display: "flex", alignItems: "baseline" }}
                            >
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
                                    fontSize: "16px",
                                    whiteSpace: "nowrap",
                                    fontWeight: "700",
                                    lineHeight: "1.66",
                                    color: "#363636",
                                  }}
                                >
                                  Last Name
                                </Typography>
                              </InputLabel>
                            </Box>
                            <FormControl
                              sx={{
                                width: "100%",
                                mb: 8,
                              }}
                            >
                              <OutlinedInput
                                id="lastname"
                                placeholder="Enter your Last name"
                                name="lastname"
                                value={lastname}
                                onChange={handleChange}
                                sx={{
                                  borderRadius: "10px",
                                  border: "1px solid #cccccc",
                                  outline: "none",
                                  backgroundColor: "#ffffff",
                                }}
                              />
                            </FormControl>
                            <Box>
                              <Box sx={{ width: "100%" }}>
                                <Grid
                                  container
                                  rowSpacing={1}
                                  columnSpacing={{ xs: 1, sm: 2, md: 2 }}
                                >
                                  <Grid item xs={8}>
                                    <Box
                                      sx={{
                                        display: "flex",
                                        alignItems: "baseline",
                                      }}
                                    >
                                      <InputLabel
                                        sx={{
                                          overflow: "hidden",
                                          fontSize: "14px",
                                          marginRight: "8px",
                                          textOverflow: "ellipsis",
                                        }}
                                      >
                                        <Typography
                                          component="span"
                                          noWrap
                                          sx={{
                                            fontSize: "16px",
                                            whiteSpace: "nowrap",
                                            fontWeight: "700",
                                            lineHeight: "1.66",
                                            color: "#363636",
                                          }}
                                        >
                                          Phone Number
                                        </Typography>
                                      </InputLabel>
                                    </Box>
                                    <FormControl
                                      sx={{
                                        width: "100%",
                                      }}
                                    >
                                      <OutlinedInput
                                        defaultValue={JSON.parse(sessionStorage.getItem("loggedInUser")).phoneNumber}
                                        placeholder="55 77 99"
                                        type="tel"
                                        required
                                        name="password"
                                        sx={{
                                          borderRadius: "10px",
                                          border: "1px solid #cccccc",
                                          outline: "none",
                                          backgroundColor: "#ffffff",
                                        }}
                                      />
                                    </FormControl>
                                  </Grid>
                                </Grid>
                              </Box>
                            </Box>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>
                  </Box>
                </Box>
                <Box
                  sx={{
                    mt: 5,
                    mb: 5,
                    FontSize: "40px",
                    textAlign: "right",
                  }}
                >
                  <Button
                    onClick={updateUser}
                    sx={{
                      backgroundColor: "#c5022e",
                      border: "40px",
                      borderRadius: "10px",
                      color: "#fff",
                      padding: "10px 68px",
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box >
    </>
  );
};
export default Profile;