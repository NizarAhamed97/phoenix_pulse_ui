import React, { useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";
import "./../App.css"; // Assuming styles like 'is-invalid' are still used

const MemberLogin = () => {
  const [input, setInput] = useState("");
  const [popupMessage, setPopupMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/attendance/members/checkin`, {
        FK_MemberID: input
      });

      setIsError(false);

      if (res.status === 200) {
        setPopupMessage("Thank you!! for Log Out");
      } else if (res.status === 201) {
        setPopupMessage("Thank you!! for Log In");
      } else {
        setPopupMessage("Logged in");
      }

      setShowModal(true);
    } catch (err) {
      setIsError(true);

      if (err.response?.status === 403) {
        setPopupMessage("Already Checked In for the day. Please Check In tomorrow.");
      } else {
        setPopupMessage("Invalid ID or Phone Number.");
      }

      setShowModal(true);
    } finally {
      setInput("");

      // Auto-close modal after 3 seconds
      setTimeout(() => {
        setShowModal(false);
        setPopupMessage("");
        setIsError(false);
      }, 2000);
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
      </div>

      {/* Centered Modal */}
      <Modal
        show={showModal}
        centered
        backdrop="static"
        keyboard={false}
        onHide={() => setShowModal(false)}
        contentClassName="text-center"
      >
        <Modal.Body>
          <h5 className={isError ? "text-danger" : "text-success"}>{popupMessage}</h5>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default MemberLogin;
