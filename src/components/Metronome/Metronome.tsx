import * as Tone from 'tone';
import React, { useState, useEffect } from 'react';

import '../../styles/Metronome/Metronome.css';

export const Metronome = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [bpm, setBpm] = useState(120);
  const [isBeat, setIsBeat] = useState(false);

  const metronomeSynth = new Tone.MembraneSynth({
    pitchDecay: 0.01,
    oscillator: { type: 'sine' },
    envelope: {
      attack: 0.001,
      decay: 0.001,
      sustain: 0.01,
      release: 0.01,
      attackCurve: 'sine',
    },
  }).toDestination();

  let beatEventId: number | null = null;

  const toggleMetronome = async () => {
    await Tone.start();

    if (isPlaying) {
      Tone.Transport.cancel();
      setIsBeat(false);
      setIsPlaying(false);
      if (beatEventId !== null) {
        Tone.Transport.clear(beatEventId);
      }
    } else {
      Tone.Transport.bpm.value = bpm;

      beatEventId = Tone.Transport.scheduleRepeat((time) => {
        setIsBeat(true);
        setTimeout(() => setIsBeat(false), 100);

        metronomeSynth.triggerAttackRelease('C2', '8n', time);
      }, '4n');

      Tone.Transport.start();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    Tone.Transport.bpm.value = bpm;

    if (isPlaying) {
      toggleMetronome();
      toggleMetronome();
    }
  }, [bpm]);

  useEffect(() => {
    return () => {
      if (beatEventId !== null) {
        Tone.Transport.clear(beatEventId);
      }
      Tone.Transport.cancel();
    };
  }, []);

  return (
    <div className='metronome'>
      <h2>Metronome</h2>

      <button onClick={toggleMetronome}>
        {isPlaying ? '⏹ Stop' : '▶️ Run'}
      </button>

      <div className='controls'>
        <label>
          BPM:
          <input
            type='range'
            min='40'
            max='240'
            value={bpm}
            onChange={(e) => setBpm(Number(e.target.value))}
          />
          {bpm}
        </label>
      </div>
      <div className={`led ${isBeat ? 'active' : ''}`} />
    </div>
  );
};
