import React from 'react';
import MoviesCard from './MoviesCard.jsx/MoviesCard';

import './MoviesCardList.scss';
import moviePic from '../../images/movie-picture.jpg';

export default function MoviesCardList() {

  // Пока что служит заглушкой, потом переделаю под ответ с API
  const moviesArr = [
    {
      title: '33 слова о дизайне',
      length: '1ч 47м',
      thumbnail: moviePic,
      id: 1,
    },
    {
      title: '33 слова о дизайне',
      length: '1ч 47м',
      thumbnail: moviePic,
      id: 2,
    },
    {
      title: '33 слова о дизайне',
      length: '1ч 47м',
      thumbnail: moviePic,
      id: 3,
    },
    {
      title: '33 слова о дизайне',
      length: '1ч 47м',
      thumbnail: moviePic,
      id: 4,
    },
  ];

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <ul className="movies__list">
          {moviesArr.map((movie) => (
            <MoviesCard
              title={movie.title}
              length={movie.length}
              thumbnail={movie.thumbnail}
              key={movie.id}
            />
          ))}
        </ul>
      </div>
    </section>
  )
}
