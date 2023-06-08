import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import HeaderAuth from './HeaderAuth/HeaderAuth';
import HeaderNav from './HeaderNav/HeaderNav';

import './Header.scss';
import logo from '../../images/logo.svg';

export default function Header() {

  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();
  const isMainPage = location.pathname === '/';

  return (
    <header className={`header header_page_${isMainPage ? 'main' : 'other'}`}>
      <div className="header__wrapper">
        <Link to='/' className="header__link">
          <img src={logo} alt="logo" className="header__logo" />
        </Link>
        {loggedIn
          ? <HeaderNav />
          : <HeaderAuth />
        }
      </div>
    </header>
  )
}
