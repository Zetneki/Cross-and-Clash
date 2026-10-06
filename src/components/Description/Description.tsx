import "./Description.scss";

function Description() {
  return (
    <>
      <p>
        is a Tic-Tac-Toe game where you can play against a friend, challenge a
        computer, or even watch two computers play against each other.
      </p>

      <p>The game offers a variety of features and customization options:</p>
      <ul>
        <li>
          <b>Game modes</b>: choose between Player vs Player, Player vs
          Computer, and Computer vs Computer. Computer vs Computer games do not
          affect the scoreboard.
        </li>
        <li>
          <b>Scoreboard</b>: view the results of all registered players,
          including their wins, draws, and losses.
        </li>
        <li>
          <b>History mode</b>: step backward and forward through the moves of a
          game and replay different game states. Once a game has finished,
          changing its history does not affect its recorded result.
        </li>
        <li>
          <b>Board size</b>: choose between 3×3, 4×4, and 5×5 boards.
        </li>
        <li>
          <b>Keyboard support</b>: navigate the board using the arrow keys and
          select a cell with the Spacebar. Press Escape to close open windows
          such as the settings panel.
        </li>
        <li>
          <b>Players</b>: create new players, choose which players play as X and
          O, reset individual player scores, or delete players. The two default
          players cannot be deleted.
        </li>
        <li>
          <b>Winning animation</b>: enable or disable an animation when a player
          wins.
        </li>
        <li>
          <b>Sound effects</b>: turn game sound effects on or off.
        </li>
        <li>
          <b>Music</b>: turn background music on or off.
        </li>
        <li>
          <b>Timer</b>: optionally display how long it takes to finish a game.
          Timer results are not saved.
        </li>
        <li>
          <b>Themes</b>: switch between dark and light mode.
        </li>
      </ul>
    </>
  );
}

export default Description;
