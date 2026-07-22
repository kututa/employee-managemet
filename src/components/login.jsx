import React, { useState } from "react";
import styles from "./styles/Login.module.css";

export default function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Admin Credentials
  const ADMIN_USER = "admin";
  const ADMIN_PASS = "admin123";

  // Fixed function name (no space between handle and Submit)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setError("");
      onLoginSuccess();
    } else {
      setError("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Brand / Header */}
        <div className={styles.brandHeader}>
          <div className={styles.logoBadge}>
            <span className={styles.logoDot}></span>
          </div>
          <h1 className={styles.title}>Admin Portal</h1>
          <p className={styles.subtitle}>
            Sign in to access Employee Management
          </p>
        </div>

        {/* Error Alert */}
        {error && <div className={styles.errorMsg}>{error}</div>}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              placeholder="Enter admin username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.inputField}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.inputField}
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className={styles.loginBtn}>
            Sign In to Dashboard
          </button>
        </form>

        {/* Footer Note */}
        <div className={styles.cardFooter}>
          <span>Protected Area • Authorized Personnel Only</span>
        </div>
      </div>
    </div>
  );
}