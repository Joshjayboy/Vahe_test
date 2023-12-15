import React from "react";
import { Button, Box } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PERPAGE } from "../../Constants/AppConstants";

export default function CustomPagination(props) {
  const { allLists, currentPage, setCurrentPage, perpage } = props;
  return (
    <div
      style={{
        margin: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Button
        variant="outlined"
        disabled={!!(currentPage === 1)}
        style={{
          color: "black",
          borderColor: "black",
          visibility: currentPage > 1 ? "visible" : "hidden",
          marginBottom: "50px",
        }}
        onClick={() => {
          setCurrentPage((prev) => --prev);
        }}
      >
        <ArrowBackIcon sx={{ mr: 1 }} /> Previous
      </Button>
      <Pagination
        count={Math.ceil(allLists.length / (perpage || PERPAGE))}
        page={currentPage}
        hideNextButton
        hidePrevButton
        shape="rounded"
        onChange={(event, value) => {
          setCurrentPage(value);
        }}
      />
      <Button
        variant="outlined"
        disabled={
          currentPage === Math.ceil(allLists.length / (perpage || PERPAGE))
        }
        style={{
          color: "black",
          borderColor: "black",
          visibility:
            currentPage === Math.ceil(allLists.length / (perpage || PERPAGE))
              ? "hidden"
              : "visible",
        }}
        onClick={() => {
          setCurrentPage((prev) => ++prev);
        }}
      >
        Next <ArrowForwardIcon sx={{ ml: 1 }} />
      </Button>
    </div>
  );
}
