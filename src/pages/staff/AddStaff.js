import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";

const AddStaff = () => {
  const [formData, setFormData] = useState({
    Name: "",
    DOB: "",
    Mobile: "",
    Email: "",
    FK_StaffRole: "",
  });

  const [roles, setRoles] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/staffs/role`)
      .then((res) => res.json())
      .then((data) => setRoles(data))
      .catch((err) => console.error("Error fetching roles:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_API_BASE_URL}/staffs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          alert("Staff added successfully!");
          setFormData({
            Name: "",
            DOB: "",
            Mobile: "",
            Email: "",
            FK_StaffRole: "",
          });
        } else {
          return response.json().then((data) => {
            throw new Error(data.message || "Failed to add staff");
          });
        }
      })
      .catch((error) => console.error("Error adding staff:", error));
  };

  return (
    <div>
      <h2>Add Staff</h2>
      <Form onSubmit={handleSubmit}>
        {/* Name */}
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* DOB */}
        <Form.Group>
          <Form.Label>DOB</Form.Label>
          <Form.Control
            type="date"
            name="DOB"
            value={formData.DOB}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Mobile */}
        <Form.Group>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            name="Mobile"
            value={formData.Mobile}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Email */}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* Role Dropdown */}
        <Form.Group>
          <Form.Label>Role</Form.Label>
          <Form.Control
            as="select"
            name="FK_StaffRole"
            value={formData.FK_StaffRole}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.ID} value={role.ID}>
                {role.Role}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Add Staff
        </Button>
        <div style={{ marginBottom: "60px" }}></div>
      </Form>
    </div>
  );
};

export default AddStaff;
