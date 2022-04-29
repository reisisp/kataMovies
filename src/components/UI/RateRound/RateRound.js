import React from 'react';
import './RateRound.css';

export const RateRound = ({ children, color }) => {
  return (
    <span style={{ border: `2px solid ${color}` }} className="rateRound">
      <span className="rateRound__text">{children}</span>
    </span>
  );
};
