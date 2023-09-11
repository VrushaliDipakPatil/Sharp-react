import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMoviesHandler() {
    try {
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Fetching movies failed");
      }

      const data = await response.json();

      const transformedData = data.results.map((data) => {
        return {
          id: data.episode_id,
          releaseDate: data.release_date,
          openingText: data.opening_crawl,
        };
      });

      setMovies(transformedData);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
