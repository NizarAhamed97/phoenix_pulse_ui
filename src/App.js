import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import AllMembers from "./pages/members/AllMembers";
import AddMember from "./pages/members/AddMember";
import AllStaff from "./pages/staff/AllStaff";
import AddStaff from "./pages/staff/AddStaff";
import MembersAttendance from "./pages/attendance/MembersAttendance";
import StaffAttendance from "./pages/attendance/StaffAttendance";

function App() {
  return (
    <Router>
      {/* First Top Bar with Logo */}
      <Navbar bg="danger" variant="dark" className="px-3 py-2">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold mx-auto" style={{ fontSize: "1.8rem" }}>
            Phoenix Pulse
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Second Top Bar with Navigation Tabs */}
      <Navbar bg="light" expand="lg" className="px-3 border-bottom">
        <Container className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/dashboard" className="px-4 fw-bold text-dark">Dashboard</Nav.Link>
            <NavDropdown title="Members" id="members-dropdown" className="px-4 fw-bold text-dark">
              <NavDropdown.Item as={Link} to="/members/all">All Members</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/members/add">Add Member</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Staff" id="staff-dropdown" className="px-4 fw-bold text-dark">
              <NavDropdown.Item as={Link} to="/staff/all">All Staff</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/staff/add">Add Staff</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Attendance" id="attendance-dropdown" className="px-4 fw-bold text-dark">
            <NavDropdown.Item as={Link} to="/attendance/members">Members Attendance</NavDropdown.Item>
            <NavDropdown.Item as={Link} to="/attendance/staff">Staff Attendance</NavDropdown.Item>
          </NavDropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* Page Content */}
      <div className="container mt-4">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/members/all" element={<AllMembers />} />
          <Route path="/staff/all" element={<AllStaff />} />
          <Route path="/members/add" element={<AddMember />} />
          <Route path="/staff/add" element={<AddStaff />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/attendance/members" element={<MembersAttendance />} />
          <Route path="/attendance/staff" element={<StaffAttendance />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
