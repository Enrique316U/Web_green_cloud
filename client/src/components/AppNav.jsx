import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <nav className={styles.nav}>
      Navegación
      <ul>
        <li>
          <NavLink to="cities">Colegios:</NavLink>
        </li>
        <li>
          <NavLink to="countries">Distritos</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNav;
