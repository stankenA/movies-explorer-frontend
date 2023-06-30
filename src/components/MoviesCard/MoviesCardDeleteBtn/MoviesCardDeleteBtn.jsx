import React from 'react';

import './MoviesCardDeleteBtn.scss';

export default function MoviesCardDeleteBtn({ onClick }) {
  return (
    <button
      type="button"
      className="movies__delete"
      onClick={() => onClick()}
    >
    </button>
  )
}
