import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "./Context";
import Loading from "./Loading";

const SearchedSingleShow = () => {
  const { id } = useParams();
  const { mainUrl, defaultImage } = useGlobalContext();
  const [singleMovie, setSingleMovie] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchSingleMovie = async (id) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${mainUrl}movie/${id}?api_key=${process.env.REACT_APP_A}`
      );
      const data = await response.json();
      if (data) {
        const {
          poster_path: image,
          title,
          release_date: date,
          vote_average: rate,
          overview: info,
          genres,
        } = data;
        setSingleMovie({ image, title, date, rate, info, genres });
      } else {
        return;
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSingleMovie(id);
  }, [id]);

  //   const { image, title, date, rate, info, genres } = singleMovie;
  return (
    <section className="section single-show-container">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="singleMovie">
          <article>
            <img
              src={
                singleMovie.image
                  ? `https://image.tmdb.org/t/p/original/${singleMovie.image}`
                  : defaultImage
              }
              alt={singleMovie.title}
            />
            <div className="singleMovie-info">
              <h3>{singleMovie.title}</h3>
              <p>{singleMovie.info}</p>
              <p>Release date : {singleMovie.date}</p>
              <p>Popularity : {singleMovie.rate}/10</p>
              {singleMovie.genres.map((category) => {
                return (
                  <p key={category.id}>
                    <span className="singleMovie-category">
                      {category.name}
                    </span>
                  </p>
                );
              })}
            </div>
          </article>
        </div>
      )}
    </section>
  );
};

export default SearchedSingleShow;
