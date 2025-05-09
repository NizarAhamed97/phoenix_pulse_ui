import React, { useState } from "react";
import axios from "axios";
import './../App.css';


const MemberLogin = () => {
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [memberName, setMemberName] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/attendance/members/checkin", {
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
        setMessage("Already Checked In for the day, Please Check In tomorrow");
      } else {
        setMessage("Invalid ID/Phone Number");
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
    <div className="container mt-4" style={{ paddingTop: "20px" }}>
      <h3 className="text-center mb-4">Member Login</h3>
      <input
        type="text"
        placeholder="Enter ID or Mobile Number"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className={`form-control mb-3 ${isError ? "input-error shake" : ""}`}
        style={{ height: "48px", fontSize: "1rem" }}
      />
      <button
        onClick={handleLogin}
        className="btn btn-outline-success w-100"
        style={{ height: "45px", fontSize: "1rem" }}
      >
        Check In
      </button>

      {message && (
        <div className={`mt-4 text-center ${animate && isSuccess ? "fade-success" : ""}`}>
          <strong>{message}</strong>
          {memberName && <div>{memberName}</div>}
        </div>
      )}
    </div>
  );
};

export default MemberLogin;
