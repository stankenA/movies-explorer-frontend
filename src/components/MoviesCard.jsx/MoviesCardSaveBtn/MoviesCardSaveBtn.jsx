import React, { useState } from 'react';

import './MoviesCardSaveBtn.scss';

export default function MoviesCardSaveBtn() {

  const [isSaved, setIsSaved] = useState(false);

  return (
    <button
      button="button"
      className={`movies__save ${isSaved ? 'movies__save_checked' : ''}`}
      onClick={() => setIsSaved(!isSaved)}
    >
      <svg
        className="movies__flag"
        viewBox="0 0 10 14"
        fill={isSaved ? '#fff' : 'none'}
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0.5 1.9C0.5 1.40294 0.902944 1 1.4 1H8.6C9.09706 1 9.5 1.40294 9.5 1.9V12.4789C9.5 12.5552 9.41798 12.6034 9.35133 12.5662L6.21676 10.8198C5.46033 10.3984 4.53968 10.3984 3.78324 10.8198L0.648671 12.5662C0.582015 12.6034 0.5 12.5552 0.5 12.4789V1.9Z"
          stroke="#fff" />
      </svg>
    </button>
  )
}
