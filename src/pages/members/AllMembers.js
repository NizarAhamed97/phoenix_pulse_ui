import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

const AllMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/members") // Adjust API URL as needed
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  return (
    <div>
      <h2>All Members</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Mobile</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.Name}</td>
              <td>{member.DOB}</td>
              <td>{member.Mobile}</td>
              <td>{member.Email}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllMembers;
