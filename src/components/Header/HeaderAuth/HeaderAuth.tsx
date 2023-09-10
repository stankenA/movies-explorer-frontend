import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './HeaderAuth.scss';


const HeaderAuth: FC = () => {
  return (
    <nav className="header__auth">
      <Link to='/sign-up' className="header__signup">Регистрация</Link>
      <Link to='/sign-in' className="header__signin">Войти</Link>
    </nav>
  )
};

export default HeaderAuth;
