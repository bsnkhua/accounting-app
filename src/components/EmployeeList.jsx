import React, { useState } from "react";
import TaxModal from "./TaxModal";
import EditEmployeeModal from "./EditEmployeeModal";
import styles from "./EmployeeList.module.css";

const EmployeeList = ({
  employees,
  deleteEmployee,
  updateEmployee,
  taxes,
  extras,
  showDelete,
  simpleView,
}) => {
  const [modalEmployee, setModalEmployee] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const calculateNet = (emp) => {
    const extraSum = Object.values(emp.extraBenefits || {}).reduce(
      (acc, val) => acc + val,
      0
    );
    const gross = emp.rate + extraSum;

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
            <th>П.І.Б</th>
            {!simpleView && (
              <>
                <th>Нараховано всього</th>
                <th>Утримано всього</th>
                <th>Дохід</th>
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
              {!simpleView && (
                <>
                  <td>
                    {(() => {
                      const extras = Object.values(
                        emp.extraBenefits || {}
                      ).reduce((sum, val) => sum + val, 0);
                      return (emp.rate + extras).toFixed(2);
                    })()}
                  </td>
                  <td>
                    {(() => {
                      const extras = Object.values(
                        emp.extraBenefits || {}
                      ).reduce((sum, val) => sum + val, 0);
                      const gross = emp.rate + extras;
                      const taxSum = emp.taxes?.reduce((sum, id) => {
                        const tax = taxes.find((t) => t.id === id);
                        return tax ? sum + (gross * tax.rate) / 100 : sum;
                      }, 0);
                      return taxSum?.toFixed(2);
                    })()}
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
          extras={extras}
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
