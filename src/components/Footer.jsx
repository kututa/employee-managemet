import React from "react";
import styles from "./styles/Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Top Section: Brand & Quick Links */}
        <div className={styles.topSection}>
          <div className={styles.brandInfo}>
            <span className={styles.brandName}>Employee Management</span>
            <p className={styles.brandDesc}>
              Internal administrative dashboard for team operations, roles, and resource management.
            </p>
          </div>

          <div className={styles.linkGroup}>
            <a href="#privacy" className={styles.link}>Privacy Policy</a>
            <a href="#terms" className={styles.link}>Terms of Service</a>
            <a href="#support" className={styles.link}>Support</a>
          </div>
        </div>

        <div className={styles.divider}></div>

        {/* Bottom Section: Copyright & System Status */}
        <div className={styles.bottomSection}>
          <p className={styles.copyright}>
            © {currentYear} Employee Management System. All rights reserved.
          </p>

          <div className={styles.statusIndicator}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;