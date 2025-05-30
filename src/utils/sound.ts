import * as Tone from 'tone';

const synth = new Tone.Synth().toDestination();

export const playNote = async (
  note: string,
  duration: string = '8n'
): Promise<void> => {
  await Tone.start();
  synth.triggerAttackRelease(note, duration);
};

export const stopAllSounds = (): void => {
  synth.triggerRelease();
};
