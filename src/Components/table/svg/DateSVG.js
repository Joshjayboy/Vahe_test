import React from "react";

export default function DateSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width="25"
      height="25"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
    >
      <rect x="10" y="10" width="80" height="80" rx="15" ry="15" />
      <line x1="10" y1="30" x2="90" y2="30" strokeWidth="3" />
      <line x1="35" y1="2" x2="35" y2="20" strokeWidth="3" />
      <line x1="65" y1="2" x2="65" y2="20" strokeWidth="3" />
    </svg>
  );
}
