import React, { useState } from 'react';

import { Button } from '../Button/Button.tsx';
import { OctaveIndicator } from '../UI/OctaveIndicator/OctaveIndicator.tsx';
import { NavArrow } from '../UI/NavArrow/NavArrow.tsx';

import { notes } from '../../models/Note.ts';

import '../../styles/Board/Board.css';

export const Board: React.FC = () => {
  const [currentOctave, setCurrentOctave] = useState(4); // Default octave = 4

  const currentNotes = notes.filter((note) => note.octave === currentOctave);

  const handlePreviousOctave = () => {
    if (currentOctave > 0) setCurrentOctave(currentOctave - 1);
  };

  const handleNextOctave = () => {
    if (currentOctave < 8) setCurrentOctave(currentOctave + 1);
  };

  return (
    <>
      <div className='board-container'>
        <NavArrow direction='left' onClick={handlePreviousOctave} />
        <div className='board'>
          {currentNotes.map((note) => (
            <Button key={note.name} note={note} />
          ))}
        </div>
        <NavArrow direction='right' onClick={handleNextOctave} />
      </div>
      <OctaveIndicator currentOctave={currentOctave} />
    </>
  );
};
