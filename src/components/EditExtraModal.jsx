// EditExtraModal.jsx
import React, { useState } from "react";
import styles from "./TaxModal.module.css"; // можно переиспользовать стили

const EditExtraModal = ({ item, onClose, onSave }) => {
  const [name, setName] = useState(item.name);

  const handleSave = () => {
    onSave({ ...item, name });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Редагувати нарахування</h3>
        <div className={styles.field}>
          <label>Назва</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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

export default EditExtraModal;
