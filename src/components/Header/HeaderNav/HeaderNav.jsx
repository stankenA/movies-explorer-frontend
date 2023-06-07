import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './HeaderNav.scss';

export default function HeaderNav() {

  const [isMobileOpened, setIsMobileOpened] = useState(false);

  return (
    <>
      <nav className={`header__nav ${isMobileOpened ? 'header__nav_opened' : ''}`}>
        <div className={`header__nav-wrapper ${isMobileOpened ? 'header__nav-wrapper_opened' : ''}`}>
          <div className="header__nav-container">
            <Link to='/' className="header__link header__link_main">
              <p className="header__txt">
                Главная
              </p>
            </Link>
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
              <p className="header__txt header__txt_profile">
                Аккаунт
              </p>
              <span className="header__profile-icon"></span>
            </div>
          </Link>
          <button type="button" className="header__close" onClick={() => setIsMobileOpened(false)}></button>
        </div>
      </nav>
      <button type="button" className="header__hamburger" onClick={() => setIsMobileOpened(true)}></button>
    </>
  )
}
