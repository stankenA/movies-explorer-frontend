import React from 'react';
import { Link } from 'react-router-dom';
import './Portfolio.scss';
import { portfolioArr } from '../../utils/constants';

export default function Portfolio() {
  return (
    <>
      <h4 className="portfolio__title">
        Портфолио
      </h4>
      <ul className="portfolio__list">
        {portfolioArr.map((el) => (
          <li className="portfolio__item" key={el.name}>
            <Link className="portfolio__link" to={el.link} target="_blank">
              {el.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
