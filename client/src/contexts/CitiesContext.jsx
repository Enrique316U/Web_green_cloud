import {
  createContext,
  useEffect,
  useContext,
  useReducer,
  useCallback,
} from "react";

const BASE_URL = "http://localhost:1337";

const CitiesContext = createContext();

let initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    case "rejected":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };

    case "updateInitialState":
      return {
        ...state,
        ...action.payload,
      };

    default:
      throw new Error("Unknown action type:");
  }
}

function CitiesProvider({ children, onLogin }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const fetchCities = useCallback(async () => {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/app/cities`, {
        method: "GET",
        credentials: "include", // Include cookies in the request
      });
      console.log("Response received:", res);

      if (!res.ok) {
        throw new Error("Failed to fetch cities");
      }

      const data = await res.json();
      console.log("Data received:", data);

      let cities = data;
      console.log("Cities extracted:", cities);

      // Use map to execute a function for each city
      const position = cities.map((city) => {
        console.log(
          "Grabing Cities from fetch, CitiesContext component: ",
          city
        );
        return city.position; // Return the position object of each city
      });
      console.log("Positions extracted:", position);
      dispatch({ type: "cities/loaded", payload: data });
    } catch (error) {
      console.error("Error fetching cities:", error); // Log the error message
      dispatch({
        type: "rejected",
        payload: "There was an error loading cities..." + error.message,
      });
    }
  }, []);

  useEffect(() => {
    // Fetch cities only if onLogin is called
    if (onLogin) {
      fetchCities(); // Call fetchCities when onLogin is called
    }
  }, [onLogin, fetchCities]);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const cityRes = await fetch(`${BASE_URL}/app/cities/${id}`, {
          credentials: "include", // Include cookies in the request
        });
        if (!cityRes.ok) {
          throw new Error("Failed to fetch city data");
        }
        const cityData = await cityRes.json();

        dispatch({ type: "city/loaded", payload: cityData });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: error.message || "There was an error loading the city...",
        });
      }
    },
    [currentCity.id, dispatch]
  );

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      // Ensure the new city data includes all required fields
      if (
        !newCity.name ||
        !newCity.country ||
        !newCity.emoji ||
        !newCity.date ||
        newCity.id === undefined ||
        !newCity.position ||
        newCity.position.lat === undefined ||
        newCity.position.lng === undefined
      ) {
        throw new Error("Invalid city data structure");
      }

      console.log("Creating city with data:", newCity);

      const res = await fetch(`${BASE_URL}/app/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Include cookies in the request
      });
      if (!res.ok) {
        throw new Error("Failed to create city data");
      }
      const data = await res.json();
      console.log("City created successfully:", data);
      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({
        type: "rejected",
        payload: error.message || "There was an error creating the city...",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/app/cities/${id}`, {
        method: "DELETE",
        credentials: "include", // Include cookies in the request
      });

      dispatch({ type: "city/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the city...",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
        error,
        fetchCities,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the CitiesProvider");
  return context;
}
export { CitiesProvider, useCities };
