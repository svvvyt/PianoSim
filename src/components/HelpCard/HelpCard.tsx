import React from 'react';
import '../../styles/HelpCard/HelpCard.css';

export const HelpCard: React.FC = () => {
  return (
    <div className='help-card'>
      <p>
        <strong>Keyboard controls:</strong>
      </p>
      <p>
        Notes: <code>Q W E R T Y U I O P [ ]</code> (C to B)
      </p>
      <p>
        Octaves: <code>Z</code> (previous), <code>X</code> (next)
      </p>
      <p>Check that your keyboard is set to English!</p>
    </div>
  );
};
