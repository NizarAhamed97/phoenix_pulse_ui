import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Form, Button, Card } from "react-bootstrap";
import Select from "react-select";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "../../assets/gymimage.jpg";
import logo from "../../assets/logo.jpeg";

const countryOptions = [
  { value: "IN", label: "🇮🇳 India" },
  { value: "US", label: "🇺🇸 USA" },
  { value: "GB", label: "🇬🇧 UK" },
  { value: "CA", label: "🇨🇦 Canada" },
  { value: "AU", label: "🇦🇺 Australia" },
  { value: "DE", label: "🇩🇪 Germany" },
  { value: "FR", label: "🇫🇷 France" },
  { value: "JP", label: "🇯🇵 Japan" },
  { value: "CN", label: "🇨🇳 China" },
  { value: "BR", label: "🇧🇷 Brazil" },
  { value: "ZA", label: "🇿🇦 South Africa" },
  { value: "NG", label: "🇳🇬 Nigeria" },
  // add more as needed
];

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    gymName: "",
    password: "",
    confirmPassword: "",
    country: "IN",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // react-select selected option object
  const selectedCountry = countryOptions.find(
    (c) => c.value === formData.country
  );
  // Add this helper function inside your component or outside:

  const isValidMobile = (mobile) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };


  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!isValidMobile(formData.mobile)) {
      setError("Mobile number must be exactly 10 digits and numeric only.");
      return;
    }
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      try {
        await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/signup`, {
          mobile: formData.mobile,
          gymName: formData.gymName,
          password: formData.password,
          country: formData.country,
        });
        alert("Signup successful. You can now login.");
        setIsSignUp(false);
        setFormData({ mobile: "", gymName: "", password: "", confirmPassword: "", country: "IN" });
      } catch (err) {
        console.error("Signup failed:", err.response?.data || err.message);
        setError("Signup failed. Please try again.");
      }
    } else {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/auth/login`, {
          mobile: formData.mobile,
          password: formData.password,
          country: formData.country,
        });

        const token = res.data.token;
        if (!token) throw new Error("No token received from server");

        const payload = JSON.parse(atob(token.split(".")[1]));
        const expiryTime = payload.exp * 1000;

        localStorage.setItem("token", token);
        localStorage.setItem("token_expiry", expiryTime.toString());
        localStorage.setItem("userId", payload.id);
        localStorage.setItem("username", payload.username);
        localStorage.setItem("gymName", payload.gymName);

        navigate("/dashboard");
      } catch (err) {
        console.error("Login failed:", err.response?.data || err.message);
        setError("Invalid mobile number or password. Please try again.");
      }
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Left Section */}
      <div
        style={{
          flex: 1,
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}
      >
        <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "40px", borderRadius: "10px" }}>
          <div className="text-center">
            <img src={logo} alt="Logo" style={{ width: "120px" }} />
            <h1 className="mt-4 fw-bold">Daily Fit</h1>
            <h4>Gym Management Software</h4>
            <p className="mt-3 text-light">
              Your fitness journey starts here. <br /> Manage members, track attendance, and boost revenue effortlessly.
            </p>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f4f4f4",
        }}
      >
        <Card style={{ width: "100%", maxWidth: "400px", padding: "20px" }}>
          <Card.Body>
            <h3 className="text-center mb-4">{isSignUp ? "Sign Up" : "Login"}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <Form onSubmit={handleSubmit}>
              {/* Country selector + Mobile side by side */}
              <Form.Group className="mb-3 d-flex align-items-center">
                <div style={{ width: 120, marginRight: 10 }}>
                  <Select
                    options={countryOptions}
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    isSearchable={false}
                    styles={{
                      control: (base) => ({
                        ...base,
                        minHeight: 38,
                        height: 38,
                        fontSize: 14,
                      }),
                      dropdownIndicator: (base) => ({
                        ...base,
                        padding: 4,
                      }),
                      indicatorsContainer: (base) => ({
                        ...base,
                        height: 38,
                      }),
                      valueContainer: (base) => ({
                        ...base,
                        padding: "0 6px",
                      }),
                    }}
                    menuPlacement="auto"
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Form.Control
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="Mobile Number"
                    required
                    style={{ fontSize: 14, height: 38 }}
                  />
                </div>
              </Form.Group>

              {isSignUp && (
                <Form.Group className="mb-4">
                  <Form.Label>Gym Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="gymName"
                    value={formData.gymName}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              {isSignUp && (
                <Form.Group className="mb-4">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              )}

              <Button variant="success" type="submit" className="w-100 mb-3">
                {isSignUp ? "Create Account" : "Login"}
              </Button>
              <div className="text-center">
                {isSignUp ? (
                  <span>
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      onClick={() => setIsSignUp(false)}
                      className="p-0"
                    >
                      Login
                    </Button>
                  </span>
                ) : (
                  <span>
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      onClick={() => setIsSignUp(true)}
                      className="p-0"
                    >
                      Sign Up
                    </Button>
                  </span>
                )}
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login;
