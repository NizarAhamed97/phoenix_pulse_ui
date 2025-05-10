import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/members`) // Adjust API URL as needed
      .then((response) => response.json())
      .then((data) => {
        setMembers(data)
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
            <th>Contact No</th>
            <th>Plan</th>
            <th>Renewal Date</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.ID}>
              <td>{member.ID}</td>
              <td>
                <Link to={`/members/${member.ID}`} style={{ textDecoration: "none" }}>
                {member.Name}
                </Link>
              </td>
              <td>{member.ContactNo}</td>
              <td>{member.PlanType}</td>
              <td>{member.RenewalDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllMembers;
