import React, { useEffect, useState } from "react";
import "../style/row.css";

import axios from "../service/axios";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");
  const [isLike, setIsLike] = useState(false);
  const baseUrl = "https://image.tmdb.org/t/p/original/";

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(fetchUrl);
      console.log(response.data.results);
      setMovies(response.data.results);
      return response;
    }
    fetchData();
  }, [fetchUrl]);

  function truncate(str, num) {
    if (str.length <= num) {
      return str;
    }
    return str.slice(0, num) + "...";
  }
  const handleClick = (data) => {
    setHide(false);
    setId(data);
  };

  const handleLike = (data) => {
    setIsLike(!isLike);
    setId(data.id);
  };

  return (
    <div>
      <h2 className="title">{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <div className={isLargeRow ? "row_large" : "Movie_poster"}>
            <img
              key={movie.id}
              className={isLargeRow ? "row_poster" : "Movie_poster"}
              src={`${baseUrl}${
                isLargeRow ? movie.poster_path : movie.backdrop_path
              }`}
              alt={movie.name}
            />
            <div
              className={
                !hide && id === movie.id ? "row_content_large" : "row_contents"
              }
            >
              <div className="like_Icon">
                {" "}
                <h5 className="row_title">{movie.name || movie.title}</h5>{" "}
                <p className="like" onClick={() => handleLike(movie)}>
                  {" "}
                  {isLike && id === movie.id ? "❤️" : "🤍"}
                </p>
              </div>

              {!hide && id === movie.id ? (
                <>
                  <p className="rating">{movie.vote_average} </p>
                  <p className="row_discription">
                    {truncate(`${movie?.overview}`, 80)}
                  </p>
                </>
              ) : (
                ""
              )}

              <button
                className="view_button"
                onClick={() => handleClick(movie.id)}
              >
                {" "}
                View More{" "}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
