import React, { FC } from 'react';

import './Popup.scss';
import checkIcon from '../../images/check-icon.svg';
import warningIcon from '../../images/warning-icon.svg';
import { TPopupProps } from '../../utils/types/types';

const Popup: FC<TPopupProps> = ({ isPoupOpened, onClose, onBgClose, popupMessage, isSuccessfull }) => {
  return (
    <div className={`popup ${isPoupOpened ? 'popup_opened' : ''}`} onClick={onBgClose}>
      <div className="popup__wrapper">
        <img src={isSuccessfull ? checkIcon : warningIcon} alt="Статус" className="popup__img" />
        <p className="popup__txt">
          {popupMessage}
        </p>
        <button
          type="button"
          className="popup__close"
          onClick={onClose}
        ></button>
      </div>
    </div>
  )
};

export default Popup;
