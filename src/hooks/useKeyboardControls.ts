import { useEffect, useRef } from 'react';
import { playNote, stopAllSounds } from '../utils/sound.ts';

export const useKeyboardControls = (
  keyToNoteMap: Map<string, string>,
  currentNotes: { name: string }[],
  setActiveNotes: (setter: (prev: Set<string>) => Set<string>) => void,
  currentOctave: number,
  setCurrentOctave: (value: number) => void
) => {
  const activeNotes = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const noteName = keyToNoteMap.get(event.key);
      if (noteName && !activeNotes.current.has(noteName)) {
        await playNote(noteName);
        activeNotes.current.add(noteName);
        setActiveNotes((prev) => new Set(prev).add(noteName));
      } else if (event.key === 'z' && currentOctave > 0) {
        setCurrentOctave(currentOctave - 1);
      } else if (event.key === 'x' && currentOctave < 8) {
        setCurrentOctave(currentOctave + 1);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const noteName = keyToNoteMap.get(event.key);
      if (noteName) {
        activeNotes.current.delete(noteName);
        stopAllSounds();
        setActiveNotes((prev) => {
          const newSet = new Set(prev);
          newSet.delete(noteName);
          return newSet;
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      stopAllSounds();
    };
  }, [
    keyToNoteMap,
    currentNotes,
    setActiveNotes,
    currentOctave,
    setCurrentOctave,
  ]);
};
