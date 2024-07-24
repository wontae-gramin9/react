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
  const { currenctCity, deleteCity } = useCity();
  const { cityName, emoji, date, id, position } = city;
  function handleClick(e) {
    // Link has the onClick function which navigates us
    // With e.preventDefault(), the onClick function of the LINK will be invalid.
    // That's why, technically, we don't have to do e.stopPropagation()

    e.preventDefault();
    deleteCity(id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          currenctCity !== undefined
            ? currenctCity.id === id
              ? // css className에 --가 있기 때문에, dot notation이 아니라
                // square bracket으로 가져와야 한다
                styles["cityItem--active"]
              : ""
            : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        {/* 리액트에서는 이벤트버블링이 없고
        root element의 fiber tree에 
        같은 타입의 이벤트에 하나의 거대한 이벤트리스너 안에 
        모든 element의 handle로직이 번들되어 들어간다.
        */}
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}
