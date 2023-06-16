import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import { useForm } from '../../hooks/useForm';
import { moviesApi } from '../../utils/api/MovieApi';
import Placeholder from '../../components/Placeholder/Placeholder';

export default function Movies() {

  // Плейсхолдер для сообщений пользователю
  const [placeholder, setPlaceholder] = useState({
    isShown: true,
    message: 'Наливайте чай, доставайте печеньки и ищите фильм!'
  });
  const [isLoading, setIsLoading] = useState(false);

  const [movies, setMovies] = useState([]);

  // Собираем данные инпутов с помощью кастомного хука
  const { values, handleChange, setValues } = useForm({
    search: '',
    shortsCheckbox: false,
  });

  useEffect(() => {
    const savedSearch = localStorage.getItem('search');
    const savedCheckbox = localStorage.getItem('isShortsChecked');
    const savedMovies = localStorage.getItem('movies');

    if (savedSearch) {
      setValues({ search: savedSearch, shortsCheckbox: values.shortsCheckbox });
    }

    if (savedCheckbox) {
      savedCheckbox === 'true' ? values.shortsCheckbox = true : values.shortsCheckbox = false;
    }

    if (savedMovies) {
      setPlaceholder({ isShown: false, message: '' });
      fetchMovies();
    }
  }, []);

  async function fetchMovies() {
    setIsLoading(true);

    try {
      const response = await moviesApi.getInitialMovies();
      setMovies(response);
    } catch (error) {
      setPlaceholder({
        isShown: true,
        message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      })
    } finally {
      setIsLoading(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    fetchMovies();
    setPlaceholder({ isShown: false, message: '' })
  }

  function showPlaceholder(message) {
    setPlaceholder({ isShown: true, message });
  }

  return (
    <>
      <SearchForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {
        placeholder.isShown
          ?
          <Placeholder>
            {placeholder.message}
          </Placeholder>
          : isLoading
            ? <Preloader />
            :
            <MoviesCardList
              moviesArr={movies}
              searchValue={values.search}
              isShorts={values.shortsCheckbox}
              showPlaceholder={showPlaceholder}
            />
      }
    </>
  )
}
