import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errormessagge, setError] = useState(null)

  async function fetchMoviesHandler() {
    try {
      setisLoading(true)
      setError(null);
      const response = await fetch("https://swapi.dev/api/films/");
      if (!response.ok) {
        throw new Error("Something went wrong!");
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
      setError( error.message );
    }
    setisLoading(false)
  }

  let content = <p>Found no movies..</p>

  if(movies.length > 0) {
    content = <MoviesList movies={movies} />
  }

  if(errormessagge){
    content = <p>{errormessagge}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
      </section>
    </React.Fragment>
  );
}

export default App;
