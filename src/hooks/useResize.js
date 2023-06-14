import { useState, useEffect } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (evt) => {
      setWidth(evt.target.innerWidth);
    };

    let timeout;

    window.addEventListener('resize', (evt) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        handleResize(evt);
      }, 500)
    });
  }, []);

  return {
    isMobile: width >= 320,
    isTablet: width >= 768,
    isDesktop: width >= 1280,
  };
};
