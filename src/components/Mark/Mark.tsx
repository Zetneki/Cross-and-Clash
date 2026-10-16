import type { MarkProps } from "../../modules/MarkProps";
import "./Mark.scss";

function Mark({ value }: MarkProps) {
  return (
    <svg
      className={`mark mark--${value.toLowerCase()}`}
      viewBox="0 0 100 100"
      aria-hidden="true"
    >
      <text
        className="mark__glyph"
        x="50"
        y="52"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {value}
      </text>
    </svg>
  );
}

export default Mark;
