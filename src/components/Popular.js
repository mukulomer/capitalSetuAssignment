import React, { useEffect, useState } from "react";
import "../style/styles.css";
import Row from "./Row";
import request from "./request";
import { instance } from "../service/axios";

export default function Popular() {
  const [movies, setMovies] = useState({
    list1: [],
    list2: [],
    list3: [],
    list4: []
  });

  useEffect(() => {
    async function fetchData() {
      const response = await instance.get(request.fetchOriginals);
      console.log(response.data.results);

      setMovies({
        list1: response.data.results.slice(0, 5),
        list2: response.data.results.slice(5, 10),
        list3: response.data.results.slice(10, 15),
        list4: response.data.results.slice(15, 20)
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
            <Row
              title={"Popular"}
              fetchUrl={request.fetchOriginals}
              data={movies.list1}
              isLargeRow
            />
            <Row
              title={""}
              fetchUrl={request.fetchTrending}
              data={movies.list2}
              isLargeRow
            />
            <Row
              title={" "}
              fetchUrl={request.fetchToprated}
              data={movies.list3}
              isLargeRow
            />
            <Row
              title={""}
              fetchUrl={request.fetchAction}
              data={movies.list4}
              isLargeRow
            />
          </>
        ) : (
          <div> No Data Found </div>
        )}
      </div>
    </div>
  );
}
