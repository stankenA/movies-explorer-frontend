import React from 'react';

import './AboutProject.scss';

export default function AboutProject() {
  return (
    <section className="about">
      <div className="about__wrapper">
        <h2 className="about__title">
          О проекте
        </h2>
        <div className="about__content">
          <div className="about__column">
            <h3 className="about__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about__description">
              Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
            </p>
          </div>
          <div className="about__column">
            <h3 className="about__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about__description">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about__plan">
          <div className="about__backend">
            <p className="about__txt about__txt_black">
              1 неделя
            </p>
          </div>
          <div className="about__frontend">
            <p className="about__txt">
              4 недели
            </p>
          </div>
          <p className="about__txt about__txt_grey">
            Back-end
          </p>
          <p className="about__txt about__txt_grey">
            Front-end
          </p>
        </div>
      </div>
    </section>
  )
}
