import React, { FC } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.scss';
import { TMoviesCardListProps } from '../../utils/types/types';

const MoviesCardList: FC<TMoviesCardListProps> = ({
  moviesArr,
  savedMoviesArr,
  isMoreBtnVisible,
  handleMoreBtn,
  handleDelete
}) => {

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <ul className="movies__list">
          {moviesArr.map((movie) => (
            <MoviesCard
              movie={movie}
              title={movie.nameRU}
              duration={movie.duration}
              thumbnail={movie.image}
              trailerLink={movie.trailerLink}
              handleDelete={handleDelete!}
              key={movie.id || movie.movieId}
              savedMoviesArr={savedMoviesArr!}
            />
          ))}
        </ul>
        {isMoreBtnVisible
          &&
          <button
            type="button"
            className="movies__more"
            onClick={handleMoreBtn}>
            Ещё
          </button>}
      </div>
    </section>
  )
};

export default MoviesCardList;
