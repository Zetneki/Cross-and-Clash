import { COLS, ROWS } from "../constants/tileCoordinates";

/**
 * generates small coordinate offsets to create an irregular effect.
 * @param r - row index
 * @param c - column index
 * @returns x and y offsets
 */
function jitter(r: number, c: number): [number, number] {
  const isOuter = r === 0 || c === 0 || r === ROWS || c === COLS;
  if (isOuter) return [0, 0];
  return [
    Math.sin(r * 12.9 + c * 78.2) * 0.5,
    Math.sin(r * 39.3 + c * 11.1) * 0.5,
  ];
}

/**
 * generates the shape of a tile based on its row and column index, and the number of columns and rows it spans.
 * @param row - row index
 * @param col - column index
 * @param colSpan - number of columns the tile spans
 * @param rowSpan - number of rows the tile spans
 * @returns the shape of the tile
 */
export function tileShape(row: number, col: number, colSpan = 1, rowSpan = 1) {
  const tl = jitter(row - 1, col - 1);
  const tr = jitter(row - 1, col - 1 + colSpan);
  const br = jitter(row - 1 + rowSpan, col - 1 + colSpan);
  const bl = jitter(row - 1 + rowSpan, col - 1);
  const p = (x: string, y: string, [dx, dy]: [number, number]) =>
    `calc(${x} + ${dx}rem) calc(${y} + ${dy}rem)`;
  return `polygon(${p("0%", "0%", tl)}, ${p("100%", "0%", tr)}, ${p("100%", "100%", br)}, ${p("0%", "100%", bl)})`;
}

// border style for the tile
/**
 * generates a random number between 0 and 1.
 * @param seed - the seed value
 * @returns a random number between 0 and 1
 */
// function rand(seed: number) {
//   const x = Math.sin(seed) * 10000;
//   return x - Math.floor(x); // 0..1
// }

/**
 * generates the border style of a tile based on its row and column index.
 * @param row - row index
 * @param col - column index
 * @returns the border style of the tile
 */
// export function tileBorder(row: number, col: number) {
//   const seed = row * 53 + col * 29;
//   const between = (i: number, min: number, max: number) =>
//     min + rand(seed + i) * (max - min);

//   const horizontal = [0, 1, 2, 3].map((i) => between(i, 4, 80));
//   const vertical = [0, 1, 2, 3].map((i) => between(i + 4, 4, 80));

//   const fmt = (list: number[]) => list.map((n) => `${n.toFixed(0)}%`).join(" ");

//   return {
//     radius: `${fmt(horizontal)} / ${fmt(vertical)}`,
//     width: [0, 1, 2, 3]
//       .map((i) => `${between(i + 8, 2, 5).toFixed(1)}px`)
//       .join(" "),
//   };
// }
