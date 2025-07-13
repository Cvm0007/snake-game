export default function Controls({ onStart, started }) {
  return (
    <div className="mt-4 text-center space-y-3">
      {!started && (
        <button
          onClick={onStart}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-all shadow-lg"
        >
          Lets Play!
        </button>
      )}
      {started && (
        <p className="text-sm text-gray-300">Use Arrow Keys to play 🕹</p>
      )}
      <p className="text-xs text-gray-400 italic mt-1">
        Press “Start Game” to begin. Game ends on wall/self collision.
      </p>
    </div>
  );
}
