import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import { useForm } from '../../hooks/useForm';
import { moviesApi } from '../../utils/api/MovieApi';

export default function Movies() {

  const [movies, setMovies] = useState([]);

  const { values, handleChange, setValues } = useForm({
    search: '',
  });

  function handleSubmit(evt) {
    evt.preventDefault();

  }

  useEffect(() => {
    async function fetchMovies() {
      const response = await moviesApi.getInitialMovies();
      setMovies(response);
    }

    fetchMovies();
  }, []);

  return (
    <>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      <MoviesCardList
        moviesArr={movies}
      />
    </>
  )
}
