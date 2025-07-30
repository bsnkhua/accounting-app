import React from "react";
import styles from "./TaxModal.module.css";

const TaxModal = ({ employee, taxes, onClose, onSave }) => {
  const [selected, setSelected] = React.useState(employee.taxes || []);
  const [rate, setRate] = React.useState(employee.rate || 0);
  const [hours, setHours] = React.useState(employee.hours || 0);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  const handleSave = () => {
    onSave({
      ...employee,
      taxes: selected,
      rate: parseFloat(rate),
      hours: parseFloat(hours),
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Податки для {employee.name}</h3>

        <div className={styles.field}>
          <label>Ставка за годину</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Кількість годин</label>
          <input
            type="number"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Застосувати податки</label>
          <div>
            {taxes.map((t) => (
              <label key={t.id} className={styles.checkbox}>
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={() => toggle(t.id)}
                />
                {t.name} ({t.rate}%)
              </label>
            ))}
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={handleSave}>Зберегти</button>
          <button onClick={onClose}>Скасувати</button>
        </div>
      </div>
    </div>
  );
};

export default TaxModal;
