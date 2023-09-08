import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Link } from 'react-router-dom';

import './MoviesCard.scss';
import MoviesCardSaveBtn from './MoviesCardSaveBtn/MoviesCardSaveBtn';
import MoviesCardDeleteBtn from './MoviesCardDeleteBtn/MoviesCardDeleteBtn';
import MainApi from '../../utils/api/MainApi';
import { UserContext } from '../../contexts/CurrentUserContext';
import { BASE_URL } from '../../utils/constants';

export default function MoviesCard({ movie, title, duration, thumbnail, trailerLink, handleDelete, savedMoviesArr }) {

  const location = useLocation();
  const isSavedMoviesPage = location.pathname === '/saved-movies';
  const [isLiked, setIsLiked] = useState(false);

  const currentUser = useContext(UserContext);

  // API
  const mainApi = new MainApi({
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  function checkIsLiked(movieId) {
    if (savedMoviesArr) {
      return savedMoviesArr.some((movie) => {
        return movie.movieId === movieId;
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

  async function deleteMovie(movie) {
    try {
      const response = await mainApi.getSavedMovies();
      const movieForDeletion = response.filter((item) => {
        return (item.owner._id === currentUser._id) && (item.movieId === (movie.id || movie.movieId))
      })[0];
      await mainApi.deleteSavedMovie(movieForDeletion._id);
      setIsLiked(false);
    } catch (err) {
      console.log(err);
    }
  }

  function onLike() {
    if (!isLiked) {
      saveMovie(movie);
    } else if (isLiked) {
      deleteMovie(movie);
    }
  }

  function onDelete() {
    deleteMovie(movie);
    handleDelete(movie);
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
