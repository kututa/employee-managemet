import React, { useState } from "react";
import Dashboard from "./Dashboard.jsx";
import Sidebar from "./Sidebar.jsx";
import Footer from "./Footer.jsx";
import Login from "./login.jsx";

export default function AuthWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAdminAuth") === "true";
  });

  const handleLoginSuccess = () => {
    localStorage.setItem("isAdminAuth", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuth");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onLogout={handleLogout} />
      <div style={{ marginLeft: "260px", flexGrow: 1, minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Dashboard />
        <Footer />
      </div>
    </div>
  );
}