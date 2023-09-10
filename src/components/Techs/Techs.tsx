import React, { FC } from 'react';
import { techsArr } from '../../utils/constants';

import './Techs.scss';

const Techs: FC = () => {

  return (
    <section className="techs">
      <div className="techs__wrapper">
        <h2 className="techs__title">
          Технологии
        </h2>
        <div className="techs__content">
          <h3 className="techs__subtitle">
            7 технологий
          </h3>
          <p className="techs__txt">
            На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
          </p>
        </div>
        <ul className="techs__list">
          {techsArr.map((tech) => (
            <li className="techs__item" key={tech}>
              {tech}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
};

export default Techs;
