import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Dashboard from "./pages/Dashboard";
import AllMembers from "./pages/members/AllMembers";
import AddMember from "./pages/members/AddMember";
import AllStaff from "./pages/staff/AllStaff";
import AddStaff from "./pages/staff/AddStaff";
import MembersAttendance from "./pages/attendance/MembersAttendance";
import StaffAttendance from "./pages/attendance/StaffAttendance";
import MemberLogin from "./pages/MemberLogin";
import ClientLayout from "./layouts/ClientLayout";

function AdminLayout({ children }) {
  return (
    <>
      {/* Top Logo */}
      <Navbar style={{ backgroundColor: "#e8f5e9" }} className="px-3 py-2">
        <Container>
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex flex-column align-items-start"
            style={{ padding: "4px 10px", lineHeight: "1.4", fontWeight: 500 }}
          >
            <span style={{ fontSize: "1.2rem", fontWeight: "600" }}>
              Gym Management Software
            </span>
            <span
              style={{
                fontSize: "1rem",
                fontWeight: "500",
                color: "#2e7d32",
                alignSelf: "center"
              }}
            >
              Daily Fit
            </span>
          </Navbar.Brand>
        </Container>
      </Navbar>

      {/* Admin Tabs */}
      <Navbar bg="light" expand="lg" className="px-3 border-bottom">
        <Container className="justify-content-center">
          <Nav className="mx-auto">
            <Nav.Link as={Link} to="/dashboard" className="px-4 fw-bold text-dark">
              Dashboard
            </Nav.Link>
            <NavDropdown
              title="Members"
              id="members-dropdown"
              className="px-4 fw-bold text-dark"
            >
              <NavDropdown.Item as={Link} to="/members/all">
                All Members
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/members/add">
                Add Member
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Staff"
              id="staff-dropdown"
              className="px-4 fw-bold text-dark"
            >
              <NavDropdown.Item as={Link} to="/staff/all">
                All Staff
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/staff/add">
                Add Staff
              </NavDropdown.Item>
            </NavDropdown>
            <NavDropdown
              title="Attendance"
              id="attendance-dropdown"
              className="px-4 fw-bold text-dark"
            >
              <NavDropdown.Item as={Link} to="/attendance/members">
                Members Attendance
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/attendance/staff">
                Staff Attendance
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link
              href="/memberlogin"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 fw-bold text-dark"
              title="Member Login"
            >
              ↗
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Main Content */}
      <div className="container mt-4">{children}</div>
    </>
  );
}

function AppRoutes() {
  const location = useLocation();

  // If memberlogin path, use client layout only
  if (location.pathname === "/memberlogin") {
    return (
      <ClientLayout>
        <MemberLogin />
      </ClientLayout>
    );
  }

  // Else, use admin layout
  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/members/all" element={<AllMembers />} />
        <Route path="/staff/all" element={<AllStaff />} />
        <Route path="/members/add" element={<AddMember />} />
        <Route path="/staff/add" element={<AddStaff />} />
        <Route path="/attendance/members" element={<MembersAttendance />} />
        <Route path="/attendance/staff" element={<StaffAttendance />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </AdminLayout>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
