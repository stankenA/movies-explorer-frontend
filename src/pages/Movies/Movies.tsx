import React, { useEffect, useState, FC } from 'react';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesCardList from '../../components/MoviesCardList/MoviesCardList';
import Preloader from '../../components/Preloader/Preloader';
import Placeholder from '../../components/Placeholder/Placeholder';
import { useForm } from '../../hooks/useForm';
import { useResize } from '../../hooks/useResize';
import { moviesApi } from '../../utils/api/MovieApi';
import { filterMoviesByParams } from '../../utils/filter';
import MainApi from '../../utils/api/MainApi';
import { BASE_URL, visibleMoviesProps } from '../../utils/constants';
import { TInitialMovie, TMovie } from '../../utils/types/types';

const Movies: FC = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [isFirstFetch, setIsFirstFetch] = useState(true);
  const [initialMovies, setInitialMovies] = useState<TInitialMovie[] | []>([]);
  const [visibleMovies, setVisibleMovies] = useState<TMovie[] | []>([]);
  const [savedMovies, setSavedMovies] = useState<TMovie[] | []>([]); // Необходим для проверки, есть у карточки лайк
  const [placeholder, setPlaceholder] = useState({ // Плейсхолдер для сообщений пользователю
    isShown: true,
    message: 'Наливайте чай, доставайте печеньки и ищите фильм!'
  });
  // Собираем данные инпутов с помощью кастомного хука
  const { values, handleChange, setValues } = useForm({
    search: '',
    shortsCheckbox: false,
  });
  // Проверяем размер экрана и определяем необходимые стейты
  const { isMobile, isTablet, isDesktop } = useResize();
  const [visibilityParams, setVisibilityParams] = useState({
    visbleMovies: 0,
    addableMovies: 0,
  });
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);

  // API
  const mainApi = new MainApi({
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  // Собираем данные из локального хранилища, если они там есть
  function collectLocalData() {
    const storedSearch = localStorage.getItem('search');
    const storedCheckbox = localStorage.getItem('isShortsChecked');
    const storedMovies = localStorage.getItem('movies');

    if (storedSearch) {
      setValues({ search: storedSearch, shortsCheckbox: values.shortsCheckbox });
    }

    if (storedCheckbox) {
      storedCheckbox === 'true' ? values.shortsCheckbox = true : values.shortsCheckbox = false;
    }

    if (storedMovies) {
      setPlaceholder({ isShown: false, message: '' });
      setInitialMovies(JSON.parse(storedMovies));
    }
  }

  // Запрос всех фильмов с основного сервиса
  async function fetchMovies() {
    setIsLoading(true);
    setPlaceholder({
      isShown: false,
      message: '',
    });

    try {
      const response = await moviesApi.getInitialMovies();
      response.forEach((item: TInitialMovie) => {
        item.image = `https://api.nomoreparties.co${item.image.url}`;
      });
      setInitialMovies(response);
      localStorage.setItem('movies', JSON.stringify(response));
    } catch (error) {
      console.log(error);
      setPlaceholder({
        isShown: true,
        message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
      });
    } finally {
      setIsLoading(false);
    }
  }

  // Запрос сохранённых фильмов с нашего API
  useEffect(() => {
    async function fetchSavedMovies() {
      try {
        const response = await mainApi.getSavedMovies();
        setSavedMovies(response);
      } catch (err) {
        console.log(err);
        setPlaceholder({
          isShown: true,
          message: 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз'
        });
      }
    }

    fetchSavedMovies();
  }, [])

  // Функция фильтрации фильмов
  function filterMovies() {
    const filteredMovies: TMovie[] | [] = filterMoviesByParams(initialMovies, values.search, values.shortsCheckbox);

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

    // Сохраняем их в локальном хранилище
    localStorage.setItem('movies', JSON.stringify(filteredMovies));

    // Отрисовываем их на клиенте
    setVisibleMovies([...filteredMovies].splice(0, visibilityParams.visbleMovies));

    // Меняем состояние кнопки "Ещё"
    if (filteredMovies.length / visibleMovies.length === 1) {
      setIsMoreBtnVisible(false);
    } else if (filteredMovies.length > 3) {
      setIsMoreBtnVisible(true);
    }
  }

  // Сабмит при нажатии на кнопку поиска
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (isFirstFetch) {
      fetchMovies();
      setIsFirstFetch(false);
    } else {
      filterMovies();
    }
  }

  // Управление количеством отображаемых фильмов с помощью кнопки "Ещё"
  function handleMoreBtn() {
    setVisibilityParams({
      visbleMovies: visibilityParams.visbleMovies + visibilityParams.addableMovies,
      addableMovies: visibilityParams.addableMovies,
    });
  }

  // Фильтрация фильмов, если они есть в хранилище и повторная фильтрация при изменении зависимостей
  useEffect(() => {
    if (localStorage.getItem('movies')) {
      filterMovies();
    }
  }, [visibilityParams.visbleMovies, values.shortsCheckbox, initialMovies, visibleMovies.length]);

  // Отображаем соответствующее количество фильмов в зависимости от размеров экрана
  useEffect(() => {
    if (isDesktop) {
      setVisibilityParams({
        visbleMovies: visibleMoviesProps.desktop.visibleMovies,
        addableMovies: visibleMoviesProps.desktop.addableMovies,
      })
    } else if (isTablet) {
      setVisibilityParams({
        visbleMovies: visibleMoviesProps.tablet.visibleMovies,
        addableMovies: visibleMoviesProps.tablet.addableMovies,
      })
    } else if (isMobile) {
      setVisibilityParams({
        visbleMovies: visibleMoviesProps.mobile.visibleMovies,
        addableMovies: visibleMoviesProps.mobile.addableMovies,
      })
    }
  }, [isDesktop, isTablet, isMobile]);

  // Сбор локальных данных
  useEffect(() => {
    collectLocalData();
  }, []);

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
              savedMoviesArr={savedMovies}
              handleMoreBtn={handleMoreBtn}
              isMoreBtnVisible={isMoreBtnVisible}
            />
      }
    </>
  )
};

export default Movies;
