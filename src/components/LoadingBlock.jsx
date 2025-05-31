import React from "react";

const LoadingBlock = ({ message = "Loading..." }) => (
  <div className="d-flex justify-content-center align-items-center w-100" style={{ height: "100%" }}>
    <div className="text-center">
      <div className="spinner-border text-success mb-2" role="status"></div>
      <div className="text-muted">{message}</div>
    </div>
  </div>
);

export default LoadingBlock;
