import { board } from "../test/board";
import { calculateWinner } from "./calculateWinner";

describe("calculateWinner", () => {
  describe("draw", () => {
    it("should return false on a draw", () => {
      const squares = board(`
        XOX
        XOX
        OXO
      `);

      expect(calculateWinner(squares, 3)).toBe(false);
    });
  });

  describe("winner", () => {
    it("should return a horizontal line", () => {
      const squares = board(`
        XOX
        XXO
        OOO
      `);

      const win = calculateWinner(squares, 3);
      expect(win).toBeTruthy();
      if (!win) return;
      expect(win.square).toBe("O");
      expect(win.line).toHaveLength(3);
      expect(win.line).toEqual(expect.arrayContaining([6, 7, 8]));
    });

    it("should return a vertical line", () => {
      const squares = board(`
        XOX
        XXO
        XOO
      `);

      const win = calculateWinner(squares, 3);
      expect(win).toBeTruthy();
      if (!win) return;
      expect(win.square).toBe("X");
      expect(win.line).toHaveLength(3);
      expect(win.line).toEqual(expect.arrayContaining([0, 3, 6]));
    });

    it("should return a diagonal line", () => {
      const squares = board(`
        XOO
        OXO
        XOX
      `);

      const win = calculateWinner(squares, 3);
      expect(win).toBeTruthy();
      if (!win) return;
      expect(win.square).toBe("X");
      expect(win.line).toHaveLength(3);
      expect(win.line).toEqual(expect.arrayContaining([0, 4, 8]));
    });

    it("should return the correct line if there is one on a 4x4", () => {
      const squares = board(`
        XOXX
        XOXX
        OXOX
        OOXX
      `);

      const win = calculateWinner(squares, 4);
      expect(win).toBeTruthy();
      if (!win) return;
      expect(win.square).toBe("X");
      expect(win.line).toHaveLength(4);
      expect(win.line).toEqual(expect.arrayContaining([3, 7, 11, 15]));
    });

    it("should return the correct line if there is one on a 5x5", () => {
      const squares = board(`
        XOXOX
        XOXOO
        OXOXX
        OOOOO
        XOXXO
      `);

      const win = calculateWinner(squares, 5);
      expect(win).toBeTruthy();

      if (!win) return;
      expect(win.square).toBe("O");
      expect(win.line).toHaveLength(5);
      expect(win.line).toEqual(expect.arrayContaining([15, 16, 17, 18, 19]));
    });
  });

  describe("game in progress", () => {
    it("should return null while the game is in progress", () => {
      const squares = board(`
        XOX
        XO.
        OX.
      `);

      expect(calculateWinner(squares, 3)).toBeNull();
    });

    it("should return null on an empty board", () => {
      const squares = board(`
        ...
        ...
        ...
      `);

      expect(calculateWinner(squares, 3)).toBeNull();
    });
  });
});
