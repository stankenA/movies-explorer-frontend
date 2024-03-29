import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { currentYear } from '../../utils/constants';
import './Footer.scss';

const Footer: FC = () => {

  return (
    <footer className="footer">
      <div className="footer__wrapper">
        <h4 className="footer__title">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </h4>
        <div className="footer__content">
          <p className="footer__txt footer__txt_year">
            &#64; {currentYear}
          </p>
          <Link to='https://practicum.yandex.ru/' target="_blank" className="footer__link">
            <p className="footer__txt">
              Яндекс.Практикум
            </p>
          </Link>
          <Link to='https://github.com/stankenA' target="_blank" className="footer__link">
            <p className="footer__txt">
              Github
            </p>
          </Link>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
