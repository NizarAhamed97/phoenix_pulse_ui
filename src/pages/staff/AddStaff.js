import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    Name: "",
    DOB: "",
    Mobile: "",
    Email: "",
    Role: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/api/staffs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) =>{
        alert("Staff added successfully!")
        console.log(data)
      } )
      .catch((error) => console.error("Error adding staff:", error));
  };

  return (
    <div>
      <h2>Add Staff</h2>
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
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control type="text" name="Role" value={formData.Role} onChange={handleChange} required />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">Add Staff</Button>
      </Form>
    </div>
  );
};

export default AddStaff;
