import React from "react";

export default function TableName(props) {
  const { children } = props;

  return (
    <p
      style={{
        color: "#101828",
        // fontFamily: "Inter",
        fontSize: "18px",
        fontStyle: "normal",
        fontWeight: 900,
        lineHeight: "28px",
        paddingTop: "16px",
        paddingLeft: "16px",
      }}
    >
      {children}
    </p>
  );
}
