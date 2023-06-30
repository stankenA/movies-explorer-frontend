import React from 'react';
import './Placeholder.scss';

export default function Placeholder({ children }) {
  return (
    <p className="movies-placeholder">
      {children}
    </p>
  )
}
