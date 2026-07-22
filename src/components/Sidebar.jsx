import React, { useEffect, useState } from "react";
import styles from "./styles/Sidebar.module.css";

const NAV_ITEMS = [
  { href: "#dashboard", label: "Dashboard", icon: "📊" },
  { href: "#employees", label: "Employees", icon: "👥" },
  { href: "#departments", label: "Departments", icon: "🏢" },
  { href: "#analytics", label: "Analytics", icon: "📈" },
  { href: "#settings", label: "Settings", icon: "⚙️" },
];

function Sidebar({ onLogout }) {
  const [activeHash, setActiveHash] = useState(
    typeof window !== "undefined"
      ? window.location.hash || "#dashboard"
      : "#dashboard"
  );

  useEffect(() => {
    const handleHashChange = () =>
      setActiveHash(window.location.hash || "#dashboard");
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  return (
    <aside className={styles.sidebar} aria-label="Main Navigation">
      {/* Brand / Logo Section */}
      <div className={styles.brandContainer}>
        <a href="#dashboard" className={styles.brand}>
          <span className={styles.brandIcon}>⚡</span>
          <span className={styles.brandText}>Employee Hub</span>
        </a>
      </div>

      {/* Main Navigation Links */}
      <nav className={styles.navSection}>
        <span className={styles.sectionLabel}>Menu</span>
        <ul className={styles.links}>
          {NAV_ITEMS.map(({ href, label, icon }) => (
            <li key={href}>
              <a
                href={href}
                aria-current={activeHash === href ? "page" : undefined}
                className={`${styles.navLink} ${
                  activeHash === href ? styles.activeLink : ""
                }`}
              >
                <span className={styles.icon}>{icon}</span>
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* User / Logout Section at Bottom */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <div className={styles.avatar}>A</div>
          <div className={styles.userDetails}>
            <span className={styles.userName}>Admin User</span>
            <span className={styles.userRole}>System Administrator</span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className={styles.logoutBtn}
          title="Sign out of system"
        >
          <span className={styles.logoutIcon}>🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;