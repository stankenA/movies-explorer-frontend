import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.scss';

export default function MoviesCardList({ moviesArr, isMoreBtnVisible, handleMoreBtn }) {

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <ul className="movies__list">
          {moviesArr.map((movie) => (
            <MoviesCard
              movie={movie}
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
            onClick={handleMoreBtn}>
            Ещё
          </button>}
      </div>
    </section>
  )
}
