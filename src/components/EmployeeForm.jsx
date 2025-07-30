// EmployeeForm.jsx
import React, { useState } from "react";
import styles from "./EmployeeForm.module.css";

const EmployeeForm = ({ addEmployee }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [code, setCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !position || !code) return;
    addEmployee({
      id: Date.now(),
      name,
      position,
      code,
      rate: 0,
      hours: 0,
      taxes: [],
    });
    setName("");
    setPosition("");
    setCode("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Додати працівника</h2>
      <input
        type="text"
        placeholder="П.І.Б"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Посада"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Табельний номер"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">Додати</button>
    </form>
  );
};

export default EmployeeForm;
