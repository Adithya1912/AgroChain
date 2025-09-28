import React from 'react';
// Note: We are using the styles from your index.css file for the navbar
// Make sure you have the updated CSS from previous messages.

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">AgroChain</div>

      {/* The navigation links have been removed from here */}

      <div className="navbar-user">
        <span>Welcome, {user.name}</span>
        <button className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;