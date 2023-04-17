import React, { useState, useContext, useEffect, createContext } from "react";

export const AppContext = createContext();
export const useGlobalContext = () => useContext(AppContext);
const mainUrl = "https://api.themoviedb.org/3/";
const trendingUrl = "trending/movie/week?";
const queryUrl = `search/movie?api_key=${process.env.REACT_APP_A}&query=`;
const getmovieUrl = `${mainUrl}movie/now_playing?api_key=${process.env.REACT_APP_A}`;
const defaultImage =
  "https://www.immobilieredelahalle.fr/wp-content/themes/realestate-7/images/no-image.png";

const Context = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  const [popularMovies, setPopularMovies] = useState([]);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${mainUrl}${trendingUrl}api_key=${process.env.REACT_APP_A}`
      );
      const data = await response.json();
      const { results } = data;

      if (results) {
        setPopularMovies(results);
      } else {
        return <h3>Error loading movies</h3>;
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);
  return (
    <AppContext.Provider
      value={{
        popularMovies,
        loading,
        mainUrl,
        queryUrl,
        searchValue,
        setSearchValue,
        getmovieUrl,
        defaultImage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;
