import React, { useRef, useState } from 'react';

import { Note } from '../../models/Note.ts';
import { playSound, stopSound } from '../../utils/playSound.ts';

import '../../styles/Button/Button.css';

interface ButtonProps {
  note: Note;
  isActive: boolean;
}

export const Button: React.FC<ButtonProps> = ({ note, isActive }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPressed, setIsPressed] = useState(false);

  const handleStart = () => {
    audioRef.current = playSound(note.audioFile);
    setIsPressed(true);
  };

  const handleStop = () => {
    stopSound(audioRef.current);
    audioRef.current = null;
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
