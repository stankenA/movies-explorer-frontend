import React, { useState } from 'react';
import SignForm from '../../components/SignForm/SignForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Popup from '../../components/Popup/Popup';
import * as auth from '../../utils/auth.js';

export default function Registration({ handleLogin }) {

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormWithValidation();

  async function signup(password, email, name) {
    try {
      const response = await auth.register(name, password, email);
      if (response) {
        setIsSuccessfull(true);
        setPopupMessage('Вы успешно зарегистрировались!');

        const authorization = await auth.authorize(password, email);
        if (authorization.jwt) {
          handleLogin();
        }
      }
    } catch (err) {
      setIsSuccessfull(false);

      if (err.status === 409) {
        setPopupMessage('Пользователь с таким email уже существует.');
        return;
      }

      setPopupMessage('При регистрации пользователя произошла ошибка.');
    } finally {
      setIsPopupOpened(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.password || !values.email || !values.name) {
      return;
    }

    signup(values.password, values.email, values.name);
  }

  function handlePopupClose() {
    setIsPopupOpened(false);
  }

  function handleBgClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      setIsPopupOpened(false);
    }
  }

  return (
    <>
      <SignForm
        isRegistration={true}
        handleChange={handleChange}
        errors={errors}
        isValid={isValid}
        onSubmit={handleSubmit}
      />
      <Popup
        isPoupOpened={isPopupOpened}
        onClose={handlePopupClose}
        onBgClose={handleBgClose}
        popupMessage={popupMessage}
        isSuccessfull={isSuccessfull}
      />
    </>
  )
}
