import { board } from "../test/board";
import type { DifficultyType } from "../types/difficultyType";
import { calculateComputerMove } from "./calculateComputerMove";

describe("calculateComputerMove", () => {
  const squares = board(`
    X.X
    .O.
    ...
  `);

  describe("easy", () => {
    it("should choose an empty spot", () => {
      const move = calculateComputerMove(squares, 3, "easy", "O");
      expect(squares[move as number]).toBeNull();
    });
  });

  describe("medium", () => {
    it("should block the X from winning", () => {
      expect(calculateComputerMove(squares, 3, "medium", "O")).toBe(1);
    });
  });

  describe("hard", () => {
    it("should block the X from winning", () => {
      expect(calculateComputerMove(squares, 3, "hard", "O")).toBe(1);
    });
  });

  describe("full board", () => {
    const difficulties: DifficultyType[] = ["easy", "medium", "hard"];

    it.each(difficulties)("%s should return false", (difficulty) => {
      const squares = board(`
          XOXO
          OOXX
          XOXO
          OOXX
        `);

      expect(calculateComputerMove(squares, 4, difficulty, "X")).toBe(false);
    });
  });
});
