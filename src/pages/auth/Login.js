import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log("Attempting login for:", username);

      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, {
        username,
        password,
      });

      const token = res.data.token;
      console.log(token)
      if (!token) throw new Error("No token received from server");

      // Decode token
      const payload = JSON.parse(atob(token.split(".")[1]));
      const expiryTime = payload.exp * 1000; // convert to ms
      console.log(payload)
      const user = payload.username;

      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("token_expiry", expiryTime.toString());
      localStorage.setItem("username", user);

      console.log("Login successful. Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h3 className="text-center mb-4">Admin Login</h3>

      {error && <div className="alert alert-danger">{error}</div>}

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ height: "45px" }}
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ height: "45px" }}
      />

      <button className="btn btn-success w-100" onClick={handleLogin} style={{ height: "45px" }}>
        Login
      </button>
    </div>
  );
};

export default Login;
