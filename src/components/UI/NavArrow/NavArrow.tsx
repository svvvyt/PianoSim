import React from 'react';

import '../../../styles/UI/NavArrow/NavArrow.css';

interface NavArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
}

export const NavArrow: React.FC<NavArrowProps> = ({ direction, onClick }) => {
  return (
    <button className='nav-arrow' onClick={onClick}>
      {direction === 'left' ? '<' : '>'}
    </button>
  );
};
