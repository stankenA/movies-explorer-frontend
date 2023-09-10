import React, { useEffect, useState, FC } from 'react';

import './SearchForm.scss';
import SearchFilter from './SearchFilter/SearchFilter';

import errorIcon from '../../images/error-icon.svg';
import { useLocation } from 'react-router-dom';
import { TSearchFormProps } from '../../utils/types/types';

const SearchForm: FC<TSearchFormProps> = ({ handleChange, handleSubmit }) => {

  const [isErrored, setIsErrored] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/movies') {
      const savedSearch = localStorage.getItem('search');

      if (savedSearch) {
        setSearchValue(savedSearch);
      }
    }
  }, []);

  function changeSearchValue(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearchValue(evt.target.value);
    handleChange(evt);
    setIsErrored(false);
  }

  function submitSearch(evt: React.FormEvent<HTMLFormElement>) {
    if (searchValue === '' && location.pathname === '/movies') {
      setIsErrored(true);
      return;
    } else {
      if (location.pathname === '/movies') {
        localStorage.setItem('search', searchValue);
      }
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
            required={false}
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
};

export default SearchForm;
