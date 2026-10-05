import { useState } from "react";
import type { Player } from "../../../modules/player";
import "./PlayerManagement.scss";
import type { PlayerSymbol } from "../../../types/playerSymbol";
import type { GameType } from "../../../types/gameType";
import type { CurrentPlayerId } from "../../../types/currentPlayerId";
import type { PlayerStats } from "../../../modules/playerStats";

function PlayerManagement({
  players,
  playersStats,
  setPlayersStats,
  currentPlayers,
  onCreatePlayer,
  onDeletePlayer,
  onSelectPlayer,
  gameMode,
}: {
  players: Player[];
  playersStats: PlayerStats[];
  setPlayersStats: (stats: PlayerStats[]) => void;
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>;
  onCreatePlayer: (name: string) => string | null;
  onDeletePlayer: (id: string) => void;
  onSelectPlayer: (playerId: string, playerSymbol: PlayerSymbol) => void;
  gameMode: GameType;
}) {
  const [playerName, setPlayerName] = useState<string>("");

  function handleCreatePlayer() {
    const newPlayerId = onCreatePlayer(playerName);
    if (newPlayerId) {
      addPlayerStats(newPlayerId);
    }
    setPlayerName("");
  }

  function addPlayerStats(playerId: string) {
    const newPlayersStats = [...playersStats];
    newPlayersStats.push({
      id: playerId,
      wins: 0,
      draws: 0,
      losses: 0,
    });
    setPlayersStats(newPlayersStats);
  }

  function resetPlayerStats(playerId: string) {
    const confirmReset = window.confirm(
      "Are you sure you want to reset this player's stats?",
    );

    if (!confirmReset) return;
    const newPlayersStats = [...playersStats];
    newPlayersStats.find((stat) => {
      stat.id === playerId &&
        ((stat.wins = 0), (stat.draws = 0), (stat.losses = 0));
    });

    setPlayersStats(newPlayersStats);
  }

  function resetAllPlayerStats() {
    const confirmReset = window.confirm(
      "Are you sure you want to reset all players' stats?",
    );

    if (!confirmReset) return;

    setPlayersStats([]);
  }

  if (gameMode === "human-vs-computer") {
    return (
      <div className="player-management">
        <div className="player-management__header">
          <input
            type="text"
            placeholder="Player name"
            value={playerName}
            maxLength={20}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <button onClick={() => handleCreatePlayer()}>
            Create new player
          </button>
        </div>

        {players.map((player) => (
          <div className="player-row" key={player.id}>
            <div className="player-row__name">
              <p>{player.name}</p>

              {player.id === currentPlayers.X && <p>Currently playing as X</p>}
              {player.id === currentPlayers.O && <p>Currently playing as O</p>}
            </div>

            <div className="player-row__handle">
              <button
                disabled={player.id === currentPlayers.X}
                onClick={() => onSelectPlayer(player.id, "X")}
              >
                Play as X
              </button>

              <button
                disabled={player.id === currentPlayers.O}
                onClick={() => onSelectPlayer(player.id, "O")}
              >
                Play as O
              </button>

              {!player.isDefault && (
                <button onClick={() => onDeletePlayer(player.id)}>
                  Delete
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="player-management">
      <div className="player-management__header">
        <input
          type="text"
          placeholder="Player name"
          value={playerName}
          maxLength={20}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <button onClick={() => handleCreatePlayer()}>Create new player</button>
      </div>

      {players.map((player) => (
        <div className="player-row" key={player.id}>
          <div className="player-row__name">
            <p>{player.name}</p>

            {player.id === currentPlayers.X && <p>Current X</p>}
            {player.id === currentPlayers.O && <p>Current O</p>}
          </div>

          <div className="player-row__handle">
            <button
              disabled={player.id === currentPlayers.X}
              onClick={() => onSelectPlayer(player.id, "X")}
            >
              Select for X
            </button>

            <button
              disabled={player.id === currentPlayers.O}
              onClick={() => onSelectPlayer(player.id, "O")}
            >
              Select for O
            </button>

            {!player.isDefault && (
              <button onClick={() => onDeletePlayer(player.id)}>Delete</button>
            )}

            {/* {playersStats.find(
              (stat) =>
                stat.id === player.id &&
                (stat.wins || stat.draws || stat.losses),
            ) && (
              <button onClick={() => resetPlayerStats(player.id)}>
                Reset Player Stats
              </button>
            )} */}
          </div>
        </div>
      ))}
      {/* {playersStats.find((stat) => stat.wins || stat.draws || stat.losses) && (
        <button onClick={() => resetAllPlayerStats()}>
          Reset All Player Stats
        </button>
      )} */}
    </div>
  );
}

export default PlayerManagement;
