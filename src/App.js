import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate
} from "react-router-dom";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

// Pages
import Dashboard from "./pages/dashboard/Dashboard";
import AllMembers from "./pages/members/AllMembers";
import AddMember from "./pages/members/AddMember";
import EachMember from "./pages/members/EachMember";
import AllStaff from "./pages/staff/AllStaff";
import AddStaff from "./pages/staff/AddStaff";
import MembersAttendance from "./pages/attendance/MembersAttendance";
import StaffAttendance from "./pages/attendance/StaffAttendance";
import MemberLogin from "./pages/MemberLogin";
import Login from "./pages/auth/Login";

// Auth utils
import { isAuthenticated } from "./utils/auth";

// Protected Route
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

// Admin Layout
function AdminLayout({ children, hideNavTabs = false }) {
  const username = localStorage.getItem("gymName");

  return (
    <>
      {/* Top Logo Bar */}
      <Navbar style={{ backgroundColor: "#e8f5e9", padding: "12px 24px" }} expand="lg">
        <Container fluid className="d-flex justify-content-between align-items-center">
          {/* Left - Logo and Title */}
          <div className="d-flex align-items-center" style={{ gap: "12px" }}>
            <img src="/logo.jpeg" alt="Logo" style={{ height: "50px", width: "50px", borderRadius: "8px" }} />
            <div className="d-flex flex-column justify-content-center" style={{ lineHeight: "1.2" }}>
              <span style={{ fontSize: "20px", color: "#388e3c", fontWeight: 400 }}>
                Gym Management Software
              </span>
              <span style={{ fontSize: "13px", color: "#1b5e20", fontWeight: "bold", textAlign: "center" }}>
                Daily Fit
              </span>
            </div>
          </div>


          {/* Right - User info + Logout */}
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: "14px", color: "#388e3c", fontWeight: 500 }}>
              {username || "Admin"}
            </span>
            <button
              className="btn btn-sm btn-outline-danger"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("token_expiry");
                localStorage.removeItem("username");
                window.location.href = "/login";
              }}
            >
              Logout
            </button>
          </div>
        </Container>
      </Navbar>

      {/* Nav Tabs */}
      {!hideNavTabs && (
        <Navbar bg="light" expand="lg" className="px-3 border-bottom" style={{ minHeight: "56px" }}>
          <Nav className="mx-auto justify-content-center" style={{ alignItems: "center" }}>
            <Nav.Link as={Link} to="/dashboard" className="px-4 fw-bold text-dark">
              Dashboard
            </Nav.Link>
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
      )}

      {/* Page Content */}
      <div className="container mt-4">{children}</div>
    </>
  );
}

// Routes
function AppRoutes() {
  const location = useLocation();

  if (location.pathname === "/login") {
    return <Login />;
  }

  if (location.pathname === "/memberlogin") {
    return (
      <AdminLayout hideNavTabs={true}>
        <MemberLogin />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Routes>
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/members/all" element={<ProtectedRoute><AllMembers /></ProtectedRoute>} />
        <Route path="/members/add" element={<ProtectedRoute><AddMember /></ProtectedRoute>} />
        <Route path="/members/:id" element={<ProtectedRoute><EachMember /></ProtectedRoute>} />
        <Route path="/staff/all" element={<ProtectedRoute><AllStaff /></ProtectedRoute>} />
        <Route path="/staff/add" element={<ProtectedRoute><AddStaff /></ProtectedRoute>} />
        <Route path="/attendance/members" element={<ProtectedRoute><MembersAttendance /></ProtectedRoute>} />
        <Route path="/attendance/staff" element={<ProtectedRoute><StaffAttendance /></ProtectedRoute>} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </AdminLayout>
  );
}

// Main App
function App() {
  useEffect(() => {
    const expiry = localStorage.getItem("token_expiry");
    if (expiry && Date.now() > parseInt(expiry, 10)) {
      localStorage.removeItem("token");
      localStorage.removeItem("token_expiry");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
  }, []);

  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
