import "./WinningAnimation.scss";
import win from "../../assets/drawing.svg";
import type { GameResult } from "../../modules/gameResult";
import { COMPUTER_ID } from "../../constants/computer";

function WinningAnimation({
  result,
  onRestart,
}: {
  result: GameResult;
  onRestart: () => void;
}) {
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
