import React from "react";
import "./style/styles.css";
import Row from "./components/Row";
import request from "./components/request";
import AccountMenu from "./components/AccountMenu";

export default function App() {
  return (
    <div>
      <AccountMenu />
      <h1 className="header">Movie Adda </h1>
      {/* <Banner /> */}
      <div className="container">
        <Row title={"Popular"} fetchUrl={request.fetchOriginals} isLargeRow />
        <Row title={""} fetchUrl={request.fetchTrending} isLargeRow />
        <Row title={" "} fetchUrl={request.fetchToprated} isLargeRow />
        <Row title={""} fetchUrl={request.fetchAction} isLargeRow />
        {/* <Row title={"Romance Movies"} fetchUrl={request.fetchRomance} />
        <Row title={"Horror Movies"} fetchUrl={request.fetchHorror} />
        <Row title={"Documentaries"} fetchUrl={request.fetchDocumentaries} /> */}
      </div>
    </div>
  );
}
