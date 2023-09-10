import React, { FC } from 'react';

import './MoviesCardDeleteBtn.scss';

const MoviesCardDeleteBtn: FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <button
      type="button"
      className="movies__delete"
      onClick={() => onClick()}
    >
    </button>
  )
};

export default MoviesCardDeleteBtn;
