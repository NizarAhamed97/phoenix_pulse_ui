import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Modal, Button, Form, Row, Col, Badge } from "react-bootstrap";
import LoadingBlock from "../../components/LoadingBlock";

const EachMember = () => {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [showRenewModal, setShowRenewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // Renew form
  const [PlanName, setPlanName] = useState("");
  const [PlanDurationYears, setPlanYears] = useState("0");
  const [PlanDurationMonths, setPlanMonths] = useState("0");
  const [PlanAmount, setPlanAmount] = useState("");
  const [AmountPaid, setAmountPaid] = useState("");

  // Edit form
  const [Name, setName] = useState("");
  const [DOB, setDOB] = useState("");
  const [ContactNo, setContactNo] = useState("");
  const [Email, setEmail] = useState("");

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/members/${id}`)
      .then(res => {
        const data = res.data;
        setMember(data);

        // pre-fill edit form
        setName(data.Name);
        setDOB(data.DOB);
        setContactNo(data.ContactNo);
        setEmail(data.Email);
      })
      .catch(err => console.error("Failed to fetch member", err));
  }, [id]);

  const isExpired = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    const expiryDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();
    return expiryDate.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  const handleRenewSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        PlanName,
        PlanDurationYears,
        PlanDurationMonths,
        PlanAmount,
        AmountPaid
      };

      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/members/${id}/renew`, payload);
      alert("Membership renewed successfully!");
      setShowRenewModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Renewal failed", err);
      alert("Failed to renew membership.");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { Name, DOB, ContactNo, Email };
      await axios.put(`${process.env.REACT_APP_API_BASE_URL}/members/${id}`, payload);
      alert("Member updated successfully!");
      setShowEditModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update member.");
    }
  };

  if (!member) return <LoadingBlock message="Loading member details..." />;

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
      <p><strong>Pending:</strong> {member.Pending}</p>
      <p>
        <strong>Membership Expires:</strong> {member.RenewalDate}{" "}
        {isExpired(member.RenewalDate) && (
          <Badge bg="danger" className="ms-2">Expired</Badge>
        )}
      </p>

      <div className="d-flex gap-3 mt-3">
        <Button variant="outline-success" onClick={() => setShowRenewModal(true)}>
          Renew Membership
        </Button>
        <Button variant="outline-primary" onClick={() => setShowEditModal(true)}>
          Edit Details
        </Button>
      </div>

      {/* Renew Modal */}
      <Modal show={showRenewModal} onHide={() => setShowRenewModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Renew Membership</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleRenewSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Plan Name</Form.Label>
              <Form.Control
                type="text"
                value={PlanName}
                onChange={(e) => setPlanName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Plan Amount</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={PlanAmount}
                onChange={(e) => setPlanAmount(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount Paid</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={AmountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Label>Plan Duration</Form.Label>
            <Row className="mb-3">
              <Col>
                <Form.Select value={PlanDurationYears} onChange={(e) => setPlanYears(e.target.value)}>
                  {[...Array(6)].map((_, i) => (
                    <option key={i} value={i}>{i} years</option>
                  ))}
                </Form.Select>
              </Col>
              <Col>
                <Form.Select value={PlanDurationMonths} onChange={(e) => setPlanMonths(e.target.value)}>
                  {[...Array(12)].map((_, i) => (
                    <option key={i} value={i}>{i} months</option>
                  ))}
                </Form.Select>
              </Col>
            </Row>

            <div className="text-end">
              <Button type="submit" variant="success">Submit</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Member Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DOB</Form.Label>
              <Form.Control
                type="date"
                value={DOB}
                onChange={(e) => setDOB(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Contact Number</Form.Label>
              <Form.Control
                type="text"
                value={ContactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <div className="text-end">
              <Button type="submit" variant="primary">Update</Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EachMember;
