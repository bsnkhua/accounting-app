import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({ setSection, selected }) => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Меню</h2>
      <ul className={styles.menu}>
        <li
          className={selected === "list" ? styles.active : ""}
          onClick={() => setSection("list")}
        >
          📋 Нарахування
        </li>
        <li
          className={selected === "form" ? styles.active : ""}
          onClick={() => setSection("form")}
        >
          👥 Працівники
        </li>
        <li
          className={selected === "taxes" ? styles.active : ""}
          onClick={() => setSection("taxes")}
        >
          💰 Податки
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
