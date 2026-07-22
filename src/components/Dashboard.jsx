import React from "react";
import EmployeeTable from "./Table.jsx";
import styles from "./styles/Dashboard.module.css";

export default function Dashboard() {
  return (
    <div className={styles.dashboardContainer}>
      <main className={styles.mainContent}>
        {/* Header with Title and Action Bar */}
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Employee Management</h1>
            <p className={styles.subtitle}>
              Manage team members, roles, and organizational performance.
            </p>
          </div>
          <div className={styles.actions}>
            <button className={styles.secondaryBtn}>Export CSV</button>
            <button className={styles.primaryBtn}>+ Add Employee</button>
          </div>
        </header>

        {/* Quick Metric Cards */}
        <section className={styles.metricsGrid}>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Total Employees</span>
            <span className={styles.metricValue}>128</span>
            <span className={styles.metricTrend}>+12% this month</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Active Now</span>
            <span className={styles.metricValue}>94</span>
            <span className={styles.metricTrendStatus}>73% online</span>
          </div>
          <div className={styles.metricCard}>
            <span className={styles.metricLabel}>Departments</span>
            <span className={styles.metricValue}>8</span>
            <span className={styles.metricSub}>Across 3 locations</span>
          </div>
        </section>

        {/* Main Table Wrapper */}
        <section className={styles.tableCard}>
          <EmployeeTable />
        </section>
      </main>
    </div>
  );
}