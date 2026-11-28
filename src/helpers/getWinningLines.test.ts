import { getWinningLines } from "./getWinningLines";

describe("getWinningLines", () => {
  describe("number of winning lines", () => {
    it.each([3, 4, 5])(
      "should return the correct amount of winning lines on a %i board",
      (size) => {
        expect(getWinningLines(size)).toHaveLength(size * 2 + 2);
      },
    );
  });

  describe("horizontal lines", () => {
    it("should return the correct horizontal lines on a 3x3", () => {
      const lines = getWinningLines(3);
      const horizontalLines = lines.slice(0, 3);
      expect(horizontalLines).toHaveLength(3);
      expect(horizontalLines).toEqual(
        expect.arrayContaining([
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
        ]),
      );
    });

    it("should return the correct horizontal lines on a 4x4", () => {
      const lines = getWinningLines(4);
      const horizontalLines = lines.slice(0, 4);
      expect(horizontalLines).toHaveLength(4);
      expect(horizontalLines).toEqual(
        expect.arrayContaining([
          [0, 1, 2, 3],
          [4, 5, 6, 7],
          [8, 9, 10, 11],
          [12, 13, 14, 15],
        ]),
      );
    });

    it("should return the correct horizontal lines on a 5x5", () => {
      const lines = getWinningLines(5);
      const horizontalLines = lines.slice(0, 5);
      expect(horizontalLines).toHaveLength(5);
      expect(horizontalLines).toEqual(
        expect.arrayContaining([
          [0, 1, 2, 3, 4],
          [5, 6, 7, 8, 9],
          [10, 11, 12, 13, 14],
          [15, 16, 17, 18, 19],
          [20, 21, 22, 23, 24],
        ]),
      );
    });
  });

  describe("vertical lines", () => {
    it("should return the correct vertical lines on a 3x3", () => {
      const lines = getWinningLines(3);
      const verticalLines = lines.slice(3, 6);
      expect(verticalLines).toHaveLength(3);
      expect(verticalLines).toEqual(
        expect.arrayContaining([
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
        ]),
      );
    });

    it("should return the correct vertical lines on a 4x4", () => {
      const lines = getWinningLines(4);
      const verticalLines = lines.slice(4, 8);
      expect(verticalLines).toHaveLength(4);
      expect(verticalLines).toEqual(
        expect.arrayContaining([
          [0, 4, 8, 12],
          [1, 5, 9, 13],
          [2, 6, 10, 14],
          [3, 7, 11, 15],
        ]),
      );
    });

    it("should return the correct vertical lines on a 5x5", () => {
      const lines = getWinningLines(5);
      const verticalLines = lines.slice(5, 10);
      expect(verticalLines).toHaveLength(5);
      expect(verticalLines).toEqual(
        expect.arrayContaining([
          [0, 5, 10, 15, 20],
          [1, 6, 11, 16, 21],
          [2, 7, 12, 17, 22],
          [3, 8, 13, 18, 23],
          [4, 9, 14, 19, 24],
        ]),
      );
    });
  });

  describe("diagonal lines", () => {
    it("should return the correct diagonal lines on a 3x3", () => {
      const lines = getWinningLines(3);
      const diagonalLines = lines.slice(6, 8);
      expect(diagonalLines).toHaveLength(2);
      expect(diagonalLines).toEqual(
        expect.arrayContaining([
          [0, 4, 8],
          [2, 4, 6],
        ]),
      );
    });

    it("should return the correct diagonal lines on a 4x4", () => {
      const lines = getWinningLines(4);
      const diagonalLines = lines.slice(8, 10);
      expect(diagonalLines).toHaveLength(2);
      expect(diagonalLines).toEqual(
        expect.arrayContaining([
          [0, 5, 10, 15],
          [3, 6, 9, 12],
        ]),
      );
    });

    it("should return the correct diagonal lines on a 5x5", () => {
      const lines = getWinningLines(5);
      const diagonalLines = lines.slice(10, 12);
      expect(diagonalLines).toHaveLength(2);
      expect(diagonalLines).toEqual(
        expect.arrayContaining([
          [0, 6, 12, 18, 24],
          [4, 8, 12, 16, 20],
        ]),
      );
    });
  });
});
