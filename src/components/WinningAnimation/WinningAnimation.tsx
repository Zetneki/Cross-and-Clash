import "./WinningAnimation.scss";
import win from "../../assets/drawing.svg";
import type { GameResult } from "../../modules/gameResult";
import { COMPUTER_ID } from "../../constants/computer";
import { useSound } from "../hooks/useSound";
import { useMusicContext } from "../hooks/useMusicContext";
import { useSoundContext } from "../hooks/useSoundContext";
import { useEffect } from "react";

function WinningAnimation({
  result,
  onRestart,
}: {
  result: GameResult;
  onRestart: () => void;
}) {
  const playSound = useSound();

  const { soundEnabled, soundVolume } = useSoundContext();
  const { setDucked } = useMusicContext();
  const sound = result.player?.id === COMPUTER_ID ? "lose" : "win";

  useEffect(() => {
    if (!soundEnabled || soundVolume === 0) return;

    const audio = playSound(sound);

    if (!audio) return;

    setDucked(true);

    const handleEnded = () => {
      setDucked(false);
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
      setDucked(false);
    };
  }, [soundEnabled, sound, playSound, setDucked]);

  return (
    <div className="winning-animation" onClick={() => onRestart()}>
      <div
        className={`halftone ${
          result.type !== "draw" && result.player?.id === COMPUTER_ID
            ? "lost"
            : ""
        }`}
      ></div>
      <div className="winner">
        <img src={win} alt="winner burst" />

        {result.type === "draw" ? (
          <h1>DRAW!</h1>
        ) : result.player?.id === COMPUTER_ID ? (
          <h1>
            {result.player?.name ? `${result.player.name} LOST!` : "YOU LOST!"}
          </h1>
        ) : (
          <h1>
            {result.player?.name ? `${result.player.name} WINS!` : "YOU WON!"}
          </h1>
        )}
      </div>
    </div>
  );
}

export default WinningAnimation;
