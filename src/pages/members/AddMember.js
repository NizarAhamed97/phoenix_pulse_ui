import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddMember = () => {
  const [formData, setFormData] = useState({
    Name: "",
    DOB: "",
    Mobile: "",
    Email: "",
    AddedBy: "Admin",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert("Member added successfully!")
  })
      .catch((error) => console.error("Error adding member:", error));
  };

  return (
    <div>
      <h2>Add Member</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" name="Name" value={formData.Name} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>DOB</Form.Label>
          <Form.Control type="date" name="DOB" value={formData.DOB} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mobile</Form.Label>
          <Form.Control type="text" name="Mobile" value={formData.Mobile} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" name="Email" value={formData.Email} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Add Member</Button>
      </Form>
    </div>
  );
};

export default AddMember;
