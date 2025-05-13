// src/utils/auth.js
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    const expiry = localStorage.getItem("token_expiry");
  
    if (!token || !expiry) return false;
  
    const now = Date.now();
    return now < parseInt(expiry, 10);
  };
  