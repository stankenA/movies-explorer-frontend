import React from 'react';
import { Link } from 'react-router-dom';
import './Promo.scss';
import bannerPicture from '../../images/promo.png';

export default function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__block">
          <h1 className="promo__title">
            Учебный проект студента факультета <br />
            Веб-разработки.
          </h1>
          <p className="promo__txt">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <Link to='#' className="promo__link">
            Узнать больше
          </Link>
        </div>
        <img src={bannerPicture} alt="banner picture" className="promo__img" />
      </div>
    </section>
  )
}
