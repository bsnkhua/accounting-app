import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import styles from "./TaxSettings.module.css";

const TaxSettings = ({ taxes, setTaxes }) => {
  const [name, setName] = useState("");
  const [rate, setRate] = useState("");

  const addTax = () => {
    if (!name || !rate) return;
    setTaxes([...taxes, { id: uuidv4(), name, rate: parseFloat(rate) }]);
    setName("");
    setRate("");
  };

  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>Налаштування податків</h2>
      <div className={styles.row}>
        <input type="text" placeholder="Назва податку" value={name} onChange={(e) => setName(e.target.value)} className={styles.input} />
        <input type="number" placeholder="Ставка (%)" value={rate} onChange={(e) => setRate(e.target.value)} className={styles.input} />
        <button onClick={addTax} className={styles.addBtn}>Додати податок</button>
      </div>
      <ul className={styles.taxList}>
        {taxes.map((t) => (
          <li key={t.id}>{t.name}: {t.rate}%</li>
        ))}
      </ul>
    </div>
  );
};

export default TaxSettings;
