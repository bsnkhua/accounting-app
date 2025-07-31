import React, { useEffect, useState } from "react";
import styles from "./TaxModal.module.css";

const TaxModal = ({ employee, taxes, extras, onClose, onSave }) => {
  const [selected, setSelected] = useState([]);
  const [rate, setRate] = useState(employee.rate || 0);
  const [extraValues, setExtraValues] = useState(employee.extraBenefits || {});

  useEffect(() => {
    const initialTaxes =
      !employee.taxes || employee.taxes.length === 0
        ? taxes.map((t) => t.id)
        : employee.taxes;

    setSelected(initialTaxes);
    setExtraValues(employee.extraBenefits || {});
  }, [employee, taxes]);

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
      extraBenefits: extraValues,
    });
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>Податки для {employee.name}</h3>

        <div className={styles.field}>
          <label>Ставка</label>
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label>Застосувати податки:</label>
          <div className={styles.labelRow}>
            {taxes.map((t) => (
              <label key={t.id} className={styles.checkbox}>
                <span>
                  {t.name} ({t.rate}%)
                </span>
                <input
                  type="checkbox"
                  checked={selected.includes(t.id)}
                  onChange={() => toggle(t.id)}
                />
              </label>
            ))}
          </div>
        </div>

        <div className={styles.field}>
          <label>Додаткові нарахування:</label>
          <div className={styles.labelRow}>
            {extras.map((extra) => (
              <label key={extra.id} className={styles.checkbox}>
                <span>{extra.name}</span>
                <input
                  type="number"
                  value={extraValues[extra.id] || ""}
                  onChange={(e) =>
                    setExtraValues((prev) => ({
                      ...prev,
                      [extra.id]: parseFloat(e.target.value) || 0,
                    }))
                  }
                />
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
