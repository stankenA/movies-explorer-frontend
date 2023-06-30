import React from 'react';

import './Preloader.scss';
import preloaderIcon from '../../images/loader-icon.svg';

export default function Preloader() {
  return (
    <div className="preloader">
      <img src={preloaderIcon} alt="Иконка загрузки" className="preloader__img" />
    </div>
  )
}
