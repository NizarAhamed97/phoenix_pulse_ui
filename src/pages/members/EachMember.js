import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const EachMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/members/${id}`)
      .then(res => setMember(res.data))
      .catch(err => console.error("Failed to fetch member", err));
  }, [id]);

  if (!member) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h3>Member Details</h3>
      <p><strong>ID:</strong> {member.ID}</p>
      <p><strong>Name:</strong> {member.Name}</p>
      <p><strong>DOB:</strong> {member.DOB}</p>
      <p><strong>Contact:</strong> {member.ContactNo}</p>
      <p><strong>Email:</strong> {member.Email}</p>
      <p><strong>Plan Name:</strong> {member.PlanName}</p>
      <p><strong>Plan Amount:</strong> {member.PlanAmount}</p>
      <p><strong>Amount Paid:</strong> {member.AmountPaid}</p>
      <p><strong>Pending:</strong> {member.Pending}</p>
      <p><strong>Membership Expires:</strong> {member.PlanExpiry}</p>
      <p><strong>Member Added By:</strong> {member.AddedBy}</p>
      {/* Add more fields as needed */}
    </div>
  );
};

export default EachMember;
