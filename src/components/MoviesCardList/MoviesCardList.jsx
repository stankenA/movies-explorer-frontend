import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';

import './MoviesCardList.scss';

export default function MoviesCardList({ moviesArr, isMoreBtnVisible, handleMoreBtn, handleDelete }) {

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <ul className="movies__list">
          {moviesArr.map((movie) => (
            <MoviesCard
              movie={movie}
              title={movie.nameRU}
              duration={movie.duration}
              thumbnail={movie.image.url ? `https://api.nomoreparties.co/${movie.image.url}` : movie.image}
              trailerLink={movie.trailerLink}
              handleDelete={handleDelete}
              key={movie.id || movie.movieId}
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
