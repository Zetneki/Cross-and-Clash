import type { Player } from "../modules/player";
import type { PlayerSymbol } from "../types/playerSymbol";
import type { CurrentPlayerId } from "../types/currentPlayerId";
import type { GameType } from "../types/gameType";
import { COMPUTER_ID } from "../constants/computer";

export function getPlayerName(
  players: Player[],
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>,
  playerSymbol: PlayerSymbol,
  gameMode: GameType,
): string {
  const currentPlayerId = currentPlayers[playerSymbol];

  if (gameMode === "computer-vs-computer") {
    return playerSymbol === "X" ? "Computer 1 (X)" : "Computer 2 (O)";
  }

  return (
    players.find((player) => player.id === currentPlayerId)?.name ??
    (currentPlayerId === COMPUTER_ID ? "Computer" : `Player ${playerSymbol}`)
  );
}
