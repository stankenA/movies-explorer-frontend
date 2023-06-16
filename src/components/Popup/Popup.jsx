import React from 'react';

import './Popup.scss';
import checkIcon from '../../images/check-icon.svg';
import warningIcon from '../../images/warning-icon.svg';

export default function Popup({ isPoupOpened, onClose, onBgClose, popupMessage }) {
  return (
    <div className={`popup ${isPoupOpened ? 'popup_opened' : ''}`} onClick={onBgClose}>
      <div className="popup__wrapper">
        <img src={warningIcon} alt="Статус" className="popup__img" />
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
}
