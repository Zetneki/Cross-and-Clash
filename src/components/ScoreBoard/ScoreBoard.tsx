import { COMPUTER_ID } from "../../constants/computer";
import type { Player } from "../../modules/player";
import type { PlayerStats } from "../../modules/playerStats";
import type { CurrentPlayerId } from "../../types/currentPlayerId";
import type { GameType } from "../../types/gameType";
import type { PlayerSymbol } from "../../types/playerSymbol";
import "./ScoreBoard.scss";

function Scoreboard({
  playersStats,
  players,
  gameMode,
  currentPlayers,
}: {
  playersStats: PlayerStats[];
  players: Player[];
  gameMode: GameType;
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>;
}) {
  if (gameMode === "computer-vs-computer")
    return <div>Computer vs Computer games don't have a scoreboard</div>;
  const humanPlayerId =
    currentPlayers.X === COMPUTER_ID ? currentPlayers.O : currentPlayers.X;
  const visibleStats =
    gameMode === "human-vs-computer"
      ? playersStats.filter((stat) => stat.id === humanPlayerId)
      : playersStats;

  return (
    <table className="scoreboard">
      <thead className="scoreboard__header">
        <tr className="scoreboard__header-row">
          <td className="scoreboard__header-cell">Player</td>
          <td className="scoreboard__header-cell">Wins</td>
          <td className="scoreboard__header-cell">Draws</td>
          <td className="scoreboard__header-cell">Losses</td>
        </tr>
      </thead>
      <tbody className="scoreboard__body">
        {visibleStats
          .sort((a, b) => b.wins - a.wins)
          .map((stat) => (
            <tr key={stat.id} className="scoreboard__row">
              <td className="scoreboard__cell">
                {players.find((player) => player.id === stat.id)?.name ??
                  "Unknown"}
              </td>
              <td className="scoreboard__cell">{stat.wins}</td>
              <td className="scoreboard__cell">{stat.draws}</td>
              <td className="scoreboard__cell">{stat.losses}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}

export default Scoreboard;
