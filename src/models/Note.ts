export interface Note {
  name: string;
  audioFile: string;
  type: 'regular' | 'flat';
  octave: number;
}

export const notePattern: ReadonlyArray<{
  name: string;
  type: 'regular' | 'flat';
}> = [
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
