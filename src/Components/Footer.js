import React from 'react';
import Grid from '@mui/material/Grid';
import { Button, Box } from '@mui/material';
import AppBar from "@mui/material/AppBar";

const Footer = () => {
  return (
    <Box
      sx={{
        marginBottom: "1px",
        bgcolor: '#edebe7',
        height: "30px",
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginBottom: "1px",
        }}
      >
        <Grid
          container
          spacing={2}
          columns={12}
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                color: '#000',
              }}
            >
              ©COPYRIGHT 2021 DET NORSKE BRENNERI AS
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                color: '#000',
              }}
            >
              PRIVACY POLICY
            </Button>
          </Grid>
          <Grid
            item
            xs={4}
            sx={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <Button
              sx={{
                color: '#000',
              }}
            >
              MADE BY BUGFIX
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Footer;
