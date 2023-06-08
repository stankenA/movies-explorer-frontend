import React from 'react';
import { Link } from 'react-router-dom';

import './SignForm.scss';
import logo from '../../images/logo.svg';

export default function SignForm({ isRegistration }) {
  return (
    <section className="sign">
      <div className="sign__wrapper">
        <Link to='/' className="sign__link">
          <img src={logo} alt="логотип" className="sign__logo" />
        </Link>
        <h1 className="sign__title">
          {isRegistration ? 'Добро пожаловать!' : 'Рады видеть!'}
        </h1>
        <form className="sign__form">
          <fieldset className="sign__fieldset">
            {isRegistration &&
              <>
                <label htmlFor="name" className="sign__label">Имя</label>
                <input id="name" name="name" type="text" className="sign__input" />
              </>
            }
            <label htmlFor="email" className="sign__label">E-mail</label>
            <input id="email" name="email" type="email" className="sign__input" />
            <label htmlFor="password" className="sign__label">Пароль</label>
            <input id="password" name="password" type="password" className="sign__input" />
            <p className="sign__error">
              Что-то пошло не так...
            </p>
          </fieldset>
          <div className="sign__bottom">
            {isRegistration
              ? <button type="submit" className="sign__btn">
                Зарегистрироваться
              </button>
              : <button type="submit" className="sign__btn">
                Войти
              </button>
            }
            <div className="sign__nav">
              {isRegistration
                ? <>
                  <p className="sign__txt">
                    Уже зарегистрированы?
                  </p>
                  <Link to='/sign-in' className="sign__link sign__txt">
                    Войти
                  </Link>
                </>
                : <>
                  <p className="sign__txt">
                    Ещё не зарегистрированы?
                  </p>
                  <Link to='/sign-up' className="sign__link sign__txt">
                    Регистрация
                  </Link>
                </>}
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
