import React from "react";
import SuccessSVG from "../svg/SuccessSVG";

export default function ActionCell(props) {
  const { onClick, handleSaveChangesClick } = props;

  return (
    <>
      <span onClick={onClick} style={{ cursor: "pointer", marginRight: "2px" }}>
        X
      </span>
      <SuccessSVG
        onClick={async () => {
          await handleSaveChangesClick();
          await onClick();
        }}
      />
    </>
  );
}
