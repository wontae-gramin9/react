import styles from "./Button.module.css";

export default function Button({ children, onClick, type }) {
  return (
    // type: object key
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {children}
    </button>
  );
}
