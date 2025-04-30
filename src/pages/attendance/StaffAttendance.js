import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Table, Row, Col, Card } from "react-bootstrap";

const StaffAttendance = () => {
  const [staffID, setStaffID] = useState("");
  const [presentStaff, setPresentStaff] = useState({ inGym: [], checkedOut: [] });
  const [absentStaff, setAbsentStaff] = useState([]);

  const handleCheckIn = async () => {
    if (!staffID) return;
    try {
      await axios.post("http://localhost:5000/attendance/staff/checkin", { StaffID: staffID });
      setStaffID("");
      fetchAttendance();
    } catch (error) {
      console.error("Staff check-in failed:", error);
    }
  };

  const fetchAttendance = async () => {
    try {
      const presentRes = await axios.get("http://localhost:5000/attendance/staff/present");
      const absentRes = await axios.get("http://localhost:5000/attendance/staff/absent");

      setPresentStaff({
        inGym: presentRes.data.filter((s) => s.CheckOutTime === null),
        checkedOut: presentRes.data.filter((s) => s.CheckOutTime !== null),
      });
      setAbsentStaff(absentRes.data);
    } catch (error) {
      console.error("Failed to fetch staff attendance:", error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div>
      {/* Section 1: Check-In Form */}
      <Card className="mb-4">
        <Card.Header>Check In</Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Control
                  type="text"
                  placeholder="Enter Staff ID"
                  value={staffID}
                  onChange={(e) => setStaffID(e.target.value)}
                />
              </Col>
              <Col>
                <Button onClick={handleCheckIn} variant="success">
                  Check In
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      {/* Section 2: Present Staff */}
      <Card className="mb-4">
        <Card.Header>Present Staff</Card.Header>
        <Card.Body>
          <h6>Currently In Gym</h6>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Check-In Time</th>
              </tr>
            </thead>
            <tbody>
              {presentStaff.inGym.map((staff) => (
                <tr key={staff.ID}>
                  <td>{staff.ID}</td>
                  <td>{staff.Name}</td>
                  <td>{staff.CheckInTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>

          <h6 className="mt-4">Checked Out</h6>
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
              {presentStaff.checkedOut.map((staff) => (
                <tr key={staff.ID}>
                  <td>{staff.ID}</td>
                  <td>{staff.Name}</td>
                  <td>{staff.CheckInTime}</td>
                  <td>{staff.CheckOutTime}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Section 3: Absent Staff */}
      <Card>
        <Card.Header>Absent Staff</Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {absentStaff.map((staff) => (
                <tr key={staff.ID}>
                  <td>{staff.ID}</td>
                  <td>{staff.Name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
};

export default StaffAttendance;
