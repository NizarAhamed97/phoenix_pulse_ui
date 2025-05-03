import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table, Row, Col, Card } from "react-bootstrap";

const MemberAttendance = () => {
  const [memberID, setMemberID] = useState("");
  const [presentMembers, setPresentMembers] = useState({ inGym: [], checkedOut: [] });
  const [absentMembers, setAbsentMembers] = useState([]);

  const handleCheckIn = async () => {
    if (!memberID) return;
    try {
      await axios.post("/api/attendance/members/checkin", { FK_MemberID: memberID });
      setMemberID("");
      fetchAttendance();
    } catch (error) {
      console.error("Check-in failed:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const presentRes = await axios.get("/api/attendance/members/present");
      console.log(presentRes)
      const absentRes = await axios.get("/api/attendance/members/absent");

      setPresentMembers({
        inGym: presentRes.data.filter((m) => m.CheckOut === null),
        checkedOut: presentRes.data.filter((m) => m.CheckOut !== null),
      });
      setAbsentMembers(absentRes.data);
    } catch (error) {
      console.error("Failed to fetch attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div>
      {/* Section 1: Check-In Form */}
      <Card className="mb-4">
        <Card.Header>Attendance</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Enter Member ID"
                  value={memberID}
                  onChange={(e) => setMemberID(e.target.value)}
                />
              </Col>
              <Col>
                <Button onClick={handleCheckIn} variant="success">
                  Check In/Out
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Section 2: Present Members */}
      <Card className="mb-4">
        <Card.Header>Present Members</Card.Header>
        <Card.Body>
          <h6>In</h6>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Check-In Time</th>
              </tr>
            </thead>
            <tbody>
              {presentMembers.inGym.map((member) => (
                <tr key={member.ID}>
                  <td>{member.ID}</td>
                  <td>{member.Name}</td>
                  <td>{member.CheckIn}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h6 className="mt-4">Out</h6>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
              </tr>
            </thead>
            <tbody>
              {presentMembers.checkedOut.map((member) => (
                <tr key={member.ID}>
                  <td>{member.ID}</td>
                  <td>{member.Name}</td>
                  <td>{member.CheckIn}</td>
                  <td>{member.CheckOut}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Section 3: Absent Members */}
      <Card>
        <Card.Header>Yet to Check In</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {absentMembers.map((member) => (
                <tr key={member.ID}>
                  <td>{member.ID}</td>
                  <td>{member.Name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MemberAttendance;
