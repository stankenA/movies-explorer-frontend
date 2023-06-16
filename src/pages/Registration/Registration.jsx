import React from 'react';
import SignForm from '../../components/SignForm/SignForm';
import { useFormWithValidation } from '../../hooks/useFormWithValidation';

export default function Login({ handleLogin }) {

  const { values, handleChange, errors, isValid, setValues, resetForm } = useFormWithValidation();

  console.log(values, isValid);

  function handleSubmit(evt) {
    evt.preventDefault();
    if (!values.password || !values.email) {
      return;
    }
    handleLogin(values.password, values.email);
  }

  return (
    <>
      <SignForm
        isRegistration={true}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        errors={errors}
        isValid={isValid}
      />
    </>
  )
}
