import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "./Context";
import Loading from "./Loading";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";

const ResultPage = () => {
  const { name } = useParams();
  const { queryUrl, mainUrl, defaultImage } = useGlobalContext();
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const fetchSearchedMovie = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${mainUrl}${queryUrl}${name}`);
      const data = await response.json();
      if (data.results.length > 0) {
        setResults(data.results);
      } else {
        return <h3>Something went wrong! Try later !</h3>;
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSearchedMovie();
  }, [name]);

  return (
    <section className="section result-page">
      <Link to={"/"} className="btn-btn">
        Back To Home
      </Link>
      <h3 className="section-title">{`Results for "${name}"`}</h3>
      <Outlet />
      {isLoading ? (
        <Loading />
      ) : (
        <div className="popular-movies">
          {results.map((movie) => {
            const { id, title, poster_path: image } = movie;
            return (
              <Link to={`${id}`} className="popular-movie-link" key={id}>
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

export default ResultPage;
