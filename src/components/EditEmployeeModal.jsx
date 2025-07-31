import React, { useState } from "react";
import styles from "./TaxModal.module.css";

const EditEmployeeModal = ({ employee, onClose, onSave }) => {
  const [name, setName] = useState(employee.name);
  const [position, setPosition] = useState(employee.position);
  const [code, setCode] = useState(employee.code || "");
  const [rate, setRate] = useState(employee.rate || 0);

  const handleSave = () => {
    onSave({ ...employee, name, position, code, rate: parseFloat(rate) });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Редагувати працівника</h3>

        <div className={styles.field}>
          <label>П.І.Б</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Посада</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Табельний номер</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Ставка</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className={styles.actions}>
          <button onClick={handleSave}>Зберегти</button>
          <button onClick={onClose}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default EditEmployeeModal;
