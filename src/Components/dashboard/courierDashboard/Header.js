import { AppBar, Avatar, Box, Divider, Toolbar } from "@mui/material";
import React from "react";
import VemaLogoSVG from "../../table/svg/VemaLogoSVG";

export default function Header(props) {
  const { firstname } = props;

  return (
    <div>
      <AppBar
        position="absolute"
        // open={open}
        sx={{
          backgroundColor: "#ffffff",
          boxShadow: "none",
          color: "black",
          position: "relative",
        }}
      >
        <Toolbar
          sx={{
            pr: "24px",
          }}
        >
          <Box sx={{ flexGrow: 1 }}>
            <VemaLogoSVG />
          </Box>
          <Box
            sx={{
              color: "#101828",
              pr: 1,
            }}
          ></Box>
          <Box
            sx={{
              color: "#101828",
            }}
          >
            {!!firstname
              ? JSON.parse(sessionStorage.getItem("loggedInUser")).firstname
              : " "}
          </Box>
          <Box
            sx={{
              pl: 5,
              mr: 5,
            }}
          >
            <img
              alt="icon"
              style={{ cursor: "pointer" }}
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
    </div>
  );
}
