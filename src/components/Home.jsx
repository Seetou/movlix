import React from "react";
import SearchForm from "./SearchForm";
import ShowList from "./ShowList";
import TrendingMovies from "./TrendingMovies";

const Home = () => {
  return (
    <main className="main-container">
      <SearchForm />
      <TrendingMovies />
      <ShowList />
    </main>
  );
};

export default Home;
