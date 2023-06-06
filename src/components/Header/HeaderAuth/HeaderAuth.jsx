import React from 'react';
import { Link } from 'react-router-dom';

import './HeaderAuth.scss';


export default function HeaderAuth() {
  return (
    <nav className="header__auth">
      <Link to='/sign-up' className="header__signup">Регистрация</Link>
      <Link to='/sign-in' className="header__signin">Войти</Link>
    </nav>
  )
}
