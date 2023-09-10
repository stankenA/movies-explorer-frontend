import React, { FC } from 'react';

import './Preloader.scss';
import preloaderIcon from '../../images/loader-icon.svg';

const Preloader: FC = () => {
  return (
    <div className="preloader">
      <img src={preloaderIcon} alt="Иконка загрузки" className="preloader__img" />
    </div>
  )
};

export default Preloader;
