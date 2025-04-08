export const playSound = (audioFile: string): HTMLAudioElement => {
  try {
    const audio = new Audio(audioFile);
    audio
      .play()
      .catch((error) => console.error(`Failed to play ${audioFile}:`, error));
    return audio;
  } catch (error) {
    console.error('Error creating audio:', error);
    throw error;
  }
};

export const stopSound = (audio: HTMLAudioElement | null): void => {
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
};
