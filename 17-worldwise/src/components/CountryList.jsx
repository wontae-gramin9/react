import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";

export default function CountryList({ cities, isLoading }) {
  if (isLoading) return <Spinner />;
  if (!cities.length) return <Message message="Add your first city" />;

  const countries = cities.reduce((acc, city) => {
    if (
      acc.some((obj) => {
        return obj.country === city.country;
      })
    ) {
      return acc;
    } else {
      return acc.concat([
        {
          country: city.country,
          emoji: city.emoji,
        },
      ]);
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country, idx) => (
        <CountryItem key={idx} country={country}></CountryItem>
      ))}
    </ul>
  );
}
