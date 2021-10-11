import "../style/styles.css";
import Row from "./Row";
import request from "./request";
import React, { useEffect, useState } from "react";
import { instance_movie } from "../service/axios";

export default function Fav() {
  const [movies, setMovies] = useState({
    list1: [],
    list2: [],
    list3: [],
    list4: []
  });
  useEffect(() => {
    async function fetchData() {
      const response = await instance_movie.get("api/get_favourites");
      console.log(response.data.data);

      setMovies({
        list1: response.data.data.slice(0, 5),
        list2: response.data.data.slice(5, 10),
        list3: response.data.data.slice(10, 15),
        list4: response.data.data.slice(15, 20)
      });
      return response;
    }
    fetchData();
  }, []);

  return (
    <div>
      <div className="container">
        {movies.list1[0] ? (
          <>
            <Row title={"Favourites"} data={movies.list1} isLargeRow isFav />
            <Row title={""} data={movies.list2} isLargeRow isFav />
            <Row title={""} data={movies.list3} isLargeRow isFav />
            <Row title={""} data={movies.list4} isLargeRow isFav />
          </>
        ) : (
          <div style={{ color: "white" }}> No Data Found</div>
        )}
      </div>
    </div>
  );
}
