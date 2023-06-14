import React, { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.scss';
import { useResize } from '../../hooks/useResize';

export default function MoviesCardList({ moviesArr }) {

  const [visibleArr, setVisibleArr] = useState([]);
  const [visibleMoviesNumber, setVisibleMoviesNumber] = useState(0);

  const [moreMoviesNumber, setMoreMoviesNumber] = useState(0);
  const [isMoreBtnVisible, setIsMoreBtnVisible] = useState(false);
  const { isMobile, isTablet, isDesktop } = useResize();

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
    setVisibleArr([...moviesArr].splice(0, visibleMoviesNumber));

    if (moviesArr.length / visibleArr.length === 1) {
      setIsMoreBtnVisible(false);
    } else if (moviesArr.length > 3) {
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
