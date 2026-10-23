export interface SoundContextModule {
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  soundVolume: number;
  setSoundVolume: React.Dispatch<React.SetStateAction<number>>;
}
