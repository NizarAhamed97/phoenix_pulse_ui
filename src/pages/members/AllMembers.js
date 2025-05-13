import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Link } from "react-router-dom";

const AllMembers = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/members`)
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error));
  }, []);

  return (
    <div>
      <h2>All Members</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Plan Name</th>
            <th>Plan Expiry</th>
            <th>Pending Amount</th>
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
              <td>{member.PlanName}</td>
              <td>{member.PlanExpiry}</td>
              <td>₹{member.Pending}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AllMembers;
