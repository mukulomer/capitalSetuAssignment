import React, { useEffect, useState } from "react";
import "./row.css";

import axios from "./axios";

export default function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
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
            <div className="row_contents">
              <h5 className="row_title">{movie.name || movie.title}</h5>
              <button className="banner_button"> View More </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
