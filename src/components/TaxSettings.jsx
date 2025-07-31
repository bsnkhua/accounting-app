// TaxSettings.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditTaxModal from "./EditTaxModal";
import styles from "./TaxSettings.module.css";

const TaxSettings = ({ taxes, setTaxes }) => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");
  const [editingTax, setEditingTax] = useState(null);

  const addTax = () => {
    if (!name || !rate) return;
    setTaxes([...taxes, { id: uuidv4(), name, rate: parseFloat(rate) }]);
    setName("");
    setRate("");
  };

  const updateTax = (updated) => {
    setTaxes((prev) => prev.map((t) => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>Налаштування податків</h2>

      <div className={styles.row}>
        <input
          type="text"
          placeholder="Назва податку"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Ставка (%)"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className={styles.input}
        />
        <button onClick={addTax} className={styles.addBtn}>
          Додати податок
        </button>
      </div>

      <h3 className={styles.heading}>Список податків</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>
            <th>Ставка (%)</th>
          </tr>
        </thead>
        <tbody>
          {taxes.map((tax) => (
            <tr key={tax.id} onClick={() => setEditingTax(tax)}>
              <td>{tax.name}</td>
              <td>{tax.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingTax && (
        <EditTaxModal
          tax={editingTax}
          onClose={() => setEditingTax(null)}
          onSave={updateTax}
        />
      )}
    </div>
  );
};

export default TaxSettings;
