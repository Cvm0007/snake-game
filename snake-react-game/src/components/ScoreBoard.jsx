// src/components/ScoreBoard.jsx
const ScoreBoard = ({ score, best }) => {
  return (
    <div className="bg-black/60 p-4 rounded-xl shadow-md flex justify-between gap-10 w-full max-w-xs text-lg font-semibold text-white">
      <span>Score: {score}</span>
      <span>Best: {best}</span>
    </div>
  );
};

export default ScoreBoard;
