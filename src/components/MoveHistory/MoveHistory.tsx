import "./MoveHistory.scss";

function MoveHistory({
  history,
  jumpTo,
}: {
  history: Array<Array<string | null>>;
  jumpTo: (move: number) => void;
}) {
  const moveButtons = history.map((squares, move) => {
    let description;

    if (move === 0) return;
    description = "Go to move " + move;

    return (
      <div className="move-history__step-btn" key={move}>
        <button key={move} onClick={() => jumpTo(move)}>
          {description}
        </button>
      </div>
    );
  });

  return <div className="move-history">{moveButtons}</div>;
}

export default MoveHistory;
