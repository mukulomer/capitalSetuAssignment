import React from "react";
import "./styles.css";
import Row from "./Row";
import request from "./request";
import Banner from "./Banner";

export default function App() {
  return (
    <div>
      <h1 className="header">NETFLIX </h1>
      <Banner />
      <div className="container">
        <Row
          title={"NETFLIX ORIGINALS"}
          fetchUrl={request.fetchOriginals}
          isLargeRow
        />
        <Row
          title={"Trending Now"}
          fetchUrl={request.fetchTrending}
          isLargeRow
        />
        <Row title={"Top Rated"} fetchUrl={request.fetchToprated} />
        <Row title={"Action Movies"} fetchUrl={request.fetchAction} />
        <Row title={"Romance Movies"} fetchUrl={request.fetchRomance} />
        <Row title={"Horror Movies"} fetchUrl={request.fetchHorror} />
        <Row title={"Documentaries"} fetchUrl={request.fetchDocumentaries} />
      </div>
    </div>
  );
}
