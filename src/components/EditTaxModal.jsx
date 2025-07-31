// EditTaxModal.jsx
import React, { useState } from "react";
import styles from "./TaxModal.module.css";

const EditTaxModal = ({ tax, onClose, onSave }) => {
  const [name, setName] = useState(tax.name);
  const [rate, setRate] = useState(tax.rate);

  const handleSave = () => {
    onSave({ ...tax, name, rate: parseFloat(rate) });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Редагувати податок</h3>

        <div className={styles.field}>
          <label>Назва</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Ставка (%)</label>
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

export default EditTaxModal;
