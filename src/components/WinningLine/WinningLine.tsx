import "./WinningLine.scss";

function WinningLine({
  line,
  boardSize,
}: {
  line: number[];
  boardSize: number;
}) {
  const getCoordinates = (index: number) => {
    const row = Math.floor(index / boardSize);
    const col = index % boardSize;

    return {
      x: ((col + 0.5) / boardSize) * 100,
      y: ((row + 0.5) / boardSize) * 100,
    };
  };
  const start = getCoordinates(line[0]);
  const end = getCoordinates(line[line.length - 1]);

  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy) || 1;
  const extend = (0.3 / boardSize) * 100;

  const x1 = start.x - (dx / length) * extend;
  const y1 = start.y - (dy / length) * extend;
  const x2 = end.x + (dx / length) * extend;
  const y2 = end.y + (dy / length) * extend;

  return (
    <svg className="winning-line" viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <filter
          id="comic-wobble"
          filterUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="100"
          height="100"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="2"
            seed="3"
            result="noise"
          />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
        </filter>
      </defs>
      <line
        filter="url(#comic-wobble)"
        className="winning-line__line"
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        pathLength="100"
      />
    </svg>
  );
}

export default WinningLine;
