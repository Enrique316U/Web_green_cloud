import { NavLink } from "react-router-dom";
import Logo from "./Logo";
import styles from "./PageNav.module.css";

function PageNav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <ul>
        <li>
          <NavLink to="/pricing">Equipo</NavLink>
        </li>
        <li>
          <NavLink to="/product">Propuesta</NavLink>
        </li>
        <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Ingresar
          </NavLink>
          <NavLink to="/register" className={styles.ctaLink}>
            Registrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;
