import { useState } from "react";
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
    <button className={`square ${className}`} onClick={onSquareClick}>
      {value === "X" || value === "O" ? <Mark value={value} /> : null}
    </button>
  );
}

export default Square;
