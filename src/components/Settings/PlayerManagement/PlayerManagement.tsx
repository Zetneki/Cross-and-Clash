import { useEffect, useState } from "react";
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
  open,
}: {
  players: Player[];
  playersStats: PlayerStats[];
  setPlayersStats: (stats: PlayerStats[]) => void;
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>;
  onCreatePlayer: (name: string) => string | null;
  onDeletePlayer: (id: string) => void;
  onSelectPlayer: (playerId: string, playerSymbol: PlayerSymbol) => void;
  gameMode: GameType;
  open: boolean;
}) {
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    if (!open) return;
    const enterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        handleCreatePlayer();
      }
    };

    window.addEventListener("keydown", enterKeyDown);

    return () => window.removeEventListener("keydown", enterKeyDown);
  }, [handleCreatePlayer]);

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

    const newPlayersStats = [...playersStats];
    newPlayersStats.forEach((stat) => {
      stat.wins = 0;
      stat.draws = 0;
      stat.losses = 0;
    });
    setPlayersStats(newPlayersStats);
  }

  if (gameMode === "computer-vs-computer") {
    return (
      <div className="management-wrapper">
        Computer vs Computer games don't have a player management
      </div>
    );
  } else if (gameMode === "human-vs-computer") {
    return (
      <div className="management-wrapper">
        <div className="management-wrapper__header">
          <input
            type="text"
            placeholder="Player name"
            value={playerName}
            maxLength={20}
            onChange={(e) => setPlayerName(e.target.value)}
          />
          <div className="management-btn management-btn--create">
            <button onClick={() => handleCreatePlayer()}>
              Create new player
            </button>
          </div>
        </div>

        <div className="management-wrapper__list">
          {players.map((player) => (
            <div className="player-row" key={player.id}>
              <div className="player-row__name">
                <p>{player.name}</p>

                {player.id === currentPlayers.X && (
                  <p>Currently playing as X</p>
                )}
                {player.id === currentPlayers.O && (
                  <p>Currently playing as O</p>
                )}
              </div>

              <div className="player-row__handle">
                <div
                  className={`management-btn management-btn--select-x 
                    ${player.id === currentPlayers.X ? "selected" : ""}`}
                >
                  <button
                    disabled={player.id === currentPlayers.X}
                    onClick={() => onSelectPlayer(player.id, "X")}
                  >
                    Play as X
                  </button>
                </div>
                <div
                  className={`management-btn management-btn--select-o 
                  ${player.id === currentPlayers.O ? "selected" : ""}`}
                >
                  <button
                    disabled={player.id === currentPlayers.O}
                    onClick={() => onSelectPlayer(player.id, "O")}
                  >
                    Play as O
                  </button>
                </div>

                {!player.isDefault && (
                  <div className="management-btn management-btn--danger">
                    <button onClick={() => onDeletePlayer(player.id)}>
                      Delete
                    </button>
                  </div>
                )}

                {playersStats.find(
                  (stat) =>
                    stat.id === player.id &&
                    (stat.wins || stat.draws || stat.losses),
                ) && (
                  <div
                    className={`management-btn management-btn--reset${player.isDefault ? "-default" : ""}`}
                  >
                    <button onClick={() => resetPlayerStats(player.id)}>
                      Reset Player Stats
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {playersStats.find(
          (stat) => stat.wins || stat.draws || stat.losses,
        ) && (
          <div className="management-btn management-btn--reset-all">
            <button onClick={() => resetAllPlayerStats()}>
              Reset All Player Stats
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="management-wrapper">
      <div className="management-wrapper__header">
        <input
          type="text"
          placeholder="Player name"
          value={playerName}
          maxLength={20}
          onChange={(e) => setPlayerName(e.target.value)}
        />
        <div className="management-btn management-btn--create">
          <button onClick={() => handleCreatePlayer()}>
            Create new player
          </button>
        </div>
      </div>

      <div className="management-wrapper__list">
        {players.map((player) => (
          <div className="player-row" key={player.id}>
            <div className="player-row__name">
              <p>{player.name}</p>

              {player.id === currentPlayers.X && <p>Current X</p>}
              {player.id === currentPlayers.O && <p>Current O</p>}
            </div>

            <div className="player-row__handle">
              <div
                className={`management-btn management-btn--select-x 
                ${player.id === currentPlayers.X ? "selected" : ""}`}
              >
                <button
                  disabled={player.id === currentPlayers.X}
                  onClick={() => onSelectPlayer(player.id, "X")}
                >
                  Play as X
                </button>
              </div>

              <div
                className={`management-btn management-btn--select-o 
                ${player.id === currentPlayers.O ? "selected" : ""}`}
              >
                <button
                  disabled={player.id === currentPlayers.O}
                  onClick={() => onSelectPlayer(player.id, "O")}
                >
                  Play as O
                </button>
              </div>

              {!player.isDefault && (
                <div className="management-btn management-btn--danger">
                  <button onClick={() => onDeletePlayer(player.id)}>
                    Delete
                  </button>
                </div>
              )}

              {playersStats.find(
                (stat) =>
                  stat.id === player.id &&
                  (stat.wins || stat.draws || stat.losses),
              ) && (
                <div
                  className={`management-btn management-btn--reset${player.isDefault ? "-default" : ""}`}
                >
                  <button onClick={() => resetPlayerStats(player.id)}>
                    Reset Player Stats
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {playersStats.find((stat) => stat.wins || stat.draws || stat.losses) && (
        <div className="management-btn management-btn--reset-all">
          <button onClick={() => resetAllPlayerStats()}>
            Reset All Player Stats
          </button>
        </div>
      )}
    </div>
  );
}

export default PlayerManagement;
