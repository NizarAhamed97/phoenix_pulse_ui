import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import LoadingBlock from "../../components/LoadingBlock";
import { BsPencilSquare } from "react-icons/bs";

const AllMembers = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [pendingInput, setPendingInput] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_BASE_URL}/members`)
      .then((response) => response.json())
      .then((data) => setMembers(data))
      .catch((error) => console.error("Error fetching members:", error))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdatePending = async (id) => {
    try {
      await fetch(`${process.env.REACT_APP_API_BASE_URL}/members/${id}/updatePending`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Pending: parseInt(pendingInput) })
      });

      const updated = members.map((m) =>
        m.ID === id ? { ...m, Pending: parseInt(pendingInput) } : m
      );
      setMembers(updated);
      setEditingId(null);
      setPendingInput("");
    } catch (err) {
      console.error("Failed to update pending amount:", err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <h2>All Members</h2>
      {loading ? (
        <LoadingBlock message="Loading all members..." />
      ) : (
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
                  <Link to={`/members/${member.ID}`} className="text-primary text-decoration-underline">
                    {member.Name}
                  </Link>
                </td>
                <td>{member.PlanName}</td>
                <td>{member.RenewalDate}</td>
                <td>
                  {editingId === member.ID ? (
                    <div className="d-flex gap-2">
                      <Form.Control
                        type="number"
                        size="sm"
                        value={pendingInput}
                        onChange={(e) => setPendingInput(e.target.value)}
                        style={{ width: "100px" }}
                      />
                      <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleUpdatePending(member.ID)}
                      >
                        ✅
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex align-items-center gap-2">
                      ₹ {member.Pending}
                      <BsPencilSquare
                        role="button"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEditingId(member.ID);
                          setPendingInput(member.Pending.toString());
                        }}
                      />

                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AllMembers;
