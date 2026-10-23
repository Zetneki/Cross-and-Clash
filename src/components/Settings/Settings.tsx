import { useEffect, useRef, useState } from "react";
import "./Settings.scss";
import type { SettingsPage } from "../../types/settingsPage";
import PlayerManagement from "./PlayerManagement/PlayerManagement";
import type { Player } from "../../modules/player";
import type { PlayerSymbol } from "../../types/playerSymbol";
import type { SettingsValues } from "../../modules/settingsValues";
import type { GameType } from "../../types/gameType";
import type { CurrentPlayerId } from "../../types/currentPlayerId";
import type { DifficultyType } from "../../types/difficultyType";
import type { PlayerStats } from "../../modules/playerStats";
import Description from "../Description/Description";
import { useSoundContext } from "../hooks/useSoundContext";
import { useMusicContext } from "../hooks/useMusicContext";
import { useTimerContext } from "../hooks/useTimerContext";
import type { Theme } from "../../types/theme";
import Tile from "../Tile/Tile";
import { nextValue } from "../../helpers/nextValue";

function Settings({
  open,
  setOpen,
  players,
  playersStats,
  setPlayersStats,
  currentPlayers,
  setCurrentPlayers,
  onCreatePlayer,
  onDeletePlayer,
  onSelectPlayer,
  settingsValues,
  setSettingsValues,
  newGame,
  currentMove,
  theme,
  handleThemeChange,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  players: Player[];
  playersStats: PlayerStats[];
  setPlayersStats: (stats: PlayerStats[]) => void;
  currentPlayers: Record<PlayerSymbol, CurrentPlayerId>;
  setCurrentPlayers: (players: Record<PlayerSymbol, CurrentPlayerId>) => void;
  onCreatePlayer: (name: string) => string | null;
  onDeletePlayer: (id: string) => void;
  onSelectPlayer: (playerId: string, playerSymbol: PlayerSymbol) => void;
  settingsValues: SettingsValues;
  setSettingsValues: (values: SettingsValues) => void;
  newGame: (size: number) => void;
  currentMove: number;
  theme: Theme;
  handleThemeChange: (theme: Theme) => void;
}) {
  const { soundEnabled, setSoundEnabled, soundVolume, setSoundVolume } =
    useSoundContext();
  const { musicEnabled, setMusicEnabled, musicVolume, setMusicVolume } =
    useMusicContext();
  const { isTimerVisible, setIsTimerVisible, setIsTimerRunning } =
    useTimerContext();
  const [page, setPage] = useState<SettingsPage>("main");

  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const isClickedOutside = (event: MouseEvent) => {
      if (
        settingsRef.current &&
        !settingsRef.current.contains(event.target as Node)
      )
        setOpen(false);
    };

    window.addEventListener("mousedown", isClickedOutside);
    return () => window.removeEventListener("mousedown", isClickedOutside);
  }, [open, setOpen]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        switch (page) {
          case "main":
            setOpen(false);
            break;
          case "players":
            setPage("main");
            break;
          case "description":
            setPage("main");
            break;
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setOpen, page, open]);

  return (
    <>
      <div className="open-settings">
        <button
          onClick={(event) => {
            setOpen(!open);
            event.currentTarget.blur();
          }}
        >
          Settings
        </button>
      </div>
      {open && (
        <div className="overlay">
          <div className="overlay__settings" ref={settingsRef}>
            <div className="close">
              <button onClick={() => setOpen(false)}>Close</button>
            </div>

            {page === "main" && (
              <div className="main">
                <h2>Settings</h2>
                <div className="grid">
                  <Tile
                    row={1}
                    col={1}
                    label="Player Management"
                    onClick={() => setPage("players")}
                  />
                  <Tile
                    row={1}
                    col={2}
                    label="Show Scoreboard"
                    pressed={settingsValues.scoreBoardMode}
                    onClick={() =>
                      setSettingsValues({
                        ...settingsValues,
                        scoreBoardMode: !settingsValues.scoreBoardMode,
                      })
                    }
                  />
                  <Tile
                    row={1}
                    col={3}
                    label="Show History"
                    pressed={settingsValues.historyMode}
                    onClick={() =>
                      setSettingsValues({
                        ...settingsValues,
                        historyMode: !settingsValues.historyMode,
                      })
                    }
                  />
                  <Tile
                    row={2}
                    col={1}
                    label="Description"
                    onClick={() => setPage("description")}
                  />
                  <Tile
                    row={2}
                    col={2}
                    label="Theme"
                    value={theme}
                    onClick={() => {
                      const Themes: Theme[] = ["light", "dark", "system"];
                      const newTheme = nextValue(Themes, theme);
                      handleThemeChange(newTheme);
                    }}
                  />
                  <Tile
                    row={3}
                    col={1}
                    colSpan={2}
                    label="Game Mode"
                    value={settingsValues.gameMode}
                    onClick={() => {
                      const gameModes: GameType[] = [
                        "human-vs-human",
                        "human-vs-computer",
                        "computer-vs-computer",
                      ];
                      const gameMode = nextValue(
                        gameModes,
                        settingsValues.gameMode,
                      );
                      setSettingsValues({
                        ...settingsValues,
                        gameMode,
                      });

                      switch (gameMode) {
                        case "human-vs-human":
                          setCurrentPlayers({
                            X: players[0].id,
                            O: players[1].id,
                          });
                          break;
                        case "human-vs-computer":
                          setCurrentPlayers({
                            X: players[0].id,
                            O: "computer",
                          });
                          break;
                        case "computer-vs-computer":
                          setCurrentPlayers({
                            X: "computer",
                            O: "computer",
                          });
                          break;
                      }

                      newGame(settingsValues.boardSize);
                    }}
                  />
                  <Tile
                    row={2}
                    col={3}
                    rowSpan={2}
                    label="Computer Difficulty"
                    disabled={settingsValues.gameMode === "human-vs-human"}
                    value={settingsValues.difficulty}
                    onClick={() => {
                      const difficulties: DifficultyType[] = [
                        "easy",
                        "medium",
                        "hard",
                      ];
                      const difficulty = nextValue(
                        difficulties,
                        settingsValues.difficulty,
                      );
                      setSettingsValues({
                        ...settingsValues,
                        difficulty,
                      });
                      newGame(settingsValues.boardSize);
                    }}
                  />
                  <Tile
                    row={4}
                    col={1}
                    label="Computer Timeout"
                    disabled={settingsValues.gameMode === "human-vs-human"}
                    value={settingsValues.computerTimeout}
                    onClick={() => {
                      const timeout = nextValue(
                        [400, 600, 800],
                        settingsValues.computerTimeout,
                      );
                      setSettingsValues({
                        ...settingsValues,
                        computerTimeout: timeout,
                      });
                    }}
                  />
                  <Tile
                    row={4}
                    col={2}
                    label="Board Size"
                    value={`${settingsValues.boardSize}x${settingsValues.boardSize}`}
                    onClick={() => {
                      const newSize = nextValue(
                        [3, 4, 5],
                        settingsValues.boardSize,
                      );
                      setSettingsValues({
                        ...settingsValues,
                        boardSize: newSize,
                      });
                      newGame(newSize);
                    }}
                  />
                  <Tile
                    row={4}
                    col={3}
                    label="Timer"
                    pressed={isTimerVisible}
                    onClick={() => {
                      setIsTimerVisible(!isTimerVisible);
                      if (currentMove > 0) {
                        setIsTimerRunning(!isTimerVisible);
                      }
                    }}
                  />
                  <Tile
                    row={5}
                    col={1}
                    label="Winning Animation"
                    pressed={settingsValues.winningAnimationMode}
                    onClick={() =>
                      setSettingsValues({
                        ...settingsValues,
                        winningAnimationMode:
                          !settingsValues.winningAnimationMode,
                      })
                    }
                  />
                  <Tile
                    row={5}
                    col={2}
                    label="Sound"
                    pressed={soundEnabled}
                    onClick={() => {
                      setSoundEnabled(!soundEnabled);
                    }}
                  >
                    {soundEnabled && (
                      <input
                        type="range"
                        id="sound-slider"
                        value={soundVolume * 100}
                        onChange={(e) => {
                          setSoundVolume(Number(e.target.value) / 100);
                        }}
                      />
                    )}
                  </Tile>
                  <Tile
                    row={5}
                    col={3}
                    label="Music"
                    pressed={musicEnabled}
                    onClick={() => {
                      setMusicEnabled(!musicEnabled);
                    }}
                  >
                    {musicEnabled && (
                      <input
                        type="range"
                        id="music-slider"
                        value={musicVolume * 100}
                        onChange={(e) => {
                          setMusicVolume(Number(e.target.value) / 100);
                        }}
                      />
                    )}
                  </Tile>
                </div>
              </div>
            )}

            {page === "players" && (
              <div className="player-management">
                <div className="header">
                  <h2>Player management</h2>
                  <div className="header__btn-wrapper">
                    <button onClick={() => setPage("main")}>
                      Back to main
                    </button>
                  </div>
                </div>
                <PlayerManagement
                  players={players}
                  playersStats={playersStats}
                  setPlayersStats={setPlayersStats}
                  currentPlayers={currentPlayers}
                  onCreatePlayer={onCreatePlayer}
                  onDeletePlayer={onDeletePlayer}
                  onSelectPlayer={onSelectPlayer}
                  gameMode={settingsValues.gameMode}
                  open={open}
                />
              </div>
            )}

            {page === "description" && (
              <div className="description">
                <div className="header">
                  <h2>Cross & Clash</h2>
                  <div className="header__btn-wrapper">
                    <button onClick={() => setPage("main")}>
                      Back to main
                    </button>
                  </div>
                </div>
                <Description />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Settings;
