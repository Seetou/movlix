import React, { useEffect, useState } from "react";
import { useGlobalContext } from "./Context";
import Loading from "./Loading";
import { Link } from "react-router-dom";

const ShowList = () => {
  const { getmovieUrl, defaultImage } = useGlobalContext();
  const [moviesLoading, setMoviesLoading] = useState(true);
  const [moviesList, setMoviesList] = useState([]);
  const randomPage = Math.floor(Math.random() * 50) + 1;

  const fetchMovies = async (url) => {
    setMoviesLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data) {
        setMoviesList(data.results);
      } else {
        return <h3>Can't load movies ! Try later</h3>;
      }
      setMoviesLoading(false);
    } catch (error) {
      console.log(error);
      setMoviesLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(`${getmovieUrl}&page=1`);
  }, []);

  return (
    <section className="section-movie-list">
      <h3 className="section-title">Watch the best movies</h3>
      <button
        type="button"
        className="btn-btn"
        onClick={() => fetchMovies(`${getmovieUrl}&page=${randomPage}`)}
      >
        Surprise Me
      </button>
      {moviesLoading ? (
        <Loading />
      ) : (
        <div className="popular-movies">
          {moviesList.map((movie) => {
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

export default ShowList;
