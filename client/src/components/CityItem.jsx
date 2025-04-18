import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
// import { useEffect, useState } from "react";
const formatDate = (date) => {
  // Check if the date argument is valid
  if (!date) {
    return "Invalid Date";
  }

  // Create a new Date object from the date argument
  const dateObject = new Date(date);

  // Check if the dateObject is a valid Date object
  if (isNaN(dateObject.getTime())) {
    return "Invalid Date";
  }

  return new Intl.DateTimeFormat("es", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { name, emoji, date, id, position } = city;
  // const { lat position.lat, lng } = position;

  // Ensure position is defined before destructuring lat and lng
  const lat = position?.lat;
  const lng = position?.lng;

  console.log("City object:", city);
  console.log("Position object:", position);

  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`/app/cities/${id}?lat=${lat}&lng=${lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{name}</h3>
        <time className={styles.date}>({formatDate(date)})</time>

        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
