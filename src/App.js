// App.js
import React, { useState, useEffect } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";
import TaxSettings from "./components/TaxSettings";
import ExtraBenefits from "./components/ExtraBenefits";
import Sidebar from "./components/Sidebar";
import styles from "./App.module.css";

const App = () => {
  const [employees, setEmployees] = useState(() => {
    const stored = localStorage.getItem("employees");
    return stored ? JSON.parse(stored) : [];
  });

  const [taxes, setTaxes] = useState(() => {
    const stored = localStorage.getItem("taxes");
    return stored ? JSON.parse(stored) : [];
  });

  const [extras, setExtras] = useState(() => {
    const stored = localStorage.getItem("extras");
    return stored ? JSON.parse(stored) : [];
  });

  const [section, setSection] = useState("home");

  useEffect(() => {
    localStorage.setItem("employees", JSON.stringify(employees));
  }, [employees]);

  useEffect(() => {
    localStorage.setItem("taxes", JSON.stringify(taxes));
  }, [taxes]);

  useEffect(() => {
    localStorage.setItem("extras", JSON.stringify(extras));
  }, [extras]);

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

        {section === "home" && (
          <div className={styles.homePage}>
            <h2>Ласкаво просимо!</h2>
            <p>Сьогодні: {new Date().toLocaleDateString()}</p>
          </div>
        )}

        {section === "form" && (
          <>
            <EmployeeList
              employees={employees}
              deleteEmployee={deleteEmployee}
              updateEmployee={updateEmployee}
              taxes={taxes}
              extras={extras}
              showDelete={true}
              simpleView={true}
            />
            <EmployeeForm addEmployee={addEmployee} taxes={taxes} />
          </>
        )}

        {section === "list" && (
          <EmployeeList
            employees={employees}
            deleteEmployee={() => {}}
            updateEmployee={updateEmployee}
            taxes={taxes}
            extras={extras}
            showDelete={false}
            simpleView={false}
          />
        )}

        {section === "taxes" && (
          <TaxSettings taxes={taxes} setTaxes={setTaxes} />
        )}

        {section === "extras" && (
          <ExtraBenefits extras={extras} setExtras={setExtras} />
        )}
      </div>
    </div>
  );
};

export default App;
