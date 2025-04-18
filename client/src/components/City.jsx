import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import { useCities } from "../contexts/CitiesContext";
import { useEffect } from "react";
import Spinner from "./Spinner";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
  const { id } = useParams();

  const { getCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      getCity(id);
    },
    [id, getCity]
  );

  const { name, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>Nombre Colegio</h6>
        <h3>
          <span>{emoji}</span> {name}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>Registro {name} en</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Comentarios</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Contacto</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${name}`}
          target="_blank"
          rel="noreferrer"
        >
           página web  {name} &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
