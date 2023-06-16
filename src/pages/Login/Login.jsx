import React, { useState } from 'react'
import SignForm from '../../components/SignForm/SignForm'
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Popup from '../../components/Popup/Popup';
import * as auth from '../../utils/auth.js';

export default function Login({ handleLogin }) {

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormWithValidation();

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    handleLogin(values.password, values.email);
  }

  function handlePopupOpen() {
    setIsPopupOpened(true);
  }

  function handlePopupClose() {
    setIsPopupOpened(false);
  }

  function handleBgClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      setIsPopupOpened(false);
    }
  }

  async function handleRegistration(password, email) {
    try {
      const response = await auth.register(password, email);
      if (response) {
        setPopupMessage('Вы успешно зарегистрировались!');
      }
    } catch (err) {
      console.log(err);
      setPopupMessage('При регистрации пользователя произошла ошибка');
    } finally {
      setIsPopupOpened(true);
    }
  }

  return (
    <>
      <SignForm
        isRegistration={false}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        isValid={isValid}
      />
    </>
  )
}
