import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import styles from "./Homepage.module.css";

export default function Homepage() {
  return (
    <main className={styles.homepage}>
      <PageNav />

      <section>
        <h1>
          Green Cloud
          <br />
          Arequipa
        </h1>
        <h2>
        ECOSISTEMA VEGETAL SOSTENIBLE, MEDIANTE EL USO DE SENSORES GESTIONADOS POR PLACA ELECTRÓNICA PROGRAMABLE PARA CONCIENTIZAR EL CUIDADO DE PLANTAS AUTÓCTONAS DE LA REGIÓN AREQUIPA
        </h2>
        <Link to="/login" className="cta">
          Iniciar
        </Link>
      </section>
    </main>
  );
}
