import React, { useState } from "react";
import axios from "axios";
import './../App.css'; // Assuming animations are defined here

const MemberLogin = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [memberName, setMemberName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/attendance/members/checkin`, {
        FK_MemberID: input
      });

      setIsError(false);
      setIsSuccess(true);

      if (res.status === 200) {
        setMessage("Successfully Logged Out");
      } else if (res.status === 201) {
        setMessage("Successfully Logged In");
        setMemberName(res.data?.Name || "");
      }
    } catch (err) {
      setIsError(true);
      setIsSuccess(false);
      if (err.response?.status === 403) {
        setMessage("Already Checked In for the day. Please Check In tomorrow.");
      } else {
        setMessage("Invalid ID or Phone Number.");
      }
    } finally {
      setAnimate(true);
      setInput("");

      setTimeout(() => {
        setMessage("");
        setMemberName("");
        setAnimate(false);
        setIsError(false);
        setIsSuccess(false);
      }, 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "80vh" }}>
      <div className="card shadow-sm p-4" style={{ maxWidth: "400px", width: "100%" }}>
        <h4 className="text-center mb-3 text-success">Member Check-In</h4>

        <input
          type="text"
          placeholder="Enter ID or Mobile Number"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={`form-control mb-3 ${isError ? "is-invalid" : ""}`}
          style={{ height: "48px", fontSize: "1rem" }}
        />

        <button
          onClick={handleLogin}
          className="btn btn-success w-100"
          style={{ height: "45px", fontSize: "1rem" }}
        >
          Check In
        </button>

        {message && (
          <div className={`mt-4 text-center ${animate && isSuccess ? "fade-success" : ""}`}>
            <div className={`fw-semibold ${isError ? "text-danger" : "text-success"}`}>
              {message}
            </div>
            {memberName && <div className="text-muted">{memberName}</div>}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberLogin;
