import React from "react";
import { useGlobalContext } from "./Context";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import styled from "styled-components";

const TrendingMovies = () => {
  const { popularMovies, loading, defaultImage } = useGlobalContext();
  const bestpopularMovies = popularMovies.slice(0, 4);
  return (
    <section className="section popular-movies-container">
      <h3 className="section-title">Popular movies</h3>
      {loading ? (
        <Loading />
      ) : (
        <div className="popular-movies">
          {bestpopularMovies.map((movie) => {
            const { id, title, poster_path: image } = movie;

            return (
              <Link to={`movie/${id}`} className="popular-movie-link" key={id}>
                <article className="popular-movie">
                  {/* <div className="short-title">
                  <h4>{title}</h4>
                </div> */}
                  <div className="popular-movie-poster">
                    <img
                      src={
                        image
                          ? `https://image.tmdb.org/t/p/original/${image}`
                          : defaultImage
                      }
                      alt={title}
                    />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TrendingMovies;

const TrendingWrapper = styled.section``;
