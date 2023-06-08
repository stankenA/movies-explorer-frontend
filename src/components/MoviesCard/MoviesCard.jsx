import React from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.scss';
import MoviesCardSaveBtn from './MoviesCardSaveBtn/MoviesCardSaveBtn';
import MoviesCardDeleteBtn from './MoviesCardDeleteBtn/MoviesCardDeleteBtn';

export default function MoviesCard({ title, length, thumbnail }) {

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';

  return (
    <li className="movies__card">
      <div className="movies__card-top">
        <div className="movies__info">
          <h2 className="movies__title">
            {title}
          </h2>
          <p className="movies__length">
            {length}
          </p>
        </div>
        {isSavedMoviesPage
          ? <MoviesCardDeleteBtn />
          : <MoviesCardSaveBtn />}
      </div>
      <img src={thumbnail} alt={`Превью фильма ${title}`} className="movies__img" />
    </li>
  )
}
