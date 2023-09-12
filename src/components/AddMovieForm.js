import React, { useState } from "react";
import './addmovie.css';

const AddMovieForm = () => {
  const [movie, setMovie] = useState({
    title: "",
    openingText: "",
    releaseDate: "",
  });

  const handleAddForm = (event) => {
    event.preventDefault();
    // You can do something with the 'movie' object here, like sending it to an API or updating your state.
    console.log("Movie data:", movie);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setMovie({
      ...movie,
      [name]: value,
    });
  };

  return (
    <>
      <form onSubmit={handleAddForm}>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={movie.title}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Opening Text</label>
          <input
            className="opening-text"
            type="text"
            name="openingText"
            value={movie.openingText}
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label>Release date</label>
          <input
            type="date"
            name="releaseDate"
            value={movie.releaseDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit">Add Movie</button>
        </div>
      </form>
    </>
  );
};

export default AddMovieForm;
