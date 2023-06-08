import React from 'react';
import { Link } from 'react-router-dom';
import './AboutMe.scss';

import aboutImg from '../../images/about-img.jpg';
import Portfolio from '../Portfolio/Portfolio';

export default function AboutMe() {
  return (
    <section className="about">
      <div className="about__wrapper">
        <h2 className="about__title">
          Студент
        </h2>
        <div className="about__content">
          <div className="about__info">
            <h3 className="about__name">
              Виталий
            </h3>
            <p className="about__subtitle">
              Фронтенд-разработчик, 30 лет
            </p>
            <p className="about__txt">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link to="https://github.com/stankenA" className="about__link" target="_blank">
              Github
            </Link>
          </div>
          <img src={aboutImg} alt="фото студента" className="about__img" />
        </div>
        <Portfolio />
      </div>
    </section>
  )
}
