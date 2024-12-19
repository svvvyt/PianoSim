export interface Note {
  name: string;
  audioFile: string;
  type: 'regular' | 'flat';
  octave: number;
}

const notePattern: { name: string; type: 'regular' | 'flat' }[] = [
  { name: 'C', type: 'regular' },
  { name: 'Db', type: 'flat' },
  { name: 'D', type: 'regular' },
  { name: 'Eb', type: 'flat' },
  { name: 'E', type: 'regular' },
  { name: 'F', type: 'regular' },
  { name: 'Gb', type: 'flat' },
  { name: 'G', type: 'regular' },
  { name: 'Ab', type: 'flat' },
  { name: 'A', type: 'regular' },
  { name: 'Bb', type: 'flat' },
  { name: 'B', type: 'regular' },
];

export const generateNotes = (
  startOctave: number,
  endOctave: number
): Note[] => {
  const notes: Note[] = [];
  for (let octave = startOctave; octave <= endOctave; octave++) {
    notePattern.forEach((note) => {
      if (
        (note.name === 'C' && octave >= 1 && octave <= 8) ||
        (note.name === 'Db' && octave >= 1 && octave <= 8) ||
        (note.name === 'D' && octave >= 1 && octave <= 7) ||
        (note.name === 'Eb' && octave >= 1 && octave <= 7) ||
        (note.name === 'E' && octave >= 1 && octave <= 7) ||
        (note.name === 'F' && octave >= 1 && octave <= 7) ||
        (note.name === 'Gb' && octave >= 1 && octave <= 7) ||
        (note.name === 'G' && octave >= 1 && octave <= 7) ||
        (note.name === 'Ab' && octave >= 1 && octave <= 7) ||
        (note.name === 'A' && octave >= 0 && octave <= 7) ||
        (note.name === 'Bb' && octave >= 0 && octave <= 7) ||
        (note.name === 'B' && octave >= 0 && octave <= 7)
      ) {
        notes.push({
          name: `${note.name}${octave}`,
          audioFile: `/sounds/${note.name}${octave}.mp3`,
          type: note.type,
          octave: octave,
        });
      }
    });
  }
  return notes;
};

export const notes = generateNotes(0, 8);
