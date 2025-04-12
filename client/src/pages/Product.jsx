import styles from "./Product.module.css";
import PageNav from "../components/PageNav";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />

      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>Propuesta.</h2>
          <p>
          El proyecto “GREEN CLOUD” busca mejorar la conexión de los niños con su entorno natural a través de una plataforma tecnológica que integra la gamificación con Internet de las Cosas (IoT). Esta iniciativa surge como respuesta a la urgente necesidad de fortalecer la educación ambiental en el país, un requisito legal y un pilar esencial para el desarrollo sostenible de la nación.
          </p>
          <p>
          GREEN CLOUD no solo  permitira transformar la educación ambiental, sino también sentar las bases para un futuro más verde y sostenible para las generaciones venideras.          </p>
        </div>
      </section>
    </main>
  );
}
