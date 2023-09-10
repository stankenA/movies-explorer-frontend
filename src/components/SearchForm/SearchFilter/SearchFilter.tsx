import React, { useEffect, useState, FC } from 'react';

import './SearchFilter.scss';
import { useLocation } from 'react-router-dom';

const SearchFilter: FC<{ handleChange: (evt: React.ChangeEvent<HTMLInputElement>) => void }> = ({ handleChange }) => {

  const [isShortsChecked, setIsShortsChecked] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      const savedCheckbox = localStorage.getItem('isShortsChecked');

      if (savedCheckbox === 'true') {
        setIsShortsChecked(true);
      }
    }
  }, [])

  function changeShortsCheckbox(evt: React.ChangeEvent<HTMLInputElement>) {
    setIsShortsChecked(evt.target.checked);
    if (location.pathname === '/movies') {
      localStorage.setItem('isShortsChecked', `${evt.target.checked}`);
    }
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
          onChange={changeShortsCheckbox}
        />
      </div>
      <p className="search__txt">
        Короткометражки
      </p>
    </label>
  )
};

export default SearchFilter;
