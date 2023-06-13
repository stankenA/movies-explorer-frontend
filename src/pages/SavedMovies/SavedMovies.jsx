import React, { useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import { useForm } from '../../hooks/useForm';

export default function SavedMovies() {
  const [movies, setMovies] = useState([]);

  const { values, handleChange, setValues } = useForm({
    search: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault();

  }

  // useEffect(() => {
  //   async function fetchMovies() {
  //     const response = await moviesApi.getInitialMovies();
  //     setMovies(response);
  //   }

  //   fetchMovies();
  // }, []);

  return (
    <>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {movies
        ?
        <MoviesCardList
          moviesArr={movies}
        />
        :
        <p className="movies-placeholder">
          Попробуйте найти что-нибудь!
        </p>
      }
    </>
  )
}
