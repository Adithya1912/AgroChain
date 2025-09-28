// Login.jsx
import { useState } from "react";
import "./Login.css";

const roleColors = {
  farmer: "#2E7D32",      // Deep Green → crops, growth
  distributor: "#0277BD", // Strong Blue → trust, logistics
  retailer: "#FFB300",    // Vibrant Orange → trade, visibility
  consumer: "#6D4C41"     // Warm Brown → grounded, neutral
};

// Convert hex to rgba with adjustable alpha
const hexToRgba = (hex, alpha = 0.25) => {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0,2),16);
  const g = parseInt(h.substring(2,4),16);
  const b = parseInt(h.substring(4,6),16);
  return `rgba(${r},${g},${b},${alpha})`;
};

const Login = ({ onLogin, onRegister }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginRole, setLoginRole] = useState("");
  const [loginId, setLoginId] = useState("");
  const [registerRole, setRegisterRole] = useState("");
  const [registerName, setRegisterName] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginId.trim()) return alert("Please enter a valid ID");
    setIsLoading(true);
    try {
      await onLogin(loginId, loginRole);
    } catch {
      alert("Login failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!registerName.trim()) return alert("Please enter your full name");
    setIsLoading(true);
    try {
      await onRegister(registerName, registerRole);
    } catch {
      alert("Registration failed. Try again.");
    } finally {
      setIsLoading(false);
      setIsRegistering(false);
    }
  };

  const themeColor = isRegistering
    ? roleColors[registerRole]
    : roleColors[loginRole];

  const cardStyle = {
    border: `2px solid ${themeColor || "white"}`,
    background: themeColor
      ? hexToRgba(themeColor, 0.2)
      : "rgba(255,255,255,0.15)",
    boxShadow: themeColor
      ? `0 8px 32px ${hexToRgba(themeColor, 0.35)}`
      : "0 8px 32px rgba(0,0,0,0.3)"
  };

  return (
    <div className="overlay">
      <div className="glass-card" style={cardStyle}>
        <h2 className="component-title">
          {isRegistering ? "Register New User" : "AgroChain Login"}
        </h2>

        {isRegistering ? (
          <form onSubmit={handleRegisterSubmit}>
            <select
              value={registerRole}
              onChange={(e) => setRegisterRole(e.target.value)}
              required
            >
              <option value="">-- Select Role --</option>
              <option value="farmer">Farmer</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
              <option value="consumer">Consumer</option>
            </select>
            <input
              type="text"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              placeholder="Enter Your Full Name"
              required
            />
            <button
              type="submit"
              className="button-secondary"
              style={{ backgroundColor: themeColor || "#ff9800" }}
              disabled={isLoading}
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
            <button
              onClick={() => setIsRegistering(false)}
              className="back-to-login-btn"
              type="button"
            >
              ⬅ Back to Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit}>
            <select
              value={loginRole}
              onChange={(e) => setLoginRole(e.target.value)}
              required
            >
              <option value="">Select Role</option>
              <option value="farmer">Farmer</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
              <option value="consumer">Consumer</option>
            </select>
            <input
              type="text"
              value={loginId}
              onChange={(e) => setLoginId(e.target.value)}
              placeholder="Enter Your ID"
              required
            />
            <button
              type="submit"
              className="button-primary"
              style={{ backgroundColor: themeColor || "#28a745" }}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "Login"}
            </button>
            <button
              onClick={() => setIsRegistering(true)}
              className="button-secondary"
              style={{ backgroundColor: themeColor || "#ff9800" }}
              type="button"
            >
              Register a New Account
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
