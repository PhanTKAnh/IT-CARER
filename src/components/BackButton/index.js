import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = ({ label = "Quay lại", to = -1 }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        background: "#f0f0f0",
        border: "none",
        padding: "0.5rem 1rem",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: 500,
        marginBottom: "1rem"
      }}
    >
      <FaArrowLeft />
      {label}
    </button>
  );
};

export default BackButton;
 