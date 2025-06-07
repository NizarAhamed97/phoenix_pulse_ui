import React from "react";


const ClientLayout = ({ children }) => {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5fdf5", padding: "20px" }}>
      {/* Top Bar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        {/* Logo + Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.jpeg" alt="Logo" style={{ height: "50px", width: "50px" }} />
        <div>
          <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "#222" }}>
            Gym Management Software
          </div>
          <div style={{ fontSize: "1.1rem", color: "#2e7d32", fontWeight: "500" }}>
            Daily Fit
          </div>
        </div>
        </div>

        {/* Top Right Text */}
        <div style={{ fontSize: "1rem", fontWeight: "500", color: "#666", marginTop: "8px" }}>
          Admin
        </div>
      </div>

      {/* Back to Home button */}
      <div className="d-flex justify-content-end mb-3" style={{ maxWidth: "500px", margin: "20px auto 0" }}>
        <Link to="/" className="btn btn-outline-secondary btn-sm">Back to Home</Link>
      </div>

      {/* Page content */}
      <div style={{ maxWidth: "500px", margin: "40px auto" }}>
        {children}
      </div>
    </div>
  );
};

export default ClientLayout;
