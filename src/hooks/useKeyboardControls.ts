import { useEffect, useRef } from 'react';
import { playSound, stopSound } from '../utils/playSound.ts';

export const useKeyboardControls = (
  keyToNoteMap: Map<string, string>,
  currentNotes: { name: string; audioFile: string }[],
  setActiveNotes: (setter: (prev: Set<string>) => Set<string>) => void,
  currentOctave: number,
  setCurrentOctave: (value: number) => void
) => {
  const audioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const noteName = keyToNoteMap.get(event.key);
      if (noteName) {
        if (!audioRefs.current.has(noteName)) {
          const note = currentNotes.find((n) => n.name === noteName);
          if (note) {
            const audio = playSound(note.audioFile);
            audioRefs.current.set(noteName, audio);
            setActiveNotes((prev) => new Set(prev).add(noteName));
          }
        }
      } else if (event.key === 'z' && currentOctave > 0) {
        setCurrentOctave(currentOctave - 1);
      } else if (event.key === 'x' && currentOctave < 8) {
        setCurrentOctave(currentOctave + 1);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const noteName = keyToNoteMap.get(event.key);
      if (noteName) {
        const audio = audioRefs.current.get(noteName);
        if (audio) {
          stopSound(audio);
          audioRefs.current.delete(noteName);
          setActiveNotes((prev) => {
            const newSet = new Set(prev);
            newSet.delete(noteName);
            return newSet;
          });
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      audioRefs.current.forEach(stopSound);
      audioRefs.current.clear();
    };
  }, [
    keyToNoteMap,
    currentNotes,
    setActiveNotes,
    currentOctave,
    setCurrentOctave,
  ]);
};
