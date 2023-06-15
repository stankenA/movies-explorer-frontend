import React, { useEffect, useState } from 'react';

import './SearchFilter.scss';

export default function SearchFilter({ handleChange }) {

  const [isShortsChecked, setIsShortsChecked] = useState(false);

  useEffect(() => {
    const savedCheckbox = localStorage.getItem('isShortsChecked');

    if (savedCheckbox === 'true') {
      setIsShortsChecked(true);
    }
  }, [])

  function changeShortsCheckbox(evt) {
    setIsShortsChecked(evt.target.checked);
    localStorage.setItem('isShortsChecked', evt.target.checked);
    handleChange(evt);
  }

  return (
    <label htmlFor="shortsCheckbox" className="search__filter">
      <div className={`search__checkbox-container ${isShortsChecked ? 'search__checkbox-container_checked' : ''}`}>
        <span className={`search__checkmark ${isShortsChecked ? 'search__checkmark_checked' : ''}`}></span>
        <input
          id="shortsCheckbox"
          name="shortsCheckbox"
          type="checkbox"
          className="search__checkbox"
          checked={isShortsChecked}
          value={isShortsChecked}
          onChange={changeShortsCheckbox}
        />
      </div>
      <p className="search__txt">
        Короткометражки
      </p>
    </label>
  )
}
