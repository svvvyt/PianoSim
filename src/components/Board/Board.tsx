import React, { useState, useMemo } from 'react';

import { Button } from '../Button/Button.tsx';
import { HelpCard } from '../HelpCard/HelpCard.tsx';
import { OctaveIndicator } from '../UI/OctaveIndicator/OctaveIndicator.tsx';
import { NavArrow } from '../UI/NavArrow/NavArrow.tsx';

import { notes } from '../../utils/generateNotes.ts';

import { createKeyToNoteMap } from '../../utils/keyMappers.ts';
import { useKeyboardControls } from '../../hooks/useKeyboardControls.ts';

import '../../styles/Board/Board.css';

export const Board: React.FC = () => {
  const [currentOctave, setCurrentOctave] = useState<number>(4);
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());

  const currentNotes = useMemo(
    () => notes.filter((note) => note.octave === currentOctave),
    [currentOctave]
  );

  const keyToNoteMap = useMemo(
    () => createKeyToNoteMap(currentNotes),
    [currentNotes]
  );

  useKeyboardControls(
    keyToNoteMap,
    currentNotes,
    setActiveNotes,
    currentOctave,
    setCurrentOctave
  );

  const handleOctaveChange = (direction: 'prev' | 'next'): void => {
    if (direction === 'prev' && currentOctave > 0)
      setCurrentOctave(currentOctave - 1);
    if (direction === 'next' && currentOctave < 8)
      setCurrentOctave(currentOctave + 1);
  };

  return (
    <>
      <div className='board-container'>
        <NavArrow direction='left' onClick={() => handleOctaveChange('prev')} />
        <div className='board'>
          {currentNotes.map((note) => (
            <Button
              key={note.name}
              note={note}
              isActive={activeNotes.has(note.name)}
            />
          ))}
        </div>
        <NavArrow
          direction='right'
          onClick={() => handleOctaveChange('next')}
        />
      </div>
      <OctaveIndicator currentOctave={currentOctave} />
      <HelpCard />
    </>
  );
};
