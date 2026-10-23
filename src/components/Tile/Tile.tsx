import "./Tile.scss";
import type { TileProps } from "../../modules/tileProps";
import { tileShape } from "../../helpers/tileShape";
//import { tileBorder } from "../../helpers/tileShape";

function Tile({
  label,
  row,
  col,
  colSpan = 1,
  rowSpan = 1,
  value,
  pressed,
  disabled,
  onClick,
  children,
}: TileProps) {
  const style = {
    gridRow: `${row} / span ${rowSpan}`,
    gridColumn: `${col} / span ${colSpan}`,
    "--tile-shape": tileShape(row, col, colSpan, rowSpan),
  } as React.CSSProperties;

  //border style
  // const { radius, width } = tileBorder(row, col);

  // const style = {
  //   gridRow: `${row} / span ${rowSpan}`,
  //   gridColumn: `${col} / span ${colSpan}`,
  //   "--tile-radius": radius,
  //   "--tile-border": width,
  // } as React.CSSProperties;
  const isToggle = pressed !== undefined;

  return (
    <div className={`tile ${pressed ? "is-pressed" : ""}`} style={style}>
      <button
        className="tile__button"
        onClick={onClick}
        disabled={disabled}
        aria-pressed={isToggle ? pressed : undefined}
      >
        <span className="tile__label">{label}</span>
        {value && <span className="tile__value">{": " + value}</span>}
      </button>
      {children}
    </div>
  );
}

export default Tile;
