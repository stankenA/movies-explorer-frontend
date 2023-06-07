import React from 'react';

import './SearchForm.scss';
import SearchFilter from './SearchFilter/SearchFilter';

export default function SearchForm() {

  return (
    <section className="search">
      <form className="search__wrapper" name="search">
        <div className="search__container">
          <input type="text" className="search__input" placeholder="Фильмы" />
          <button type="submit" className="search__submit">
            <span className="search__submit-arrow"></span>
          </button>
        </div>
        <SearchFilter />
      </form>
    </section>
  )
}
