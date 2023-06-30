import { useState, useEffect } from 'react';

import { screenWidths } from '../utils/constants';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (evt) => {
      setWidth(evt.target.innerWidth);
    };

    // Дебаунсим, чтобы слишком часто не срабатывал
    let timeout;

    window.addEventListener('resize', (evt) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        handleResize(evt);
      }, 500)
    });
  }, []);

  return {
    isMobile: width >= screenWidths.mobie,
    isTablet: width >= screenWidths.tablet,
    isDesktop: width >= screenWidths.desktop,
  };
};
