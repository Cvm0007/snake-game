const Controls = ({ onStart }) => (
  <button
    onClick={onStart}
    className="bg-green-500 hover:bg-green-600 transition px-6 py-2 rounded-full font-bold text-white mt-4"
  >
    ▶ Start Game
  </button>
);

export default Controls;
