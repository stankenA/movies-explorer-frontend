import React from 'react';
import { Link } from 'react-router-dom';

import './HeaderNav.scss';

export default function HeaderNav() {
  return (
    <>
      <nav className="header__nav">
        <div className="header__movies-container">
          <Link to='/movies' className="header__link">
            <p className="header__txt">
              Фильмы
            </p>
          </Link>
          <Link to='/saved-movies' className="header__link">
            <p className="header__txt">
              Сохранённые фильмы
            </p>
          </Link>
        </div>
        <Link to='/profile' className="header__link">
          <div className="header__profile">
            <p className="header__txt">
              Аккаунт
            </p>
            <span className="header__profile-icon"></span>
          </div>
        </Link>
      </nav>
      <button type="button" className="header__hamburger"></button>
    </>
  )
}
