import React, { useState } from 'react';

import './SearchFilter.scss';

export default function SearchFilter() {

  const [isShortsChecked, setIsShortsChecked] = useState(false);

  return (
    <div className="search__filter" onClick={() => setIsShortsChecked(!isShortsChecked)}>
      <div className={`search__checkbox-container ${isShortsChecked ? 'search__checkbox-container_checked' : ''}`}>
        <span className={`search__checkmark ${isShortsChecked ? 'search__checkmark_checked' : ''}`}></span>
        <input
          id="checkbox"
          name="checkbox"
          type="checkbox"
          className="search__checkbox"
          checked={isShortsChecked}
          onChange={e => setIsShortsChecked(e.target.checked)}
        />
      </div>
      <p className="search__txt">
        Короткометражки
      </p>
    </div>
  )
}
