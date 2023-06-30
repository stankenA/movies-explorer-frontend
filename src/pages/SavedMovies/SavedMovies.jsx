import React, { useEffect, useState } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Placeholder from '../../components/Placeholder/Placeholder';
import Preloader from '../../components/Preloader/Preloader';
import { useForm } from '../../hooks/useForm';
import MainApi from '../../utils/api/MainApi';
import { filterMoviesByParams } from '../../utils/filter';

export default function Movies() {

  const [isLoading, setIsLoading] = useState(false);
  const [initialMovies, setInitialMovies] = useState([]);
  const [visibleMovies, setVisibleMovies] = useState([]);
  const [placeholder, setPlaceholder] = useState({ // Плейсхолдер для сообщений пользователю
    isShown: true,
    message: 'Наливайте чай, доставайте печеньки и ищите фильм!'
  });

  // Собираем данные инпутов с помощью кастомного хука
  const { values, handleChange, setValues } = useForm({
    search: '',
    shortsCheckbox: false,
  });

  // API
  const mainApi = new MainApi({
    url: 'https://api.movies-exporer.nomoredomains.rocks',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  // Запрос всех сохранённых фильмов с сервера
  async function fetchSavedMovies() {
    setIsLoading(true);
    setPlaceholder({
      isShown: false,
      message: '',
    });

    try {
      const response = await mainApi.getSavedMovies();
      setInitialMovies(response);
    } catch (error) {
      setPlaceholder({
        isShown: true,
        message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      })
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchSavedMovies();
  }, [])

  // Функция фильтрации фильмов
  function filterMovies() {
    const filteredMovies = filterMoviesByParams(initialMovies, values.search, values.shortsCheckbox);

    if (filteredMovies.length === 0) {
      setPlaceholder({
        isShown: true,
        message: 'Ничего не найдено',
      });
      return;
    }

    // Убираем плейсхолдер, если фильмы найдены
    setPlaceholder({
      isShown: false,
      message: '',
    });

    // Отрисовываем их на клиенте
    setVisibleMovies([...filteredMovies]);
  }

  // Сабмит при нажатии на кнопку поиска
  function handleSubmit(evt) {
    evt.preventDefault();
    filterMovies();
  }

  // Повторная фильтрация при изменении зависимостей
  useEffect(() => {
    filterMovies();
  }, [values.shortsCheckbox, initialMovies]);

  // Функция удаления карточки из отрисованных фильмов
  function handleCardDelete(savedMovie) {
    const newArr = visibleMovies.filter((movie) => movie._id !== savedMovie._id);
    setVisibleMovies(newArr);

    if (newArr.length === 0) {
      setPlaceholder({
        isShown: true,
        message: 'Все сохранённые фильмы были удалены'
      })
    }
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
              moviesArr={visibleMovies}
              isMoreBtnVisible={false}
              handleDelete={handleCardDelete}
            />
      }
    </>
  )
}
