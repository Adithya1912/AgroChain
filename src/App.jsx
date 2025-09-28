import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar"; // <-- Import Navbar
import FarmerDashboard from "./components/FarmerDashboard";
import DistributorDashboard from "./components/DistributorDashboard";
import RetailerDashboard from "./components/RetailerDashboard";
import ConsumerDashboard from "./components/ConsumerDashboard";
import Login from "./components/Login";
import { loginUser, registerUser } from "./api";

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const storedUser = localStorage.getItem("agrichain_user");
  //   if (storedUser) {
  //     setUser(JSON.parse(storedUser));
  //   }
  // }, []);

  const handleLogin = async (publicId, role) => {
    try {
      const userData = await loginUser(publicId, role);
      if (userData.error) {
        alert(userData.error);
        return;
      }
      localStorage.setItem("agrichain_user", JSON.stringify(userData));
      setUser(userData);
      navigate(`/${userData.role}`);
    } catch (err) {
      alert("Login failed. Please check the ID and role.");
    }
  };

  const handleRegister = async (name, role) => {
     try {
      const newUser = await registerUser(name, role);
      if (newUser.error) {
          alert(newUser.error);
          return;
      }
      alert(`Registration successful!\nYour ID is: ${newUser.public_id}\nPlease save it and use it to log in.`);
    } catch (err) {
       alert("Registration failed.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("agrichain_user");
    setUser(null);
    navigate("/login");
  };

  const Dashboard = () => {
    if (!user) return <Navigate to="/login" />;
    switch (user.role) {
      case "farmer":
        return <FarmerDashboard user={user} onLogout={handleLogout} />;
      case "distributor":
        return <DistributorDashboard user={user} onLogout={handleLogout} />;
      case "retailer":
        return <RetailerDashboard user={user} onLogout={handleLogout} />;
      case "consumer":
        return <ConsumerDashboard user={user} onLogout={handleLogout} />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <>
      {/* This will now show the Navbar on every page IF a user is logged in */}
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <main>
        <Routes>
          <Route path="/login" element={!user ? <Login onLogin={handleLogin} onRegister={handleRegister} /> : <Navigate to={`/${user.role}`} />} />
          <Route path="/farmer" element={<Dashboard />} />
          <Route path="/distributor" element={<Dashboard />} />
          <Route path="/retailer" element={<Dashboard />} />
          <Route path="/consumer" element={<Dashboard />} />
          <Route path="*" element={<Navigate to={user ? `/${user.role}` : "/login"} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;