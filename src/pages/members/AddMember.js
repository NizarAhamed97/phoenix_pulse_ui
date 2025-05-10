import React, { useState, useEffect } from "react";
import axios from "axios";

const AddMember = () => {
  const [formData, setFormData] = useState({
    Name: "",
    DOB: "",
    ContactNo: "",
    Email: "",
    PersonalTrainer: false,
    TrainerID: "",
    PlanType: "",
    PlanDurationMonths: "0",
    PlanDurationYears: "0",
    AddedBy: ""
  });

  const [trainers, setTrainers] = useState([]);
  const [message, setMessage] = useState("");

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
      setMessage("Member added successfully!");

      // Reset form
      setFormData({
        Name: "",
        DOB: "",
        ContactNo: "",
        Email: "",
        PersonalTrainer: false,
        TrainerID: "",
        PlanType: "",
        PlanDurationMonths: "0",
        PlanDurationYears: "0",
        AddedBy: ""
      });
    } catch (err) {
      console.error(err);
      setMessage("Error adding member.");
    }

    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="container mt-4">
      <h3>Add Member</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Date of Birth</label>
          <input
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Contact Number</label>
          <input
            type="text"
            name="ContactNo"
            value={formData.ContactNo}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-check mb-3">
          <input
            className="form-check-input"
            type="checkbox"
            name="PersonalTrainer"
            checked={formData.PersonalTrainer}
            onChange={handleChange}
            id="personalTrainerCheck"
          />
          <label className="form-check-label" htmlFor="personalTrainerCheck">
            Personal Trainer
          </label>
        </div>

        <div className="mb-3">
          <label>Trainer</label>
          <select
            name="TrainerID"
            value={formData.TrainerID}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">-- Select Trainer --</option>
            {trainers.map((trainer) => (
              <option key={trainer.ID} value={trainer.ID}>
                {trainer.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label>Plan Type</label>
          <input
            type="text"
            name="PlanType"
            value={formData.PlanType}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <div className="mb-3 d-flex gap-3">
          <div>
            <label>Duration (Years)</label>
            <input
              type="number"
              name="PlanDurationYears"
              value={formData.PlanDurationYears}
              onChange={handleChange}
              className="form-control"
              min="0"
              style={{ width: "150px" }}
            />
          </div>
          <div>
            <label>Duration (Months)</label>
            <input
              type="number"
              name="PlanDurationMonths"
              value={formData.PlanDurationMonths}
              onChange={handleChange}
              className="form-control"
              min="0"
              max="11"
              style={{ width: "150px" }}
            />
          </div>
        </div>

        <div className="mb-4">
          <label>Added By</label>
          <input
            type="text"
            name="AddedBy"
            value={formData.AddedBy}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>

        <button type="submit" className="btn btn-outline-success">Add Member</button>
        <div style={{ marginBottom: "60px" }}></div>
      </form>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default AddMember;
