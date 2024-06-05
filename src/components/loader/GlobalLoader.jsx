// GlobalLoader.js
import React from "react";
import { ClipLoader } from "react-spinners";
import { useLoader } from "../../context/LoaderContext";

const GlobalLoader = () => {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000, // Ensure loader is above everything
      }}
    >
      <ClipLoader color="#123abc" size={150} />
    </div>
  );
};

export default GlobalLoader;
