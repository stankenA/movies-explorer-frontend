import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

import './Header.scss';

export default function Header() {
  return (
    <header className="header header_page_main">
      <div className="header__wrapper">
        <Link to='/' className="header__link">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        <div className="header__auth">
          <button type="button" className="header__signup">Регистрация</button>
          <button type="button" className="header__signin">Войти</button>
        </div>
      </div>
    </header>
  )
}
