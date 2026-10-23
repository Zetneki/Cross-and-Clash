export interface TimerContextModule {
  isTimerVisible: boolean;
  setIsTimerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isTimerRunning: boolean;
  setIsTimerRunning: React.Dispatch<React.SetStateAction<boolean>>;
  elapsedTime: number;
  setElapsedTime: React.Dispatch<React.SetStateAction<number>>;
}
