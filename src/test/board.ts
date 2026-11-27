import type { PlayerSymbol } from "../types/playerSymbol";

export function board(
  rows: string,
  size = Math.sqrt(rows.replace(/\s/g, "").length),
): Array<PlayerSymbol | null> {
  const cells = rows.replace(/\s/g, "").split("");
  if (cells.length !== size ** 2) throw new Error("Wrong board size");
  return cells.map((c) => (c === "X" || c === "O" ? c : null));
}
