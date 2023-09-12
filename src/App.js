import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [errormessagge, setError] = useState(null);
  const [retry, setRetry] = useState(false);

  
const  fetchMoviesHandler= useCallback(async() => {
  try {
    setisLoading(true)
    setError(null);
    const response = await fetch("https://movies-2a006-default-rtdb.firebaseio.com/movies.json");
    if (!response.ok) {
      setRetry(true)
      throw new Error("Something went wrong.....Retrying!");       
    }
    const data = await response.json();

const loadedMovies = [];
 for(const key in data){
  loadedMovies.push({
    id: key,
    title: data[key].title,
    openingText: data[key].openingText,
    releaseDate: data[key].releaseDate,
  })
 }

    setMovies(loadedMovies);
  } catch (error) {
    setError( error.message );
  }
  setisLoading(false)
},[])

  // useEffect(()=>{
  //   if (retry) {
  //     const retryInterval = setInterval(() => {
  //       fetchMoviesHandler();
  //     }, 5000);

  //     return () => {
  //       clearInterval(retryInterval);
  //     };
  //   }
  // },[retry, fetchMoviesHandler])

function handleCancel(){
  setRetry(false);
}

  useEffect(()=>{
    fetchMoviesHandler()
  },[fetchMoviesHandler])

  const deleteMovieHandler = async (movieId) => {
    try {
      const response = await fetch(
        `https://movies-2a006-default-rtdb.firebaseio.com/movies/${movieId}.json`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete movie.");
      }

      fetchMoviesHandler(); // Refresh the movie list after deleting a movie
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  let content = <p>Found no movies..</p>

  if(movies.length > 0) {
    content = <MoviesList movies={movies}  onDelete={deleteMovieHandler}/>
  }

  if(errormessagge){
    content = <p>{errormessagge}</p>
  }

  if(isLoading){
    content = <p>Loading...</p>
  }

 async function addMovieHandler(movie) {
    const respone = await fetch('https://movies-2a006-default-rtdb.firebaseio.com/movies.json',{
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type' : 'application/json'
      }
    })
    const data = respone.json();
    fetchMoviesHandler()
  }




  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
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
