import Mark from "../Mark/Mark";
import "./Square.scss";

function Square({
  value,
  isSelected,
  onSquareClick,
}: {
  value: string | null;
  isSelected: boolean;
  onSquareClick: () => void;
}) {
  let className = "";
  if (isSelected) className += " selected";

  return (
    <div
      role="button"
      tabIndex={0}
      className={`square ${className}`}
      onClick={onSquareClick}
    >
      {value === "X" || value === "O" ? <Mark value={value} /> : null}
    </div>
  );
}

export default Square;
