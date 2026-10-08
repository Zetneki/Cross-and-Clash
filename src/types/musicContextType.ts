export type MusicContextType = {
  musicEnabled: boolean;
  setMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  musicVolume: number;
  setMusicVolume: React.Dispatch<React.SetStateAction<number>>;
  ducked: boolean;
  setDucked: React.Dispatch<React.SetStateAction<boolean>>;
};
