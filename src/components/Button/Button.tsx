import React from 'react';

import { Note } from '../../models/Note.ts';

import { playSound } from '../../utils/utils.ts';

import '../../styles/Button/Button.css';

interface ButtonProps {
  note: Note;
}

export const Button: React.FC<ButtonProps> = ({ note }) => {
  const handleClick = () => {
    playSound(note.audioFile);
  };

  return (
    <button className={`button button-${note.type}`} onClick={handleClick}>
      {note.name}
    </button>
  );
};
