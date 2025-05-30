import React, { useState, useMemo } from 'react';

import { Key } from '../Key/Key.tsx';
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
  const [noteSequence, setNoteSequence] = useState<
    { note: string; duration: string }[]
  >([]);

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

  // Добавление ноты в последовательность
  const addNoteToSequence = (note: string) => {
    setNoteSequence((prev) => [...prev, { note, duration: 'q' }]);
  };

  return (
    <>
      <div className='board-container'>
        <NavArrow direction='left' onClick={() => handleOctaveChange('prev')} />
        <div className='board'>
          {currentNotes.map((note) => (
            <Key
              key={note.name}
              note={note}
              isActive={activeNotes.has(note.name)}
              onNotePlayed={() => addNoteToSequence(note.name)} // Передаем ноту в нотный стан
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
