import React from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.scss';
import MoviesCardSaveBtn from './MoviesCardSaveBtn/MoviesCardSaveBtn';
import MoviesCardDeleteBtn from './MoviesCardDeleteBtn/MoviesCardDeleteBtn';

export default function MoviesCard({ title, duration, thumbnail, trailerLink }) {

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  function onClick() {
    console.log('boop');
  }

  return (
    <li className="movies__card">
      <div className="movies__card-top">
        <div className="movies__info">
          <h2 className="movies__title">
            {title}
          </h2>
          <p className="movies__length">
            {`${Math.floor(duration / 60)} ч ${duration % 60} мин`}
          </p>
        </div>
        {isSavedMoviesPage
          ? <MoviesCardDeleteBtn onClick={onClick} />
          : <MoviesCardSaveBtn onClick={onClick} />}
      </div>
      <Link to={trailerLink} className="movies__link" target="_blank">
        <img src={thumbnail} alt={`Превью фильма ${title}`} className="movies__img" />
      </Link>
    </li>
  )
}
