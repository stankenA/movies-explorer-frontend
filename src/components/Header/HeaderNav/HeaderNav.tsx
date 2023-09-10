import React, { FC, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import './HeaderNav.scss';

const HeaderNav: FC = () => {

  const [isMobileOpened, setIsMobileOpened] = useState(false);

  function openMenu() {
    setIsMobileOpened(true);
  }

  function closeMenu() {
    setIsMobileOpened(false);
  }

  return (
    <>
      <nav className={`header__nav ${isMobileOpened ? 'header__nav_opened' : ''}`}>
        <div className={`header__nav-wrapper ${isMobileOpened ? 'header__nav-wrapper_opened' : ''}`}>
          <div className="header__nav-container">
            <NavLink
              to='/'
              className={({ isActive }) => `header__link header__link_main ${isActive ? 'header__link_active' : ''}`}
              onClick={closeMenu}
            >
              <p className="header__txt">
                Главная
              </p>
            </NavLink>
            <NavLink
              to='/movies'
              className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}
              onClick={closeMenu}
            >
              <p className="header__txt">
                Фильмы
              </p>
            </NavLink>
            <NavLink
              to='/saved-movies'
              className={({ isActive }) => `header__link ${isActive ? 'header__link_active' : ''}`}
              onClick={closeMenu}
            >
              <p className="header__txt">
                Сохранённые фильмы
              </p>
            </NavLink>
          </div>
          <Link to='/profile' className="header__link" onClick={closeMenu}>
            <div className="header__profile">
              <p className="header__txt header__txt_profile">
                Аккаунт
              </p>
              <span className="header__profile-icon"></span>
            </div>
          </Link>
          <button type="button" className="header__close" onClick={closeMenu}></button>
        </div>
      </nav>
      <button type="button" className="header__hamburger" onClick={openMenu}></button>
    </>
  )
};

export default HeaderNav;
