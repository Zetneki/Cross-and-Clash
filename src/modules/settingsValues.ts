import type { DifficultyType } from "../types/difficultyType";
import type { GameType } from "../types/gameType";

export interface SettingsValues {
  historyMode: boolean;
  scoreBoardMode: boolean;
  boardSize: number;
  winningAnimationMode: boolean;
  gameMode: GameType;
  difficulty: DifficultyType;
  sound: boolean;
}

// theme,
// timer,
// winningAnimation
