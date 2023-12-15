import React from "react";

export default function PenSVG(props) {
  const { onClick } = props;

  return (
    <svg
      onClick={onClick}
      style={{ marginLeft: "20px" }}
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      cursor="pointer"
    >
      <path
        d="M2.39668 15.0963C2.43497 14.7517 2.45411 14.5794 2.50624 14.4184C2.55249 14.2755 2.61784 14.1396 2.70051 14.0142C2.79369 13.8729 2.91627 13.7503 3.16142 13.5052L14.1667 2.49992C15.0871 1.57945 16.5795 1.57945 17.5 2.49993C18.4205 3.4204 18.4205 4.91279 17.5 5.83326L6.49475 16.8385C6.2496 17.0836 6.12702 17.2062 5.98572 17.2994C5.86035 17.3821 5.72439 17.4474 5.58152 17.4937C5.42048 17.5458 5.24819 17.5649 4.90362 17.6032L2.08331 17.9166L2.39668 15.0963Z"
        stroke="#475467"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
