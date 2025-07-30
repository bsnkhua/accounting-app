import React, { useState } from "react";
import TaxModal from "./TaxModal";
import EditEmployeeModal from "./EditEmployeeModal";
import styles from "./EmployeeList.module.css";

const EmployeeList = ({ employees, deleteEmployee, updateEmployee, taxes, showDelete, simpleView }) => {
  const [modalEmployee, setModalEmployee] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const calculateNet = (emp) => {
    const gross = emp.rate * emp.hours;
    const taxSum = emp.taxes?.reduce((sum, id) => {
      const tax = taxes.find((t) => t.id === id);
      return tax ? sum + (gross * tax.rate) / 100 : sum;
    }, 0);
    return (gross - taxSum).toFixed(2);
  };

  return (
    <div className={styles.listBlock}>
      <h2 className={styles.heading}>Список працівників</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ім’я</th>
            <th>Посада</th>
            {!simpleView && (
              <>
                <th>Брутто</th>
                <th>Податки</th>
                <th>Нетто</th>
              </>
            )}
            {showDelete && <th>Дії</th>}
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr
              key={emp.id}
              onClick={() => {
                simpleView ? setEditModal(emp) : setModalEmployee(emp);
              }}
            >
              <td>{emp.name}</td>
              <td>{emp.position}</td>
              {!simpleView && (
                <>
                  <td>{(emp.rate * emp.hours).toFixed(2)}</td>
                  <td>
                    {emp.taxes?.map((id) => {
                      const tax = taxes.find((t) => t.id === id);
                      return tax ? `${tax.name} (${tax.rate}%) ` : "";
                    })}
                  </td>
                  <td>{calculateNet(emp)}</td>
                </>
              )}
              {showDelete && (
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteEmployee(emp.id);
                    }}
                    className={styles.deleteBtn}
                  >
                    Видалити
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {modalEmployee && (
        <TaxModal
          employee={modalEmployee}
          taxes={taxes}
          onClose={() => setModalEmployee(null)}
          onSave={updateEmployee}
        />
      )}

      {editModal && (
        <EditEmployeeModal
          employee={editModal}
          onClose={() => setEditModal(null)}
          onSave={updateEmployee}
        />
      )}
    </div>
  );
};

export default EmployeeList;
