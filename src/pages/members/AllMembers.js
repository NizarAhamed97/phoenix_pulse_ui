import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";

const AllMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/members`) // Adjust API URL as needed
      .then((response) => response.json())
      .then((data) => {
        setMembers(data)
        console.log(data)
  })
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
            <tr key={member.ID}>
              <td>{member.ID}</td>
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
