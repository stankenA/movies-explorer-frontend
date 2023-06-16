import React, { useState } from 'react'
import SignForm from '../../components/SignForm/SignForm'
import { useFormWithValidation } from '../../hooks/useFormWithValidation';
import Popup from '../../components/Popup/Popup';
import * as auth from '../../utils/auth.js';

export default function Login({ handleLogin }) {

  const [isPopupOpened, setIsPopupOpened] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormWithValidation();

  function handlePopupClose() {
    setIsPopupOpened(false);
  }

  function handleBgClose(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      setIsPopupOpened(false);
    }
  }

  async function signin(password, email) {
    try {
      const response = await auth.authorize(password, email);
      if (response.jwt) {
        handleLogin();
      }
    } catch (err) {
      setPopupMessage('Вы ввели неправильный логин или пароль.');
    } finally {
      setIsPopupOpened(true);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.password || !values.email) {
      return;
    }

    signin(values.password, values.email);
  }

  return (
    <>
      <SignForm
        isRegistration={false}
        handleChange={handleChange}
        onSubmit={handleSubmit}
        errors={errors}
        isValid={isValid}
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
