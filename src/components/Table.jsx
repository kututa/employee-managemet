import React, { useState } from "react";
import Data from "../components/Data";
import styles from "./styles/Table.module.css";

const employees = Data;

function EmployeeTable() {
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [modalMode, setModalMode] = useState(null); // 'view' | 'edit' | null

  // Toggle dropdown menu
  const toggleActionMenu = (id) => {
    setActiveMenuId(activeMenuId === id ? null : id);
  };

  // Action Handlers
  const handleView = (employee) => {
    setSelectedEmployee(employee);
    setModalMode("view");
    setActiveMenuId(null);
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalMode("edit");
    setActiveMenuId(null);
  };

  const handleAction = (actionType, employee) => {
    setActiveMenuId(null);
    alert(`${actionType} action triggered for ${employee.name}`);
    // Replace with your API calls or state updates
  };

  const closeModal = () => {
    setModalMode(null);
    setSelectedEmployee(null);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.employeeTable}>
        <thead>
          <tr>
            <th>Employee</th>
            <th>Role & Dept</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Skills</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              {/* Employee ID & Name */}
              <td>
                <div className={styles.primaryText}>{employee.name}</div>
                <div className={styles.subText}>ID: #{employee.id}</div>
              </td>

              {/* Position & Department */}
              <td>
                <div className={styles.primaryText}>{employee.position}</div>
                <div className={styles.subText}>{employee.department}</div>
              </td>

              {/* Contact Information */}
              <td>
                <div className={styles.primaryText}>{employee.email}</div>
                <div className={styles.subText}>{employee.phone}</div>
              </td>

              {/* Status Badge */}
              <td>
                <span
                  className={`${styles.badge} ${
                    employee.status === "Active"
                      ? styles.badgeActive
                      : styles.badgeInactive
                  }`}
                >
                  <span className={styles.dot}></span>
                  {employee.status}
                </span>
              </td>

              {/* Tag Pills for Skills */}
              <td>
                <div className={styles.tagContainer}>
                  {employee.skills.slice(0, 2).map((skill, index) => (
                    <span key={index} className={styles.tag}>
                      {skill}
                    </span>
                  ))}
                  {employee.skills.length > 2 && (
                    <span className={styles.moreTag}>
                      +{employee.skills.length - 2}
                    </span>
                  )}
                </div>
              </td>

              {/* Formatted Salary */}
              <td>
                <span className={styles.salaryText}>
                  ${employee.salary.toLocaleString()}
                </span>
              </td>

              {/* Combined Actions Menu */}
              <td className={styles.actionCell}>
                <div className={styles.actionGroup}>
                  <button
                    className={styles.viewBtn}
                    onClick={() => handleView(employee)}
                  >
                    View
                  </button>
                  <button
                    className={styles.editBtn}
                    onClick={() => handleEdit(employee)}
                  >
                    Edit
                  </button>

                  <div className={styles.dropdownWrapper}>
                    <button
                      className={styles.moreBtn}
                      onClick={() => toggleActionMenu(employee.id)}
                      title="More actions"
                    >
                      •••
                    </button>

                    {activeMenuId === employee.id && (
                      <div className={styles.dropdownMenu}>
                        <button
                          className={styles.menuItem}
                          onClick={() => handleAction("Promote", employee)}
                        >
                          Promote
                        </button>
                        <button
                          className={styles.menuItem}
                          onClick={() => handleAction("Demote", employee)}
                        >
                          Demote
                        </button>
                        <div className={styles.menuDivider}></div>
                        <button
                          className={`${styles.menuItem} ${styles.dangerText}`}
                          onClick={() => handleAction("Terminate", employee)}
                        >
                          Terminate
                        </button>
                        <button
                          className={`${styles.menuItem} ${styles.dangerText}`}
                          onClick={() => handleAction("Delete", employee)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal Popup Overlay */}
      {modalMode && selectedEmployee && (
        <div className={styles.modalBackdrop} onClick={closeModal}>
          <div
            className={styles.modalCard}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h2>
                {modalMode === "view" ? "Employee Profile" : "Edit Details"}
              </h2>
              <button className={styles.closeBtn} onClick={closeModal}>
                ✕
              </button>
            </div>

            <div className={styles.modalBody}>
              {modalMode === "view" ? (
                <div className={styles.detailGrid}>
                  <p>
                    <strong>Name:</strong> {selectedEmployee.name}
                  </p>
                  <p>
                    <strong>Position:</strong> {selectedEmployee.position}
                  </p>
                  <p>
                    <strong>Department:</strong> {selectedEmployee.department}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedEmployee.email}
                  </p>
                  <p>
                    <strong>Phone:</strong> {selectedEmployee.phone}
                  </p>
                  <p>
                    <strong>Hire Date:</strong> {selectedEmployee.hireDate}
                  </p>
                  <p>
                    <strong>Salary:</strong> $
                    {selectedEmployee.salary.toLocaleString()}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedEmployee.status}
                  </p>

                  {selectedEmployee.projects && (
                    <div>
                      <strong>Projects:</strong>
                      <ul>
                        {selectedEmployee.projects.map((proj, i) => (
                          <li key={i}>{proj}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedEmployee.performanceReviews && (
                    <div>
                      <strong>Performance Reviews:</strong>
                      {selectedEmployee.performanceReviews.map((rev, i) => (
                        <div key={i} className={styles.reviewItem}>
                          <small>
                            {rev.date} — Reviewer: {rev.reviewer}
                          </small>
                          <p>{rev.comments}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAction("Save Changes", selectedEmployee);
                    closeModal();
                  }}
                  className={styles.editForm}
                >
                  <label>
                    Name
                    <input
                      type="text"
                      defaultValue={selectedEmployee.name}
                      className={styles.inputField}
                    />
                  </label>
                  <label>
                    Position
                    <input
                      type="text"
                      defaultValue={selectedEmployee.position}
                      className={styles.inputField}
                    />
                  </label>
                  <label>
                    Department
                    <input
                      type="text"
                      defaultValue={selectedEmployee.department}
                      className={styles.inputField}
                    />
                  </label>
                  <label>
                    Salary
                    <input
                      type="number"
                      defaultValue={selectedEmployee.salary}
                      className={styles.inputField}
                    />
                  </label>

                  <div className={styles.modalFooter}>
                    <button
                      type="button"
                      className={styles.secondaryBtn}
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={styles.primaryBtn}>
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EmployeeTable;
