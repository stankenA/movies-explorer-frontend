import { useState, useEffect } from 'react';

import { screenWidths } from '../utils/constants';

export const useResize = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    // Дебаунс
    let timeout: NodeJS.Timeout;

    window.addEventListener('resize', () => {
      clearTimeout(timeout);

      timeout = setTimeout(handleResize, 500)
    });
  }, []);

  return {
    isMobile: width >= screenWidths.mobie,
    isTablet: width >= screenWidths.tablet,
    isDesktop: width >= screenWidths.desktop,
  };
};
