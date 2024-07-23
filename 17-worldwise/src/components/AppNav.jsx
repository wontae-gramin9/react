import styles from "./AppNav.module.css";
import { NavLink } from "react-router-dom";

export default function AppNav() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          {/* 어떻게 nested routes인 것을 알지?
          앞에 /를 붙이면, root부터 시작한다 → /cities
          앞에 /를 붙이지 않으면, 바로 뒤에 붙는다 → /app/cities 
          */}
          <NavLink to="cities">Cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
}
