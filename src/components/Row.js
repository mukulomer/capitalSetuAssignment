import React, { useEffect, useState } from "react";
import "../style/row.css";
import { instance_movie } from "../service/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

export default function Row({ title, fetchUrl, data, isLargeRow, isFav }) {
  // const [data, setdata] = useState([]);
  const [hide, setHide] = useState(true);
  const [id, setId] = useState("");
  const [isLike, setIsLike] = useState(false);
  const baseUrl = "https://image.tmdb.org/t/p/original/";

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

  const handleLike = async (data) => {
    try {
      let movies = await instance_movie.post("api/add_favourites", data);
      console.log("movies", movies.data);
      if (movies.data.status) {
        toast.success("added successfully");
      }
      setIsLike(!isLike);
      setId(data.id);
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <div>
      <ToastContainer />
      <h2 className="title">{title}</h2>
      <div className="row_posters">
        {data.map((movie) => (
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
                {!isFav ? (
                  <p className="like" onClick={() => handleLike(movie)}>
                    {" "}
                    {isLike && id === movie.id ? "❤️" : "🤍"}
                  </p>
                ) : (
                  ""
                )}
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
