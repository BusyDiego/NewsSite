import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Account.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

interface User {
  id: number;
  email: string;
  name?: string;
}

interface JwtPayload {
  sub: string;
  roles: string[];
  iat: number;
  exp: number;
}

const Account: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const userStr = localStorage.getItem("user");

    if (!token || !userStr) {
      navigate("/login");
      return;
    }

    try {
      const userData = JSON.parse(userStr);
      setUser(userData);

      const decoded = jwtDecode<JwtPayload>(token);
      setRoles(decoded.roles || []);
    } catch (error) {
      console.error("Error parsing user data:", error);
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!user) {
    return <div className="account-loading">Loading...</div>;
  }

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>Account</h1>
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back
        </button>
      </div>

      <div className="account-content">
        <div className="account-section">
          <h2>Profile Information</h2>
          <div className="info-group">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          {user.name && (
            <div className="info-group">
              <label>Name:</label>
              <span>{user.name}</span>
            </div>
          )}
          <div className="info-group">
            <label>User ID:</label>
            <span>{user.id}</span>
          </div>
        </div>

        <div className="account-section">
          <h2>Permissions</h2>
          <div className="roles-list">
            {roles.length > 0 ? (
              roles.map((role, index) => (
                <div key={index} className="role-badge">
                  {role.replace("ROLE_", "")}
                </div>
              ))
            ) : (
              <span className="no-roles">No special permissions</span>
            )}
          </div>
        </div>

        <div className="account-section">
          <h2>Actions</h2>
          <div className="action-buttons">
            <button className="edit-profile-btn">Edit Profile</button>
            <button className="change-password-btn">Change Password</button>
            <button>
              {" "}
              {token && <Link to="/bookmarks">My Bookmarks</Link>}
            </button>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
