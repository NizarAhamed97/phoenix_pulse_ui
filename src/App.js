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
import EachMember from "./pages/members/EachMember";


function AdminLayout({ children }) {
  return (
    <>
      {/* Top Logo */}
      <Navbar style={{ backgroundColor: "#e8f5e9", padding: "12px 24px" }} expand="lg">
  <Container fluid className="d-flex justify-content-between align-items-center">
    
    {/* Left - Logo block */}
    <div className="d-flex flex-column justify-content-center" style={{ lineHeight: "1.2" }}>
      <span style={{ fontSize: "20px", color: "#388e3c", fontWeight: 400 }}>
        Gym Management Software
      </span>
      <span style={{ fontSize: "13px", color: "#1b5e20", fontWeight: "bold", textAlign: "center" }}>
        Daily Fit
      </span>
    </div>

    {/* Right - Login placeholder */}
    <span style={{ fontSize: "14px", color: "#388e3c", fontWeight: 500 }}>
      Admin
    </span>

  </Container>
</Navbar>



      {/* Admin Tabs */}
      <Navbar bg="light" expand="lg" className="px-3 border-bottom" style={{minHeight: '56px'}}> {/* Added minHeight */}
          <Nav className="mx-auto justify-content-center" style={{alignItems: 'center'}}> {/* Added alignItems */}
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
        <Route path="/members/:id" element={<EachMember />} />
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
