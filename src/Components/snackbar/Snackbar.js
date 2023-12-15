import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="" {...props} />;
});

export default function SnackbarMessage(props) {
  const { message } = props;
  const [open, setOpen] = React.useState(true);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        sx={{
          width: "300px",
          backgroundColor: "rgba(233,243,232,255)",
          color: "black",
          borderLeft: "4px rgba(57,122,34,255) solid",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
