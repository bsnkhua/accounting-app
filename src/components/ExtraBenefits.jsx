// ExtraBenefits.jsx
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import EditExtraModal from "./EditExtraModal";
import styles from "./TaxSettings.module.css";

const ExtraBenefits = ({ extras, setExtras }) => {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);

  const addExtra = () => {
    if (!name) return;
    setExtras([...extras, { id: uuidv4(), name }]);
    setName("");
  };

  const updateExtra = (updated) => {
    setExtras((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
  };

  return (
    <div className={styles.block}>
      <h2 className={styles.heading}>Додаткові нарахування</h2>

      <div className={styles.row}>
        <input
          type="text"
          placeholder="Назва нарахування"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
        />
        <button onClick={addExtra} className={styles.addBtn}>
          Додати
        </button>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Назва</th>
          </tr>
        </thead>
        <tbody>
          {extras.map((item) => (
            <tr key={item.id} onClick={() => setEditing(item)}>
              <td>{item.name}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {editing && (
        <EditExtraModal
          item={editing}
          onClose={() => setEditing(null)}
          onSave={updateExtra}
        />
      )}
    </div>
  );
};

export default ExtraBenefits;
