import React from "react"

export const Loader = ({ progress }) => {
  return (
    <span
      style={{
        display: "block",
        width: `${progress}%`,
        background: "#2456e0",
        color: "#fff",
        padding: "4px 10px",
        marginTop: "10px",
        transition: "width .3s ease",
      }}
    >
      {progress}%
    </span>
  )
}
