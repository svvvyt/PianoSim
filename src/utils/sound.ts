import * as Tone from 'tone';

// const synth = new Tone.Synth().toDestination();

// export const playNote = async (
//   note: string,
//   duration: string = '1n'
// ): Promise<void> => {
//   await Tone.start();
//   synth.triggerAttackRelease(note, duration);
// };

// export const stopAllSounds = (): void => {
//   synth.triggerRelease();
// };

// const polySynth = new Tone.PolySynth(Tone.Synth, {
//   oscillator: { type: 'sine' },
//   envelope: {
//     attack: 0.02,
//     decay: 0.1,
//     sustain: 0.3,
//     release: 0.5,
//   },
// }).toDestination();

const polySynth = new Tone.PolySynth(Tone.Synth).toDestination();

export const playNote = async (
  note: string,
  duration: string = '1n'
): Promise<void> => {
  await Tone.start();
  polySynth.triggerAttackRelease(note, duration);
};

export const stopAllSounds = (): void => {
  polySynth.releaseAll();
};
