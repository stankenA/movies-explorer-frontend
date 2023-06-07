import React from 'react';

import './MoviesCardList.scss';
import MoviesCard from './MoviesCard.jsx/MoviesCard';

export default function MoviesCardList() {

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <ul className="movies__list">
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
      </div>
    </section>
  )
}
