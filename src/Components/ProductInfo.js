import React, { useState } from "react";
import { Divider, Table, TableBody } from "@mui/material";
import ProductInfoItem from "./product/ProductInfoItem";
import { Box, Typography } from "@mui/material";
import Modal from "@mui/material/Modal";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
const useStyles = makeStyles({
  table: {
    // minWidth: "60%",
  },
});
const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));
export default function ProductInfo(props) {
  const { product, handleSaveChangesClick, showRequestMessage, message } =
    props;
  const [isImg, setImg] = useState(false);
  const handleImg = () => {
    setImg(true);
  };
  const handleCloseModal = () => {
    setImg(false);
  };
  const [imageFile, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };
  const handleSaveImg = async (e) => {
    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const imageUrl = reader.result;
        const updatedInfo = {
          ...product,
          imageUrl: imageUrl,
        };
        console.log("Unique ID for the image:", imageUrl);
      };
      reader.readAsDataURL(imageFile);
    }
  };
  return (
    <>
      <h4 style={{ fontSize: "18px", paddingLeft: "25px" }}> Product Info </h4>
      <p style={{ paddingLeft: "25px" }}> ID: {product.id} </p>
      <Divider />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mr: 4,
          ml: 4,
          mt: 3,
          mb: 3,
        }}
      >
        <Box>
          <Box>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <>
                  <SmallAvatar
                    onClick={handleImg}
                    alt="Remy Sharp"
                    src="https://res.cloudinary.com/pro-solve/image/upload/v1698249059/pen_btazm3.png"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <Modal
                    open={isImg}
                    onClose={handleCloseModal}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 300,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <input type="file" onChange={handleFileChange} />
                      <Button
                        variant="outlined"
                        onClick={() => handleSaveImg(product)}
                        sx={{ mt: 5 }}
                      >
                        Save
                      </Button>
                    </Box>
                  </Modal>
                </>
              }
            >
              <Avatar alt="badge" src={product.imageUrl} />
            </Badge>
            <Typography
              sx={{
                display: "inline",
                fontSize: "20px",
                fontWeight: 600,
                ml: 3,
              }}
            >
              {product.name}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            fontSize: "24px",
            backgroundColor: "#EAECF0",
            color: "#464D77",
            pl: 1,
            pr: 1,
            height: "fit-content",
          }}
        >
          {product.price}$
        </Box>
      </Box>
      <Divider />
      <Table sx={{ width: "80%", margin: "auto" }}>
        <TableBody style={{ display: "flex", flexDirection: "column" }}>
          <ProductInfoItem
            product={product}
            handleSaveChangesClick={handleSaveChangesClick}
            showRequestMessage={showRequestMessage}
            message={message}
          />
        </TableBody>
      </Table>
    </>
  );
}
