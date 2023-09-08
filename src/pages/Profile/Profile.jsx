import React, { useContext, useEffect, useState } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { UserContext } from '../../contexts/CurrentUserContext';
import MainApi from '../../utils/api/MainApi';

import './Profile.scss';
import { BASE_URL } from '../../utils/constants';

export default function Profile({ handleLogout, changeCurrentUser }) {

  const currentUser = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isNewData, setIsNewData] = useState(false); // стейт для проверки отличия текущих данных в инпуте с новыми

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormWithValidation(currentUser);

  // API
  const mainApi = new MainApi({
    url: BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  useEffect(() => {
    setValues({ name: currentUser.name, email: currentUser.email });
  }, [currentUser]);

  function checkUnique() {
    if (currentUser.name === values.name && currentUser.email === values.email) {
      setIsNewData(false);
    } else {
      setIsNewData(true);
    }
  }

  useEffect(() => {
    checkUnique();
  }, [values]);

  async function handleUpdateUser() {
    setIsLoading(true);
    try {
      const response = await mainApi.updateCurrentUser(values.name, values.email);
      changeCurrentUser(response);
      setIsEditing(false);
      setSubmitError('');
      setIsNewData(false);
    } catch (err) {
      if (err.status === 409) {
        setSubmitError('Пользователь с таким email уже существует.');
        return;
      }

      setSubmitError('При регистрации пользователя произошла ошибка.');
    } finally {
      setIsLoading(false);
    }
  }

  function saveNewInfo(evt) {
    evt.preventDefault();

    handleUpdateUser();
  }

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h2 className="profile__title">
          Привет, {currentUser.name}!
        </h2>
        <form id="profile" className="profile__form">
          <div className="profile__row">
            <label htmlFor="name" className="profile__label profile__txt">Имя</label>
            <input
              id="name"
              name="name"
              type="text"
              className={`profile__input profile__txt ${errors.name ? 'profile__input_errored' : ''}`}
              placeholder="Введите ваше имя"
              value={values.name || ''}
              onChange={handleChange}
              disabled={!isEditing}
              minLength={2}
              maxLength={30}
              required
            />
            <span className={`profile__error ${isValid ? '' : 'profile__error_active'}`}>
              {errors.name}
            </span>
          </div>
          <span className="profile__line"></span>
          <div className="profile__row">
            <label htmlFor="email" className="profile__label profile__txt">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className={`profile__input profile__txt ${errors.mail ? 'profile__input_errored' : ''}`}
              placeholder="Введите ваш e-mail"
              value={values.email || ''}
              onChange={handleChange}
              disabled={!isEditing}
              required
            />
            <span className={`profile__error ${isValid ? '' : 'profile__error_active'}`}>
              {errors.email}
            </span>
          </div>
        </form>
        {isEditing
          ? <div className="profile__editing">
            <p className="profile__error-submit">
              {submitError}
            </p>
            <button
              form="profile"
              type="submit"
              className={`profile__save ${isValid && isNewData ? 'profile__save_active' : ''}`}
              onClick={saveNewInfo}
              disabled={isValid && isNewData ? false : true}
            >
              {isLoading ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
          : <div className="profile__container">
            <button
              type="button"
              className="profile__edit"
              onClick={() => setIsEditing(true)}
            >Редактировать
            </button>
            <button
              type="button"
              className="profile__signout"
              onClick={handleLogout}
            >Выйти из аккаунта
            </button>
          </div>}

      </div>
    </section>
  )
}
