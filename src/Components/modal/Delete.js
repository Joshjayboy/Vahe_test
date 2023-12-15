import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ErrorIcon from "@mui/icons-material/Error";
import { makeStyles } from "@mui/styles";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  button: {
    width: "200px",
    color: "black",
    backgroundColor: "white",
    border: "1px #ccc solid",
    borderRadius: "10px",
    cursor: "pointer",
    padding: "10px 0",
    fontWeight: 700,
  },
});

export default function DeleteProduct(props) {
  const classes = useStyles();
  const { setOpen, handleConfirmDelete } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{ style: { width: "450px", borderRadius: "15px" } }}
      >
        <DialogTitle
          id="alert-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "nowrap",
          }}
        >
          <span>{"Delete product"} </span>
          <Button variant="standard" onClick={handleClose}>
            <CloseIcon />
          </Button>
        </DialogTitle>
        <DialogContentText sx={{ margin: "20px auto" }}>
          <ErrorIcon sx={{ color: "#eedd00", fontSize: "80px" }} />
        </DialogContentText>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{ textAlign: "center" }}
          >
            Deleting this item will remove it permanently. Do you want to
            continue?
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "nowrap",
            gap: 2,
          }}
        >
          <button
            onClick={handleClose}
            className={classes.button}
            style={{ marginLeft: "10px" }}
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            autoFocus
            className={classes.button}
            style={{
              backgroundColor: "green",
              color: "white",
              marginRight: "10px",
            }}
          >
            Delete
          </button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
