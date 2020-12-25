import React from 'react';
import './App.css';
import Row from './Row';
import requests from './request';
import Banner from './Banner';
import Nav from './Nav';

const App = () => {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row title="Popular Movies" fetchUrl={requests.fetchPupularMovies}/>
      <Row title="Trending now" fetchUrl={requests.fetchTrendig} />
      <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={requests.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
    </div>
  );
}

export default App;