import React, { useState, FC } from 'react';
import { Link } from 'react-router-dom';

import './SignForm.scss';
import logo from '../../images/logo.svg';
import { TSignFormProps } from '../../utils/types/types';

const SignForm: FC<TSignFormProps> = ({ isRegistration, handleChange, errors, isValid, onSubmit }) => {

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');

  function handleNameChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setNameValue(evt.target.value);
    handleChange(evt);
  }

  function handleEmailChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setEmailValue(evt.target.value);
    handleChange(evt);
  }

  function handlePasswordChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(evt.target.value);
    handleChange(evt);
  }

  return (
    <section className="sign">
      <div className="sign__wrapper">
        <Link to='/' className="sign__link">
          <img src={logo} alt="логотип" className="sign__logo" />
        </Link>
        <h1 className="sign__title">
          {isRegistration ? 'Добро пожаловать!' : 'Рады видеть!'}
        </h1>
        <form className="sign__form" onSubmit={onSubmit}>
          <fieldset className="sign__fieldset">
            {isRegistration &&
              <div className="sign__row">
                <label htmlFor="name" className="sign__label">Имя</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`sign__input ${errors.name === '' ? '' : 'sign__input_errored'}`}
                  required
                  value={nameValue}
                  onChange={handleNameChange}
                  minLength={2}
                  maxLength={30}
                />
                <span className={`sign__error ${isValid ? '' : 'sign__error_active'}`}>
                  {errors.name}
                </span>
              </div>

            }
            <div className="sign__row">
              <label htmlFor="email" className="sign__label">E-mail</label>
              <input
                id="email"
                name="email"
                type="email"
                className={`sign__input ${errors.email === '' ? '' : 'sign__input_errored'}`}
                required
                value={emailValue}
                onChange={handleEmailChange}
              />
              <span className={`sign__error ${isValid ? '' : 'sign__error_active'}`}>
                {errors.email}
              </span>
            </div>
            <div className="sign__row">
              <label htmlFor="password" className="sign__label">Пароль</label>
              <input
                id="password"
                name="password"
                type="password"
                className={`sign__input ${errors.password === '' ? '' : 'sign__input_errored'}`}
                required
                value={passwordValue}
                onChange={handlePasswordChange}
              />
              <span className={`sign__error ${isValid ? '' : 'sign__error_active'}`}>
                {errors.password}
              </span>
            </div>
          </fieldset>
          <div className="sign__bottom">
            {isRegistration
              ? <button type="submit"
                disabled={isValid ? false : true}
                className={`sign__btn ${isValid ? 'sign__btn_active' : ''}`}
              >
                Зарегистрироваться
              </button>
              : <button
                type="submit"
                disabled={isValid ? false : true}
                className={`sign__btn ${isValid ? 'sign__btn_active' : ''}`}>
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
};

export default SignForm;
