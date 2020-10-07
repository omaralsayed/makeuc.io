import React from 'react';

const SponsorCard = ({ className, children, style = {} }) => (
  <div
    className={`${className}`}
  >
    {children}
  </div>
);

export default SponsorCard;