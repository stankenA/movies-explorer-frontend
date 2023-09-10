import React, { FC } from 'react';
import './Placeholder.scss';

const Placeholder: FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <p className="movies-placeholder">
      {children}
    </p>
  )
};

export default Placeholder;
