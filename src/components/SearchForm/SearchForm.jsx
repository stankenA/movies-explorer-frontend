import React, { useEffect, useState } from 'react';

import './SearchForm.scss';
import SearchFilter from './SearchFilter/SearchFilter';

import errorIcon from '../../images/error-icon.svg';

export default function SearchForm({ handleChange, handleSubmit }) {

  const [isErrored, setIsErrored] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const savedSearch = localStorage.getItem('search');

    if (savedSearch) {
      setSearchValue(savedSearch);
    };

  }, []);

  function changeSearchValue(evt) {
    setSearchValue(evt.target.value);
    handleChange(evt);
    setIsErrored(false);
  }

  function submitSearch(evt) {
    if (searchValue === '') {
      setIsErrored(true);
      return;
    } else {
      localStorage.setItem('search', searchValue);
      handleSubmit(evt);
    }
  }

  return (
    <section className="search" aria-label="search">
      <form
        className="search__wrapper"
        name="search"
        onSubmit={submitSearch}
      >
        <div className="search__container">
          <input
            type="text"
            name="search"
            className="search__input"
            placeholder="Фильмы"
            required=''
            value={searchValue}
            onChange={changeSearchValue}
          />
          <button type="submit" className="search__submit">
            <span className="search__submit-arrow"></span>
          </button>
          <div
            className={`search__error ${isErrored ? 'search__error_opened' : ''}`}
            onClick={() => setIsErrored(false)}
          >
            <img src={errorIcon} alt="Иконка ошибки" className="search__error-icon" />
            <p className="search__error-txt">
              Нужно ввести ключевое слово
            </p>
          </div>
        </div>
        <SearchFilter
          handleChange={handleChange}
        />
      </form>
    </section>
  )
}
