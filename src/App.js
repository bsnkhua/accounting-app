// App.js
import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import TaxSettings from "./components/TaxSettings";
import Sidebar from "./components/Sidebar";
import styles from "./App.module.css";

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [section, setSection] = useState("list");

  const addEmployee = (employee) => {
    setEmployees((prev) => [...prev, employee]);
  };

  const deleteEmployee = (id) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const updateEmployee = (updated) => {
    setEmployees((prev) =>
      prev.map((e) => (e.id === updated.id ? updated : e))
    );
  };

  return (
    <div className={styles.appWrapper}>
      <Sidebar setSection={setSection} selected={section} />
      <div className={styles.contentWrapper}>
        <h1 className={styles.title}>Зарплатна відомість школи</h1>

        {section === "form" && (
          <>
            <EmployeeList
              employees={employees}
              deleteEmployee={deleteEmployee}
              updateEmployee={updateEmployee}
              taxes={taxes}
              showDelete={true}
              simpleView={true}
            />
            <EmployeeForm addEmployee={addEmployee} />
          </>
        )}

        {section === "list" && (
          <EmployeeList
            employees={employees}
            deleteEmployee={() => {}}
            updateEmployee={updateEmployee}
            taxes={taxes}
            showDelete={false}
            simpleView={false}
          />
        )}

        {section === "taxes" && (
          <TaxSettings taxes={taxes} setTaxes={setTaxes} />
        )}
      </div>
    </div>
  );
};

export default App;
