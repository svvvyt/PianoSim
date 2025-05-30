import { Note, notePattern } from '../models/Note.ts';

const octaveLimits = new Map<string, { min: number; max: number }>([
  ['C', { min: 1, max: 8 }],
  ['Db', { min: 1, max: 8 }],
  ['D', { min: 1, max: 7 }],
  ['Eb', { min: 1, max: 7 }],
  ['E', { min: 1, max: 7 }],
  ['F', { min: 1, max: 7 }],
  ['Gb', { min: 1, max: 7 }],
  ['G', { min: 1, max: 7 }],
  ['Ab', { min: 1, max: 7 }],
  ['A', { min: 0, max: 7 }],
  ['Bb', { min: 0, max: 7 }],
  ['B', { min: 0, max: 7 }],
]);

export const generateNotes = (
  startOctave: number,
  endOctave: number
): Note[] => {
  const notes: Note[] = [];
  for (let octave = startOctave; octave <= endOctave; octave++) {
    notePattern.forEach(({ name, type }) => {
      const limits = octaveLimits.get(name);
      if (limits && octave >= limits.min && octave <= limits.max) {
        notes.push({
          name: `${name}${octave}`,
          type,
          octave,
        });
      }
    });
  }
  return notes;
};

export const notes = generateNotes(0, 8);
