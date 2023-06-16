import React, { useContext, useState } from 'react';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import { UserContext } from '../../contexts/CurrentUserContext';

import './Profile.scss';

export default function Profile({ handleLogout }) {

  const currentUser = useContext(UserContext);

  const [isEditing, setIsEditing] = useState(false);
  const [nameValue, setNameValue] = useState(currentUser.name);
  const [emailValue, setEmailValue] = useState(currentUser.email);

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormWithValidation();

  console.log(values)

  function handleNameChange(evt) {
    setNameValue(evt.target.value);
    handleChange(evt);
  }

  function handleEmailChange(evt) {
    setEmailValue(evt.target.value);
    handleChange(evt);
  }

  function saveNewInfo(evt) {
    evt.preventDefault();
    setIsEditing(false);
  }

  return (
    <section className="profile">
      <div className="profile__wrapper">
        <h2 className="profile__title">
          Привет, Виталий!
        </h2>
        <form id="profile" className="profile__form">
          <div className="profile__row">
            <label htmlFor="name" className="profile__label profile__txt">Имя</label>
            <input
              id="name"
              name="name"
              type="text"
              className="profile__input profile__txt"
              placeholder="Введите ваше имя"
              value={nameValue}
              onChange={handleNameChange}
              disabled={!isEditing}
              required
            />
          </div>
          <span className="profile__line"></span>
          <div className="profile__row">
            <label htmlFor="email" className="profile__label profile__txt">E-mail</label>
            <input
              id="email"
              name="email"
              type="email"
              className="profile__input profile__txt"
              placeholder="Введите ваш e-mail"
              value={emailValue}
              onChange={handleEmailChange}
              disabled={!isEditing}
              required
            />
          </div>
        </form>
        {isEditing
          ? <div className="profile__editing">
            <p className="profile__error">При обновлении профиля произошла ошибка.</p>
            <button
              form="profile"
              type="submit"
              className="profile__save"
              onClick={saveNewInfo}
            >Сохранить
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
