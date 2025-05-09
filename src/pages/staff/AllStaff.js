import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const AllStaff = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/staffs") // Adjust API URL as needed
      .then((response) => response.json())
      .then((data) => setStaff(data))
      .catch((error) => console.error("Error fetching staff:", error));
  }, []);

  return (
    <div>
      <h2>All Staff</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((person) => (
            <tr key={person.ID}>
              <td>{person.ID}</td>
              <td>{person.Name}</td>
              <td>{person.DOB}</td>
              <td>{person.Mobile}</td>
              <td>{person.Email}</td>
              <td>{person.Role}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllStaff;
