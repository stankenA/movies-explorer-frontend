import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.scss';
import { useResize } from '../../hooks/useResize';
import { filterMovies } from '../../utils/filter';

export default function MoviesCardList({ moviesArr, searchValue, isShorts }) {

  const [visibleArr, setVisibleArr] = useState([]);
  const [visibleMoviesNumber, setVisibleMoviesNumber] = useState(0);

  const [moreMoviesNumber, setMoreMoviesNumber] = useState(0);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResize();

  useEffect(() => {
    const savedMovies = localStorage.getItem('movies');

    if (savedMovies) {
      setVisibleArr(JSON.parse(savedMovies));
    }
  }, []);

  useEffect(() => {
    if (isDesktop) {
      setVisibleMoviesNumber(12);
      setMoreMoviesNumber(3);
    } else if (isTablet) {
      setVisibleMoviesNumber(8);
      setMoreMoviesNumber(2);
    } else if (isMobile) {
      setVisibleMoviesNumber(5);
      setMoreMoviesNumber(2);
    }
  }, [isDesktop, isTablet, isMobile]);

  useEffect(() => {
    // Отфильтровываем фильмы
    const filteredMovies = filterMovies(moviesArr, searchValue, isShorts);

    // Сохраняем их в локальном хранилище
    localStorage.setItem('movies', JSON.stringify(filteredMovies));

    // Отрисовываем их на клиенте
    setVisibleArr([...filteredMovies].splice(0, visibleMoviesNumber));

    // Меняем стейт кнопки "Ещё"
    if (filteredMovies.length / visibleArr.length === 1) {
      setIsMoreBtnVisible(false);
    } else if (filteredMovies.length > 3) {
      setIsMoreBtnVisible(true);
    }

  }, [moviesArr, visibleArr.length, visibleMoviesNumber]);

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <ul className="movies__list">
          {visibleArr.map((movie) => (
            <MoviesCard
              title={movie.nameRU}
              duration={movie.duration}
              thumbnail={`https://api.nomoreparties.co/${movie.image.url}`}
              trailerLink={movie.trailerLink}
              key={movie.id}
            />
          ))}
        </ul>
        {isMoreBtnVisible
          &&
          <button
            type="button"
            className="movies__more"
            onClick={() => setVisibleMoviesNumber(visibleMoviesNumber + moreMoviesNumber)}>
            Ещё
          </button>}
      </div>
    </section>
  )
}
