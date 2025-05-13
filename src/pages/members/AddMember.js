import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";

const AddMember = () => {
  const [formData, setFormData] = useState({
    Name: "",
    DOB: "",
    ContactNo: "",
    Email: "",
    PersonalTrainer: false,
    TrainerID: "",
    PlanName: "",
    PlanDurationMonths: "0",
    PlanDurationYears: "0",
    PlanAmount: "",
    AmountPaid: "",
    AddedBy: ""
  });

  const [trainers, setTrainers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/staffs/trainers`)
      .then((res) => setTrainers(res.data))
      .catch((err) => console.error("Failed to load trainers", err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      PlanDuration: `${formData.PlanDurationYears} years ${formData.PlanDurationMonths} months`
    };

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/members`, payload);
      setShowModal(true);

      // Reset form
      setFormData({
        Name: "",
        DOB: "",
        ContactNo: "",
        Email: "",
        PersonalTrainer: false,
        TrainerID: "",
        PlanName: "",
        PlanDurationMonths: "0",
        PlanDurationYears: "0",
        PlanAmount: "",
        AmountPaid: "",
        AddedBy: ""
      });
    } catch (err) {
      console.error(err);
      alert("Error adding member.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Member</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input type="text" name="Name" value={formData.Name} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input type="date" name="DOB" value={formData.DOB} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Contact Number</label>
          <input type="text" name="ContactNo" value={formData.ContactNo} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input type="email" name="Email" value={formData.Email} onChange={handleChange} className="form-control" required />
        </div>

        <div className="form-check mb-3">
          <input className="form-check-input" type="checkbox" name="PersonalTrainer" checked={formData.PersonalTrainer} onChange={handleChange} id="personalTrainerCheck" />
          <label className="form-check-label" htmlFor="personalTrainerCheck">
            Personal Trainer
          </label>
        </div>

        <div className="mb-3">
          <label>Trainer</label>
          <select name="TrainerID" value={formData.TrainerID} onChange={handleChange} className="form-control" required>
            <option value="">-- Select Trainer --</option>
            {trainers.map((trainer) => (
              <option key={trainer.ID} value={trainer.ID}>{trainer.Name}</option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Plan Name</label>
          <input type="text" name="PlanName" value={formData.PlanName} onChange={handleChange} className="form-control" required />
        </div>

        <div className="mb-3 d-flex gap-3">
          <div>
            <label>Duration (Years)</label>
            <input type="number" name="PlanDurationYears" value={formData.PlanDurationYears} onChange={handleChange} className="form-control" min="0" style={{ width: "150px" }} />
          </div>
          <div>
            <label>Duration (Months)</label>
            <input type="number" name="PlanDurationMonths" value={formData.PlanDurationMonths} onChange={handleChange} className="form-control" min="0" max="11" style={{ width: "150px" }} />
          </div>
        </div>

        <div className="mb-3">
          <label>₹ Plan Amount</label>
          <input type="number" name="PlanAmount" value={formData.PlanAmount} onChange={handleChange} className="form-control" min="0" />
        </div>

        <div className="mb-3">
          <label>₹ Amount Paid</label>
          <input type="number" name="AmountPaid" value={formData.AmountPaid} onChange={handleChange} className="form-control" min="0" />
        </div>

        <div className="mb-4">
          <label>Added By</label>
          <input type="text" name="AddedBy" value={formData.AddedBy} onChange={handleChange} className="form-control" required />
        </div>

        <button type="submit" className="btn btn-outline-success">Add Member</button>
        <div style={{ marginBottom: "60px" }}></div>
      </form>

      {/* Modal for success message */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Body className="text-center">
          <h5 className="text-success">✅ Member Added Successfully</h5>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={() => setShowModal(false)}>OK</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AddMember;
