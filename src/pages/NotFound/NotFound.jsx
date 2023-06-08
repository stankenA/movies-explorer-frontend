import React from 'react';
import { useNavigate } from 'react-router-dom';

import './NotFound.scss';

export default function NotFound() {

  const navigate = useNavigate();

  return (
    <section className="not-found">
      <div className="not-found__container">
        <h1 className="not-found__title">
          404
        </h1>
        <p className="not-found__description">
          Страница не найдена
        </p>
      </div>
      <button type="button" className="not-found__btn" onClick={() => navigate(-1)}>Назад</button>
    </section>
  )
}
