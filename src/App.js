import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovieForm from "./components/AddMovieForm";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errormessagge, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  
const  fetchMoviesHandler= useCallback(async() => {
  try {
    setisLoading(true)
    setError(null);
    const response = await fetch("https://swapi.dev/api/films/");
    if (!response.ok) {
      setRetry(true)
      throw new Error("Something went wrong.....Retrying!");       
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
},[])

  useEffect(()=>{
    if (retry) {
      const retryInterval = setInterval(() => {
        fetchMoviesHandler();
      }, 5000);

      return () => {
        clearInterval(retryInterval);
      };
    }
  },[retry, fetchMoviesHandler])

function handleCancel(){
  setRetry(false);
}

  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])

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
      <AddMovieForm/>
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
       {content}
       {retry && <button onClick={handleCancel} >cancel Retrying</button>}
      </section>
    </React.Fragment>
  );
}

export default App;
