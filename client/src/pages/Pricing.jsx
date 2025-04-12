// Uses the same styles as Product
import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <div>
          <h2>
            USMP
            <br />
            Especialistas
          </h2>
          <p>
          Investigadores, conformado por docentes y una alumna de la Escuela Profesional de Ingeniería de Computación y Sistemas de la Universidad de San Martín de Porres – Filial Sur ha sido seleccionado para recibir el Fondo de Investigación Aplicada del CONCYTEC por un monto de 100 mil soles para el proyecto “GREEN CLOUD: ECOSISTEMA VEGETAL SOSTENIBLE”. Este proyecto se destaca por su enfoque en la educación ambiental y el uso de tecnologías avanzadas.
          </p>
        </div>
        <img src="img-2.jpg" alt="overview of a large city with skyscrapers" />
      </section>
    </main>
  );
}
