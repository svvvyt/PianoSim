import React from 'react';

import '../../../styles/UI/OctaveIndicator/OctaveIndicator.css';

interface OctaveIndicatorProps {
  currentOctave: number;
}

export const OctaveIndicator: React.FC<OctaveIndicatorProps> = ({
  currentOctave,
}) => {
  return (
    <div className='octave-indicator'>Current octave: {currentOctave}</div>
  );
};
