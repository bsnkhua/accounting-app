// EmployeeForm.jsx
import React, { useState } from "react";
import styles from "./EmployeeForm.module.css";

const EmployeeForm = ({ addEmployee, taxes }) => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [code, setCode] = useState("");
  const [rate, setRate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !position || !code || !rate) return;
    addEmployee({
      id: Date.now(),
      name,
      position,
      code,
      rate: parseFloat(rate),
      hours: 0,
      taxes: taxes.map((t) => t.id), // <== включаем все налоги по умолчанию
    });
    setName("");
    setPosition("");
    setCode("");
    setRate("");
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>Додати працівника</h2>

      <label>П.І.Б</label>
      <input
        type="text"
        placeholder="П.І.Б"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>Посада</label>
      <input
        type="text"
        placeholder="Посада"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />

      <label>Табельний номер</label>
      <input
        type="text"
        placeholder="Табельний номер"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />

      <label>Ставка</label>
      <input
        type="number"
        placeholder="Ставка"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />

      <button type="submit">Додати</button>
    </form>
  );
};

export default EmployeeForm;
