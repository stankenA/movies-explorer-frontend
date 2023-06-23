import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.scss';
import MoviesCardSaveBtn from './MoviesCardSaveBtn/MoviesCardSaveBtn';
import MoviesCardDeleteBtn from './MoviesCardDeleteBtn/MoviesCardDeleteBtn';
import { mainApi } from '../../utils/api/MainApi';

export default function MoviesCard({ movie, title, duration, thumbnail, trailerLink, handleDelete, savedMoviesArr }) {

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [isLiked, setIsLiked] = useState(false);

  function checkIsLiked(id) {
    if (savedMoviesArr) {
      return savedMoviesArr.some((movie) => {
        return movie.movieId === id;
      })
    }

    return false;
  }

  function handleLikeChange() {
    const isLiked = checkIsLiked(movie.id);

    if (isLiked) {
      setIsLiked(true)
    } else {
      setIsLiked(false);
    }
  }

  useEffect(() => {
    handleLikeChange()
  }, [savedMoviesArr]);

  async function saveMovie(movie) {
    const movieObj = {
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co/${movie.image.url}`,
      trailerLink: movie.trailerLink,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: `https://api.nomoreparties.co/${movie.image.url}`,
      movieId: movie.id,
    };

    try {
      await mainApi.saveNewMovie(movieObj);
      setIsLiked(true);
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteMovie(movieId) {
    try {
      await mainApi.deleteSavedMovie(movieId);
      setIsLiked(false);
    } catch (err) {
      console.log(err);
    }
  }

  function onLike() {
    if (!isLiked) {
      saveMovie(movie);
    } else if (isLiked) {
      deleteMovie(movie.id);
    }
  }

  function onDelete() {
    deleteMovie(movie.movieId);
    handleDelete(movie.movieId);
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
          ? <MoviesCardDeleteBtn onClick={onDelete} />
          : <MoviesCardSaveBtn onLike={onLike} isLiked={isLiked} />}
      </div>
      <Link to={trailerLink} className="movies__link" target="_blank">
        <img src={thumbnail} alt={`Превью фильма ${title}`} className="movies__img" />
      </Link>
    </li>
  )
}
