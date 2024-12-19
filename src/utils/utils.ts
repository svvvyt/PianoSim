export const playSound = (audioFile: string) => {
  const audio = new Audio(audioFile);
  audio.play();
};
