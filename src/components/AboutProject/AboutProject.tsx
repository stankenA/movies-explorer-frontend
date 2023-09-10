import React, { FC } from 'react';

import './AboutProject.scss';

const AboutProject: FC = () => {
  return (
    <section className="project">
      <div className="project__wrapper">
        <h2 className="project__title">
          О проекте
        </h2>
        <div className="project__content">
          <div className="project__column">
            <h3 className="project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="project__description">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="project__column">
            <h3 className="project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="project__description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="project__plan">
          <div className="project__backend">
            <p className="project__txt project__txt_black">
              1 неделя
            </p>
          </div>
          <div className="project__frontend">
            <p className="project__txt">
              4 недели
            </p>
          </div>
          <p className="project__txt project__txt_grey">
            Back-end
          </p>
          <p className="project__txt project__txt_grey">
            Front-end
          </p>
        </div>
      </div>
    </section>
  )
};

export default AboutProject;
