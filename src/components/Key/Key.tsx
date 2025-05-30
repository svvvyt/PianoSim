import React, { useState } from 'react';
import { Note } from '../../models/Note.ts';
import { playNote, stopAllSounds } from '../../utils/sound.ts';

import '../../styles/Key/Key.css';

interface KeyProps {
  note: Note;
  isActive: boolean;
  onNotePlayed?: (note: string) => void;
}

export const Key: React.FC<KeyProps> = ({ note, isActive, onNotePlayed }) => {
  const [isPressed, setIsPressed] = useState(false);

  const handleStart = async () => {
    await playNote(`${note.name}`);
    setIsPressed(true);
    onNotePlayed?.(note.name);
  };

  const handleStop = () => {
    stopAllSounds();
    setIsPressed(false);
  };

  const isButtonActive = isActive || isPressed;

  return (
    <button
      className={`button button-${note.type} ${isButtonActive ? 'active' : ''}`}
      onMouseDown={handleStart}
      onMouseUp={handleStop}
      onMouseLeave={handleStop}
      onTouchStart={handleStart}
      onTouchEnd={handleStop}
    >
      {note.name}
    </button>
  );
};
