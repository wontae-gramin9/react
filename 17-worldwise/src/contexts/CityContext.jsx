import { createContext, useCallback } from "react";
import { useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:9000";
const CityContext = createContext();

const initialState = {
  cities: [],
  loading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded": // Naming convention: setter보다는 event로 이름짓기
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function CityProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        if (!res.ok) throw new Error("/cities resource 문제");
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: error });
      }
    };

    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (!res.ok) throw new Error("/cities/:id resource 문제");
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (e) {
        dispatch({ type: "rejected", payload: e });
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const header = new Headers({ "content-type": "application/json" });
      const res = await fetch(`${BASE_URL}/cities`, {
        header,
        method: "POST",
        body: JSON.stringify(newCity),
      });
      if (!res.ok) throw new Error("create 문제");
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (e) {
      dispatch({ type: "rejected", payload: e });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const header = new Headers({ "content-type": "application/json" });
      await fetch(`${BASE_URL}/cities`, {
        header,
        method: "DELETE",
      });
      dispatch({ type: "city/deleted", payload: id });
    } catch (e) {
      dispatch({ type: "rejected", payload: e });
    }
  }

  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,

        getCity,
        createCity,
        deleteCity,
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
