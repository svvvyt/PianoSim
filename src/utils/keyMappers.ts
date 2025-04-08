import { Note } from '../models/Note.ts';

export const createKeyToNoteMap = (
  currentNotes: Note[]
): Map<string, string> => {
  const keys = 'qwertyuiop[]'.split('');
  return new Map<string, string>(
    currentNotes.map((note, index) => [keys[index], note.name])
  );
};
