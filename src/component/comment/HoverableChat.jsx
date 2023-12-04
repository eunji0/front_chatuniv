import React, { useState } from 'react';

export const HoverableChat = ({ onClick, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children(isHovered)}
    </div>
  );
};
