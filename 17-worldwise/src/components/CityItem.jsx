import { useCity } from "../contexts/CityContext";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

export default function CityItem({ city }) {
  const { currenctCity } = useCity();
  const { cityName, emoji, date, id, position } = city;
  // css className에 --가 있기 때문에, dot notation이 아니라
  // square bracket으로 가져와야 한다
  console.log("fds", currenctCity);
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currenctCity !== undefined
            ? currenctCity.id === id
              ? styles["cityItem--active"]
              : ""
            : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn}>&times;</button>
      </Link>
    </li>
  );
}

// currenctCity && currenctCity.id === id
// ? styles["cityItem--active"]
// : ""
