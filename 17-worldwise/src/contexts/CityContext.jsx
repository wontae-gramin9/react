import { createContext } from "react";
import { useState, useContext, useEffect } from "react";

const BASE_URL = "http://localhost:9000";
const CityContext = createContext();

function CityProvider({ children }) {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("/cities resource 문제");
        const data = await res.json();
        setCities(data);
      } catch (error) {
        alert("/cities 네트워크/서버 문제:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      if (!res.ok) throw new Error("/cities/:id resource 문제");
      const data = await res.json();
      setCurrentCity(data);
    } catch (e) {
      alert("/cities/:id 네트워크/서버 문제:", e);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  if (context === undefined)
    throw new Error("CityContext was used outside the CityProvider");
  return context;
}

export { useCity, CityProvider };
