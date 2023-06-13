import React, { useState } from 'react';

import './SearchForm.scss';
import SearchFilter from './SearchFilter/SearchFilter';

import errorIcon from '../../images/error-icon.svg';

export default function SearchForm({ searchValue }) {

  const [isErrorOpened, setIsErrorOpened] = useState(false);
  const [inputValue, setSearchValue] = useState('');

  function checkSearchValue() {
    if (inputValue === '') {
      setIsErrorOpened(true);
    } else {
      setIsErrorOpened(false);
    }
  }

  function changeSearchValue(evt) {
    setIsErrorOpened(false);
    setSearchValue(evt.target.value);
  }

  function submitSearch(evt) {
    evt.preventDefault();
    checkSearchValue();
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
            className="search__input"
            placeholder="Фильмы"
            required=''
            value={inputValue}
            onChange={changeSearchValue}
          />
          <button type="submit" className="search__submit">
            <span className="search__submit-arrow"></span>
          </button>
          <div
            className={`search__error ${isErrorOpened ? 'search__error_opened' : ''}`}
            onClick={() => setIsErrorOpened(false)}
          >
            <img src={errorIcon} alt="Иконка ошибки" className="search__error-icon" />
            <p className="search__error-txt">
              Нужно ввести ключевое слово
            </p>
          </div>
        </div>
        <SearchFilter />
      </form>
    </section>
  )
}
