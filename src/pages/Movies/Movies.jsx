import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import { useForm } from '../../hooks/useForm';
import { moviesApi } from '../../utils/api/MovieApi';

import './Movies.scss';
import Preloader from '../../components/Preloader/Preloader';

export default function Movies() {

  const [placeholder, setPlaceholder] = useState('Наливайте чай, доставайте печеньки и ищите фильм!');
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  // Собираем данные инпутов с помощью кастомного хука
  const { values, handleChange, setValues } = useForm({
    search: '',
    shortsCheckbox: false,
  });


  async function fetchMovies() {
    setIsLoading(true);

    try {
      const response = await moviesApi.getInitialMovies();
      setMovies(response);
    } catch (error) {
      setPlaceholder('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз')
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    fetchMovies();

    localStorage.setItem('search', values.search);
    localStorage.setItem('movies', movies);
    localStorage.setItem('isShortsChecked', values.shortsCheckbox);
  }

  console.log(isLoading);

  return (
    <>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {(movies.length === 0 && isLoading === false)
        ?
        <p className="movies-placeholder">
          {placeholder}
        </p>
        : (movies.length === 0 && isLoading === true)
          ?
          <Preloader />
          :
          <MoviesCardList
            moviesArr={movies}
          />
      }
    </>
  )
}
